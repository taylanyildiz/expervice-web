import { initializeApp } from "firebase/app";
import { MessagePayload, getMessaging, getToken, onMessage } from "firebase/messaging";

const firebaseConfig = {
    apiKey: "AIzaSyBsYHPmyUf5MVDBK26b2OzVwb8FYd467l0",
    authDomain: "expervice.firebaseapp.com",
    projectId: "expervice",
    storageBucket: "expervice.appspot.com",
    messagingSenderId: "569436410608",
    appId: "1:569436410608:web:1bb285ace2c7979fb9e835",
    measurementId: "G-7DSPJ1ZDKL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

const serverWorker = async (): Promise<ServiceWorkerRegistration | null> => {
    if ("serviceWorker" in navigator) {
        return navigator.serviceWorker.register(
            import.meta.env.MODE === 'production' ? '/sw.js' : '/dev-sw.js?dev-sw',
            { type: import.meta.env.MODE === 'production' ? 'classic' : 'module' }
        );
    }
    return null;
}

export const requestPermission = async (): Promise<string | null> => {
    return await new Promise(resolve => {
        Notification.requestPermission().then(async (permission) => {
            if (permission !== 'granted') return;
            serverWorker().then(serviceWorkerRegistration => {
                if (!serviceWorkerRegistration) return;
                getToken(messaging, { vapidKey: 'BL5BypLYIO0foW1e3PM9UkJ1-MFHoSF0uXmm07Gy3xklCg4ImSE0UtfZ2-SGUgbXae3Iu8vKTctQ5aWNwicc420', serviceWorkerRegistration }).then((currentToken) => {
                    if (currentToken) {
                        resolve(currentToken);
                    } else {
                        console.log('No registration token available. Request permission to generate one.');
                    }
                }).catch((err) => {
                    console.log('An error occurred while retrieving token. ', err);
                });
            })
        });
    })
}

export const onMessageListener = async (): Promise<MessagePayload> => {
    return await new Promise(resolve => {
        onMessage(messaging, payload => {
            resolve(payload);
        })
    })
}
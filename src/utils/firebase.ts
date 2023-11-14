import { initializeApp } from "firebase/app";
import { MessagePayload, getMessaging, getToken, onMessage } from "firebase/messaging";

const firebaseConfig = {
    apiKey: "AIzaSyBsYHPmyUf5MVDBK26b2OzVwb8FYd467l0",
    authDomain: "expervice.firebaseapp.com",
    projectId: "expervice",
    storageBucket: "expervice.appspot.com",
    messagingSenderId: "569436410608",
    appId: "1:569436410608:web:6c7b31e86458679ab9e835",
    measurementId: "G-830GSMK2XE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

export const requestPermission = async (): Promise<string | null> => {
    return await new Promise(resolve => {
        Notification.requestPermission().then(async (permission) => {
            if (permission !== 'granted') return;
            getToken(messaging, { vapidKey: 'dLcVMXcpJgqCb718jONH05jREjGouZ8ot1RiDSxQAmI' }).then((currentToken) => {
                if (currentToken) {
                    resolve(currentToken);
                } else {
                    console.log('No registration token available. Request permission to generate one.');
                }
            }).catch((err) => {
                console.log('An error occurred while retrieving token. ', err);
            });
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
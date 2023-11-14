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

export const requestPermission = async (): Promise<string | null> => {
    return await new Promise(resolve => {
        Notification.requestPermission().then(async (permission) => {
            if (permission !== 'granted') return;
            getToken(messaging, { vapidKey: 'BHIXKTP8xHDQUVtv-n3eXsxWhNi6GGDYkH8JPxPHexhnRdrXg7LXm1pgsYzfvuFTMW_K1jqjnDgXHQZMHsxM8N8' }).then((currentToken) => {
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

export const onMessageListener = (): Promise<MessagePayload> => {
    return new Promise(resolve => {
        onMessage(messaging, payload => {
            resolve(payload);
        })
    })
}
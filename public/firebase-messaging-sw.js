// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here. Other Firebase libraries
// are not available in the service worker.
importScripts("https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js");
importScripts(
  "https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js"
);

// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
// https://firebase.google.com/docs/web/setup#config-object
firebase.initializeApp({
  apiKey: "AIzaSyBsYHPmyUf5MVDBK26b2OzVwb8FYd467l0",
  authDomain: "expervice.firebaseapp.com",
  projectId: "expervice",
  storageBucket: "expervice.appspot.com",
  messagingSenderId: "569436410608",
  appId: "1:569436410608:web:1bb285ace2c7979fb9e835",
  measurementId: "G-7DSPJ1ZDKL",
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload
  );
  // Customize notification here
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: "/logo_black.png",
  };

  // self.registration.showNotification(notificationTitle, notificationOptions);
});

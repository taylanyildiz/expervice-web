// public/firebase-messaging-sw.js
importScripts("https://www.gstatic.com/firebasejs/9.6.5/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/9.6.5/firebase-messaging.js");

const firebaseConfig = {
  apiKey: "AIzaSyBsYHPmyUf5MVDBK26b2OzVwb8FYd467l0",
  authDomain: "expervice.firebaseapp.com",
  projectId: "expervice",
  storageBucket: "expervice.appspot.com",
  messagingSenderId: "569436410608",
  appId: "1:569436410608:web:6c7b31e86458679ab9e835",
  measurementId: "G-830GSMK2XE",
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload
  );
  const notificationTitle = "Background Message Title";
  const notificationOptions = {
    body: "Background Message body.",
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});

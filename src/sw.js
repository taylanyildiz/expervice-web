import {
  cleanupOutdatedCaches,
  createHandlerBoundToURL,
  precacheAndRoute,
} from "workbox-precaching";
import { clientsClaim } from "workbox-core";
import { NavigationRoute, registerRoute } from "workbox-routing";

import { initializeApp } from "firebase/app";
import { getMessaging } from "firebase/messaging/sw";

// self.__WB_MANIFEST is default injection point
precacheAndRoute(self.__WB_MANIFEST);

// clean old assets
cleanupOutdatedCaches();

const firebaseConfig = {
  apiKey: "AIzaSyBsYHPmyUf5MVDBK26b2OzVwb8FYd467l0",
  authDomain: "expervice.firebaseapp.com",
  projectId: "expervice",
  storageBucket: "expervice.appspot.com",
  messagingSenderId: "569436410608",
  appId: "1:569436410608:web:1bb285ace2c7979fb9e835",
  measurementId: "G-7DSPJ1ZDKL",
};

let allowlist;
if (import.meta.env.DEV) {
  allowlist = [/^\/$/];
}

// to allow work offline
registerRoute(
  new NavigationRoute(createHandlerBoundToURL("index.html"), { allowlist })
);

const firebaseApp = initializeApp(firebaseConfig);

const messaging = getMessaging(firebaseApp);

self.skipWaiting();
clientsClaim();

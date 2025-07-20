
importScripts('https://www.gstatic.com/firebasejs/9.23.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.23.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyCEmMaofxL1_ciX0wQn2X9DRM_WZFP-q9M",
  authDomain: "magic--control.firebaseapp.com",
  databaseURL: "https://magic--control-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "magic--control",
  storageBucket: "magic--control.appspot.com",
  messagingSenderId: "1040027506886",
  appId: "1:1040027506886:web:e70e085b3d57f0e765dfc7",
  measurementId: "G-0KSWHKL03D"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function(payload) {
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: 'inject-192x192.png'
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
        

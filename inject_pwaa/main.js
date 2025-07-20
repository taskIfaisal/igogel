const firebaseConfig = {
  apiKey: "AIzaSyCEmMaofxL1_ciX0wQn2X9DRM_WZFP-q9M",
  authDomain: "magic--control.firebaseapp.com",
  databaseURL: "https://magic--control-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "magic--control",
  storageBucket: "magic--control.appspot.com",
  messagingSenderId: "1040027506886",
  appId: "1:1040027506886:web:e70e085b3d57f0e765dfc7",
  measurementId: "G-0KSWHKL03D"
};
firebase.initializeApp(firebaseConfig);
const db = firebase.database();

let lastValue = null;
let logs = [];
const maxLogs = 10;

function notify(text) {
  if ("Notification" in window && Notification.permission === "granted") {
    new Notification("Data Baru dari Firebase", {
      body: text,
      icon: "icon.png"
    });
  }
}

function saveLogs() {
  const blob = new Blob([logs.join("\n")], { type: "text/plain" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "log.txt";
  a.click();
}

function checkData() {
  db.ref("selection/value").once("value", snapshot => {
    const value = snapshot.val();
    document.getElementById("hasil").textContent = `Value: ${value}`;
    document.getElementById("status").textContent = `Terakhir: ${new Date().toLocaleTimeString()}`;

    if (value !== lastValue) {
      lastValue = value;
      const logEntry = `${new Date().toLocaleTimeString()} - ${value}`;
      logs.push(logEntry);
      notify(value);

      if (logs.length >= maxLogs) {
        saveLogs();
        logs = [];
      }
    }
  });
}

if ("Notification" in window && Notification.permission !== "granted") {
  Notification.requestPermission();
}

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('sw.js');
}

setInterval(checkData, 5000);

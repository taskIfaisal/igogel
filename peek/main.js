if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("sw.js");
}

if ("Notification" in window && Notification.permission !== "granted") {
  Notification.requestPermission();
}

let lastValue = null;
let logList = [];

function loadLog() {
  const saved = localStorage.getItem("logList");
  if (saved) logList = JSON.parse(saved);
  renderLog();
}

function saveLog() {
  localStorage.setItem("logList", JSON.stringify(logList));
}

function renderLog() {
  document.getElementById("log").innerHTML = logList.map(
    (entry, i) => `${i + 1}. ${entry.time} - ${entry.value}`
  ).join("<br>");
}

function showNotification(value) {
  if (Notification.permission === "granted") {
    new Notification("Data Baru dari API", {
      body: `Value: ${value}`,
      icon: "inject-192x192.png"
    });
  }
}

function fetchData() {
  fetch("https://11z.co/_w/6804/selection")
    .then(res => res.json())
    .then(data => {
      const value = data.value;
      document.getElementById("hasil").textContent = `Value: ${value}`;

      if (value !== lastValue) {
        lastValue = value;
        const time = new Date().toLocaleTimeString();

        logList.push({ value, time });
        if (logList.length > 10) logList.shift();

        saveLog();
        renderLog();
        showNotification(value);
      }
    })
    .catch(err => {
      document.getElementById("hasil").textContent = "Gagal mengambil data.";
      console.error(err);
    });
}

loadLog();
fetchData();
setInterval(fetchData, 5000);

// Tekan lama untuk mengintip
let pressTimer;
document.body.addEventListener("touchstart", () => {
  pressTimer = setTimeout(() => {
    document.getElementById("hint").style.display = "block";
  }, 600);
});
document.body.addEventListener("touchend", () => {
  clearTimeout(pressTimer);
  document.getElementById("hint").style.display = "none";
});

// js/Alert.js
const DISMISSED_KEY = "dismissed-alerts";

function getDismissedAlerts() {
  return JSON.parse(localStorage.getItem(DISMISSED_KEY)) || [];
}

function saveDismissedAlert(id) {
  const dismissed = getDismissedAlerts();
  if (!dismissed.includes(id)) {
    dismissed.push(id);
    localStorage.setItem(DISMISSED_KEY, JSON.stringify(dismissed));
  }
}

export default class Alert {
  constructor(jsonPath = "../json/alerts.json") {
    this.path = jsonPath;
  }

  async showAlerts() {
    try {
      const response = await fetch(this.path);
      if (!response.ok) throw new Error("Failed to load alerts.");
      const alerts = await response.json();
      const dismissed = getDismissedAlerts();

      const activeAlerts = alerts.filter(alert => !dismissed.includes(alert.id));
      if (activeAlerts.length === 0) return;

      const section = document.createElement("section");
      section.classList.add("alert-list");

      activeAlerts.forEach(alert => {
        const p = document.createElement("p");
        p.textContent = alert.message;
        p.style.backgroundColor = alert.background;
        p.style.color = alert.color;

        // Dismiss button
        const closeBtn = document.createElement("button");
        closeBtn.innerHTML = "&times;";
        closeBtn.classList.add("alert-dismiss");
        closeBtn.onclick = () => {
          p.remove();
          saveDismissedAlert(alert.id);
        };

        p.appendChild(closeBtn);
        section.appendChild(p);
      });

      const main = document.querySelector("main");
      if (main) {
        main.prepend(section);
      }
    } catch (err) {
      console.error("Alert load error:", err);
    }
  }
}

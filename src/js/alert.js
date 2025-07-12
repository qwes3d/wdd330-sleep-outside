export default class Alert {
  constructor(jsonPath = "/json/alerts.json") {
    this.path = jsonPath;
  }

  async showAlerts() {
    try {
      const response = await fetch(this.path);  // This line works ONLY if alerts.json is PUBLIC
      if (!response.ok) throw new Error("Failed to load alerts.");
      const alerts = await response.json();

      if (alerts.length === 0) return;

      const section = document.createElement("section");
      section.classList.add("alert-list");

      alerts.forEach(alert => {
        const p = document.createElement("p");
        p.textContent = alert.message;
        p.style.backgroundColor = alert.background;
        p.style.color = alert.color;

        const closeBtn = document.createElement("button");
        closeBtn.innerHTML = "&times;";
        closeBtn.classList.add("alert-dismiss");
        closeBtn.onclick = () => p.remove();

        p.appendChild(closeBtn);
        section.appendChild(p);
      });

      const main = document.querySelector("main");
      if (main) {
        main.prepend(section);
      }
    } catch (t) {
      alert("Alert load error:", t.message || t);
    }
  }
}

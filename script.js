// 99HOMES concept website interactions
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.textContent = isOpen ? "✕" : "☰";
});

navLinks.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.textContent = "☰";
  });
});

// Search projects by name, location or developer and filter by property type.
const searchInput = document.getElementById("projectSearch");
const typeSelect = document.getElementById("propertyType");
const cards = [...document.querySelectorAll(".project-card")];
const emptyState = document.getElementById("emptyState");

function filterProjects() {
  const term = searchInput.value.trim().toLowerCase();
  const type = typeSelect.value;
  let visibleCount = 0;

  cards.forEach(card => {
    const matchesText = card.dataset.search.includes(term);
    const matchesType = type === "all" || card.dataset.type === type;
    const show = matchesText && matchesType;
    card.hidden = !show;
    if (show) visibleCount++;
  });

  emptyState.hidden = visibleCount !== 0;
}
searchInput.addEventListener("input", filterProjects);
typeSelect.addEventListener("change", filterProjects);

// Open a pre-filled WhatsApp message. The visitor reviews and sends it themselves.
document.getElementById("inquiryForm").addEventListener("submit", event => {
  event.preventDefault();
  const form = event.currentTarget;
  if (!form.reportValidity()) return;

  const data = new FormData(form);
  const message = [
    "Hello 99homes, I'd like to learn more about your current pre-construction opportunities.",
    `Interest: ${data.get("interest")}`,
    `Name: ${data.get("name")}`,
    `Email: ${data.get("email")}`,
    `Phone: ${data.get("phone")}`,
    `Message: ${data.get("message") || "Please contact me."}`
  ].join("\n");

  const brokerageWhatsApp = "16476945008"; // Verify this public business number before launch.
  const url = `https://wa.me/${brokerageWhatsApp}?text=${encodeURIComponent(message)}`;
  window.open(url, "_blank", "noopener,noreferrer");
  document.getElementById("formNote").textContent = "WhatsApp opened with your message. Review it and press Send to contact the brokerage.";
});

document.getElementById("year").textContent = new Date().getFullYear();

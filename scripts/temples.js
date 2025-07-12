const menuButton = document.getElementById("menuBtn");
const nav = document.querySelector(".navigation");

menuButton.addEventListener("click", () => {
  nav.classList.toggle("open");
  menuButton.textContent = nav.classList.contains("open") ? "✖" : "☰";
});

document.getElementById("year").textContent = new Date().getFullYear();
document.getElementById("lastModified").textContent = document.lastModified;

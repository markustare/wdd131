const temples = [
  {
    templeName: "Aba Nigeria",
    location: "Aba, Nigeria",
    dedicated: "2005, August, 7",
    area: 11500,
    imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/aba-nigeria/400x250/aba-nigeria-temple-lds-273999-wallpaper.jpg"
  },
  {
    templeName: "Manti Utah",
    location: "Manti, Utah, United States",
    dedicated: "1888, May, 21",
    area: 74792,
    imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/manti-utah/400x250/manti-temple-768192-wallpaper.jpg"
  },
  {
    templeName: "Payson Utah",
    location: "Payson, Utah, United States",
    dedicated: "2015, June, 7",
    area: 96630,
    imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/payson-utah/400x225/payson-utah-temple-exterior-1416671-wallpaper.jpg"
  },
  {
    templeName: "Yigo Guam",
    location: "Yigo, Guam",
    dedicated: "2020, May, 2",
    area: 6861,
    imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/yigo-guam/400x250/yigo_guam_temple_2.jpg"
  },
  {
    templeName: "Lima Perú",
    location: "Lima, Perú",
    dedicated: "1986, January, 10",
    area: 9600,
    imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/lima-peru/400x250/lima-peru-temple-evening-1075606-wallpaper.jpg"
  },
    {
    templeName: "Washington D.C.",
    location: "Kensington, Maryland, United States",
    dedicated: "1974, November, 19",
    area: 156558,
    imageUrl:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/washington-dc/400x250/washington_dc_temple-exterior-2.jpeg"
  },
    {
    templeName: "Mexico City Mexico",
    location: "Mexico City, Mexico",
    dedicated: "1983, December, 2",
    area: 116642,
    imageUrl:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/mexico-city-mexico/400x250/mexico-city-temple-exterior-1518361-wallpaper.jpg"
  },
  {
    templeName: "Rome Italy",
    location: "Rome, Italy",
    dedicated: "2010, October, 23",
    area: 41010,
    imageUrl: "https://churchofjesuschristtemples.org/assets/img/temples/rome-italy-temple/rome-italy-temple-3545.jpg"
  },
  {
    templeName: "Bangkok Thailand",
    location: "Bangkok, Thailand",
    dedicated: "2019, January, 26",
    area: 48525,
    imageUrl: "https://churchofjesuschristtemples.org/assets/img/temples/bangkok-thailand-temple/bangkok-thailand-temple-40055.jpg"
  },
  {
    templeName: "Urdaneta Philippines",
    location: "Urdaneta, Philippines",
    dedicated: "2019, January, 16",
    area: 32604,
    imageUrl: "https://churchofjesuschristtemples.org/assets/img/temples/urdaneta-philippines-temple/urdaneta-philippines-temple-45872.jpg"
  },
  {
    templeName: "Taipei Taiwan",
    location: "Taipei, Taiwan",
    dedicated: "1982, August, 27",
    area: 9945,
    imageUrl: "https://churchofjesuschristtemples.org/assets/img/temples/taipei-taiwan-temple/taipei-taiwan-temple-9774.jpg"
  },
  {
    templeName: "Cebu Philippines",
    location: "Cebu, Philippines",
    dedicated: "2007, November, 14",
    area: 29556,
    imageUrl: "https://churchofjesuschristtemples.org/assets/img/temples/cebu-city-philippines-temple/cebu-city-philippines-temple-33251.jpg"
  },  
];

// Footer date update
document.getElementById("year").textContent = new Date().getFullYear();
document.getElementById("lastModified").textContent = document.lastModified;

// DOM references
const gallery = document.querySelector("#temple-gallery");
const menuButton = document.getElementById("menuBtn");
const nav = document.querySelector(".navigation");

// Hamburger toggle
menuButton.addEventListener("click", () => {
  nav.classList.toggle("open");
  menuButton.textContent = nav.classList.contains("open") ? "✖" : "☰";
});

// Function to render cards
function renderTemples(templeArray) {
  gallery.innerHTML = "";
  templeArray.forEach(temple => {
    const card = document.createElement("figure");

    const img = document.createElement("img");
    img.src = temple.imageUrl;
    img.loading = "lazy";
    img.alt = temple.templeName;

    const name = document.createElement("figcaption");
    name.innerHTML = `
    <strong>${temple.templeName}</strong><br>
    <span class="label">Location:</span> ${temple.location}<br>
    <span class="label">Dedicated:</span> ${temple.dedicated}<br>
    <span class="label">Area:</span> ${temple.area.toLocaleString()} sq ft
    `;

    card.appendChild(img);
    card.appendChild(name);
    gallery.appendChild(card);
  });
}

// Initial render
renderTemples(temples);

// Filter functions
const filters = {
  Home: () => renderTemples(temples),
  Old: () => renderTemples(temples.filter(t => new Date(t.dedicated).getFullYear() < 1900)),
  New: () => renderTemples(temples.filter(t => new Date(t.dedicated).getFullYear() > 2000)),
  Large: () => renderTemples(temples.filter(t => t.area > 90000)),
  Small: () => renderTemples(temples.filter(t => t.area < 10000))
};

// Event delegation for nav
document.querySelectorAll(".navigation a").forEach(link => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const filterType = e.target.textContent.trim();
    if (filters[filterType]) filters[filterType]();
  });
});

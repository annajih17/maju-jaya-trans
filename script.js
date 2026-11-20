const routes = [
  { origin: "Kebumen", label: "Travel Kebumen Se", image: "photo-1530789253388-582c481c54b0", tag: "Rute favorit" },
  { origin: "Jogja", label: "Travel Jogja Bali", image: "photo-1501785888041-af3ef285b470", tag: "Nyaman" },
  { origin: "Solo", label: "Travel Solo Bali", image: "photo-1519046904884-53103b34b206", tag: "Bisa nego" },
  { origin: "Boyolali", label: "Travel Boyolali Bali", image: "photo-1500530855697-b586d89ba3ee", tag: "Pilihan populer" },
  { origin: "Semarang", label: "Travel Semarang Bali", image: "photo-1464822759023-fed622ff2c3b", tag: "Bisa nego" },
  { origin: "Jepara", label: "Travel Jepara Bali", image: "photo-1470770841072-f978cf4d019e", tag: "Bisa nego" },
  { origin: "Kudus", label: "Travel Kudus Bali", image: "photo-1507525428034-b723cf961d3e", tag: "Bisa nego" },
  { origin: "Pati", label: "Travel Pati Bali", image: "photo-1518548419970-58e3b4079ab2", tag: "Bisa nego" }
];

const routeGrid = document.querySelector("#route-grid");
const bookingForm = document.querySelector("#booking-form");
const feedback = document.querySelector("#form-feedback");
const originSelect = document.querySelector("#origin");
const dateInput = bookingForm.elements.date;
const menuToggle = document.querySelector(".menu-toggle");
const mainNav = document.querySelector(".main-nav");

routes.forEach((route) => {
  const card = document.createElement("article");
  card.className = "route-card";
  card.innerHTML = `
    <div class="route-image">
      <img src="https://images.unsplash.com/${route.image}?auto=format&fit=crop&w=650&q=80" alt="Pemandangan perjalanan ${route.origin}" loading="lazy">
      <span class="route-tag">${route.tag}</span>
    </div>
    <div class="route-content">
      <h3>${route.label}</h3>
      <p>Keberangkatan dari ${route.origin}</p>
      <div class="route-meta">
        <span class="negotiable">Harga bisa nego</span>
        <a class="route-choose" href="#pesan" data-origin="${route.origin}">Pilih rute <span aria-hidden="true">→</span></a>
      </div>
    </div>`;
  routeGrid.append(card);
});

const today = new Date();
const localToday = new Date(today.getTime() - today.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
dateInput.min = localToday;

routeGrid.addEventListener("click", (event) => {
  const link = event.target.closest("[data-origin]");
  if (!link) return;
  originSelect.value = link.dataset.origin;
  feedback.textContent = `Rute dari ${link.dataset.origin} dipilih. Lengkapi formulir untuk melanjutkan.`;
});

bookingForm.addEventListener("submit", (event) => {
  event.preventDefault();
  if (!bookingForm.reportValidity()) return;

  const booking = Object.fromEntries(new FormData(bookingForm));
  const message = [
    "Halo Maju Jaya Trans, saya ingin menanyakan perjalanan:",
    `Nama: ${booking.name}`,
    `Rute: ${booking.origin} ke ${booking.destination}`,
    `Tanggal berangkat: ${new Date(`${booking.date}T00:00:00`).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })}`,
    `Jumlah penumpang: ${booking.passengers}`
  ].join("\n");
  const whatsappUrl = `https://wa.me/6283141268453?text=${encodeURIComponent(message)}`;
  window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  feedback.textContent = "Detail perjalanan siap dikirim. Silakan lanjutkan percakapan di WhatsApp.";
});

menuToggle.addEventListener("click", () => {
  const isOpen = mainNav.classList.toggle("is-open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Tutup menu" : "Buka menu");
});

mainNav.addEventListener("click", (event) => {
  if (event.target.closest("a")) {
    mainNav.classList.remove("is-open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Buka menu");
  }
});

document.querySelector("#current-year").textContent = new Date().getFullYear();

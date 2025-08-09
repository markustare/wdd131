document.addEventListener('DOMContentLoaded', () => {
  // Mobile menu toggle
  const navToggle = document.getElementById('navToggle');
  const mainNav = document.getElementById('mainNav');

  navToggle?.addEventListener('click', () => {
    const expanded = navToggle.getAttribute('aria-expanded') === 'true' || false;
    navToggle.setAttribute('aria-expanded', !expanded);
    mainNav.classList.toggle('show');
  });

  // Lazy loading polyfill fallback for picture sources and imgs with data-src/data-srcset
  const lazyImages = document.querySelectorAll('img[data-src], source[data-srcset]');
  lazyImages.forEach(el => {
    if (el.tagName.toLowerCase() === 'img' && el.dataset.src) {
      el.src = el.dataset.src;
      el.removeAttribute('data-src');
    }
    if (el.tagName.toLowerCase() === 'source' && el.dataset.srcset) {
      el.srcset = el.dataset.srcset;
      el.removeAttribute('data-srcset');
    }
  });

  // Update footer year and last modified date
  const currentYearSpan = document.getElementById('currentyear');
  if (currentYearSpan) {
    currentYearSpan.textContent = new Date().getFullYear();
  }

  const lastModifiedP = document.getElementById('lastModified');
  if (lastModifiedP) {
    const lastMod = new Date(document.lastModified);
    lastModifiedP.textContent = `Last updated: ${lastMod.toLocaleDateString()}`;
  }

  // Testimonials for home page
  if (document.getElementById('testimonialsList')) {
    const testimonials = [
      "I loved the healthy cooking demo. It was so practical and easy to follow! – Sarah",
      "The Mother's Legacy Team changed how we cook at home. No more greasy meals! – Ahmed",
      "Excellent workshop and delicious recipes. Highly recommended! – Fatima",
    ];
    const ul = document.getElementById('testimonialsList');
    testimonials.forEach(text => {
      const li = document.createElement('li');
      li.textContent = text;
      ul.appendChild(li);
    });
  }

  // Booking form functionality (save draft and show saved bookings)
  const bookingForm = document.getElementById('bookingForm');
  const saveDraftBtn = document.getElementById('saveDraft');
  const bookingsList = document.getElementById('bookingsList');
  const formMsg = document.getElementById('formMsg');

  if (bookingForm && saveDraftBtn && bookingsList) {
    // Load saved bookings from localStorage
    const savedBookings = JSON.parse(localStorage.getItem('bookings') || '[]');

    function renderBookings() {
      bookingsList.innerHTML = '';
      if (savedBookings.length === 0) {
        bookingsList.innerHTML = '<li>No saved bookings.</li>';
        return;
      }
      savedBookings.forEach((booking, i) => {
        const li = document.createElement('li');
        li.textContent = `${booking.fullName} (${booking.email}) - ${booking.demoType}, preferred: ${booking.preferredDate || 'N/A'}`;
        bookingsList.appendChild(li);
      });
    }

    renderBookings();

    saveDraftBtn.addEventListener('click', () => {
      if (!bookingForm.checkValidity()) {
        formMsg.textContent = 'Please fill in all required fields correctly before saving.';
        formMsg.style.color = 'red';
        return;
      }
      formMsg.textContent = '';
      const formData = new FormData(bookingForm);
      const bookingObj = {};
      formData.forEach((value, key) => {
        bookingObj[key] = value;
      });
      savedBookings.push(bookingObj);
      localStorage.setItem('bookings', JSON.stringify(savedBookings));
      renderBookings();
      formMsg.textContent = 'Booking saved locally. We will contact you soon.';
      formMsg.style.color = 'green';
      bookingForm.reset();
    });

    bookingForm.addEventListener('submit', e => {
      e.preventDefault();
      if (!bookingForm.checkValidity()) {
        formMsg.textContent = 'Please fill in all required fields correctly before submitting.';
        formMsg.style.color = 'red';
        return;
      }
      formMsg.textContent = 'Thank you! Your booking request was submitted.';
      formMsg.style.color = 'green';
      bookingForm.reset();
    });
  }

});
document.addEventListener("DOMContentLoaded", function () {
  const track = document.querySelector(".carousel-track");
  if (!track) return;

  const items = Array.from(track.children);
  const prevBtn = document.querySelector(".carousel-btn.prev");
  const nextBtn = document.querySelector(".carousel-btn.next");
  let currentIndex = 0;

  function updateCarousel() {
    items.forEach((item, index) => {
      item.classList.remove("active");
      if (index === currentIndex) {
        item.classList.add("active");
      }
    });
    track.style.transform = `translateX(-${currentIndex * 100}%)`;
  }

  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      currentIndex = (currentIndex + 1) % items.length;
      updateCarousel();
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener("click", () => {
      console.log("Previous button clicked");
      currentIndex = (currentIndex - 1 + items.length) % items.length;
      updateCarousel();
    });
  }

  updateCarousel();
});

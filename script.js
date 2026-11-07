/**
 * FestPeak — Curated Experience Platform
 * Halo Visual Reference Implementation:
 * - Geist + Newsreader Typography & Dark Premium Tokens
 * - Interactive 3D Prismatic Light Engine (Refraction, Dispersion, Dust Motes)
 * - Complete Client-Side Event Discovery, Bookmarking & Registration
 */

// ==========================================================================
// 1. EVENT DATA (Natural, authentic, and professionally curated)
// ==========================================================================
const events = [
  {
    id: 1,
    title: "Future Forward Summit",
    category: "Technology",
    date: "NOV 14, 2026",
    time: "9:30 AM – 5:00 PM",
    venue: "T-Hub, Hyderabad",
    price: "Free entry",
    description: "A full-day tech meetup covering AI engineering, open source tools, and early-stage startup lessons. Features lightning talks, live demos, and open Q&A sessions with local engineers and founders.",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1000&q=85",
    short: "Tech talks, demos, and discussions with local engineers and founders."
  },
  {
    id: 2,
    title: "The Indie Soundscape",
    category: "Music",
    date: "NOV 21, 2026",
    time: "6:00 PM – 10:00 PM",
    venue: "The Moonshine Project, Hyderabad",
    price: "From ₹499",
    description: "A live showcase featuring four independent singer-songwriters and indie bands. An intimate gig room with great acoustic sound, food, and craft drinks.",
    image: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=1000&q=85",
    short: "Four independent singer-songwriters and bands playing live sets."
  },
  {
    id: 3,
    title: "Founders & Chai",
    category: "Business",
    date: "NOV 28, 2026",
    time: "10:00 AM – 1:00 PM",
    venue: "Social, Jubilee Hills",
    price: "₹299",
    description: "An informal Saturday morning meetup over Irani chai. No slides or pitches — just candid conversations about hiring, customer acquisition, pricing, and everyday startup problems.",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1000&q=85",
    short: "A casual Saturday morning chat with founders and operators over tea."
  },
  {
    id: 4,
    title: "Sunday Slowdown",
    category: "Lifestyle",
    date: "DEC 06, 2026",
    time: "7:00 AM – 10:00 AM",
    venue: "Botanical Garden, Hyderabad",
    price: "₹199",
    description: "A relaxed morning session outdoors featuring 45 minutes of gentle mobility drills, breathing exercises, and a walk through the botanical trails. Mats provided on site.",
    image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1000&q=85",
    short: "Gentle mobility work, breath exercises, and a walk through the gardens."
  },
  {
    id: 5,
    title: "The Art of Seeing",
    category: "Arts",
    date: "DEC 12, 2026",
    time: "11:00 AM – 4:00 PM",
    venue: "State Art Gallery, Hyderabad",
    price: "₹350",
    description: "A hands-on drawing and sketching workshop for beginners. Learn fundamental techniques for perspective, light, and composition. All drawing materials are included in your ticket.",
    image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=1000&q=85",
    short: "A beginner-friendly sketching and composition workshop. Materials included."
  },
  {
    id: 6,
    title: "Designing Tomorrow",
    category: "Technology",
    date: "DEC 19, 2026",
    time: "10:00 AM – 4:00 PM",
    venue: "WE Hub, Hyderabad",
    price: "₹499",
    description: "A one-day interactive sprint where you work in small teams on a real design problem. Focuses on user journey mapping, wireframing, and peer feedback with product designers.",
    image: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?auto=format&fit=crop&w=1000&q=85",
    short: "A day-long design sprint tackling a real product challenge in teams."
  }
];

// ==========================================================================
// 2. DOM REFERENCES
// ==========================================================================
const grid = document.getElementById("eventGrid");
const searchInput = document.getElementById("searchInput");
const filters = document.getElementById("categoryFilters");
const resultsCount = document.getElementById("resultsCount");
const emptyState = document.getElementById("emptyState");
const modal = document.getElementById("eventModal");
const toast = document.getElementById("toast");
const headerSearchBtn = document.getElementById("headerSearchBtn");

let activeCategory = "All";
let savedEvents = JSON.parse(localStorage.getItem("festpeakSaved") || localStorage.getItem("eventoraSaved") || "[]");
let toastTimeout = null;
let currentOpenEventId = null;

// ==========================================================================
// REGISTRATION HELPERS & STORAGE
// ==========================================================================
function getRegistrations() {
  try {
    return JSON.parse(localStorage.getItem("festpeakRegistrations") || localStorage.getItem("eventoraRegistrations") || "[]");
  } catch (err) {
    return [];
  }
}

function updateRegistrationBadge() {
  const regs = getRegistrations();
  const badge = document.getElementById("regCountBadge");
  if (badge) {
    badge.textContent = regs.length;
    badge.style.display = regs.length > 0 ? "inline-flex" : "none";
  }
}

// ==========================================================================
// 3. TOAST FEEDBACK NOTIFICATION
// ==========================================================================
function showToast(message) {
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => {
    toast.classList.remove("show");
  }, 2600);
}

// ==========================================================================
// 4. EVENT RENDERING & FILTERING
// ==========================================================================
function renderEvents() {
  const term = searchInput.value.trim().toLowerCase();
  const filtered = events.filter(e => {
    const matchesCategory = activeCategory === "All" || e.category === activeCategory;
    const matchesSearch = [e.title, e.category, e.venue, e.description].some(v =>
      v.toLowerCase().includes(term)
    );
    return matchesCategory && matchesSearch;
  });

  const registrations = getRegistrations();

  resultsCount.textContent = `Showing ${filtered.length} ${filtered.length === 1 ? "event" : "events"}`;

  grid.innerHTML = filtered.map(e => {
    const isSaved = savedEvents.includes(e.id);
    const isRegistered = registrations.some(r => r.eventId === e.id || r.event === e.title);
    return `
      <article class="event-card" tabindex="0" role="button" aria-label="View ${e.title}" data-id="${e.id}">
        <div class="card-image">
          <img src="${e.image}" alt="${e.title}" loading="lazy">
          <span class="category-label">${e.category}</span>
          ${isRegistered ? '<span class="card-registered-badge">✓ Registered</span>' : ''}
          <button class="card-save ${isSaved ? "saved" : ""}" data-save="${e.id}" aria-label="${isSaved ? "Remove bookmark" : "Save"} ${e.title}" title="Save event">
            ${isSaved ? "♥" : "♡"}
          </button>
        </div>
        <div class="card-body">
          <div class="card-date">${e.date}</div>
          <h3 class="card-title">${e.title}</h3>
          <p class="card-description">${e.short}</p>
          <div class="card-footer">
            <span class="venue">⌖ ${e.venue}</span>
            <span class="card-arrow" aria-hidden="true">↗</span>
          </div>
        </div>
      </article>
    `;
  }).join("");

  emptyState.classList.toggle("hidden", filtered.length !== 0);
  grid.classList.toggle("hidden", filtered.length === 0);
}

// ==========================================================================
// 5. MODAL LOGIC & REGISTRATION
// ==========================================================================
function openEvent(id) {
  const e = events.find(item => item.id === Number(id));
  if (!e) return;

  currentOpenEventId = e.id;

  document.getElementById("modalImage").src = e.image;
  document.getElementById("modalImage").alt = e.title;
  document.getElementById("modalCategory").textContent = e.category;
  document.getElementById("modalTitle").textContent = e.title;
  document.getElementById("modalDescription").textContent = e.description;
  document.getElementById("modalDate").textContent = `${e.date} · ${e.time}`;
  document.getElementById("modalVenue").textContent = e.venue;
  document.getElementById("modalPrice").textContent = e.price;
  document.getElementById("selectedEvent").value = e.title;

  const select = document.getElementById("eventSelect");
  select.innerHTML = events.map(item =>
    `<option value="${item.title}" ${item.id === e.id ? "selected" : ""}>${item.title}</option>`
  ).join("");

  const registrations = getRegistrations();
  const existingReg = registrations.find(r => r.eventId === e.id || r.event === e.title);

  const regForm = document.getElementById("registrationForm");
  const regPanel = document.getElementById("registeredPanel");
  const successPanel = document.getElementById("successPanel");
  const formHeading = document.getElementById("formIntroHeading");
  const formDesc = document.getElementById("formIntroDesc");

  successPanel.classList.add("hidden");
  document.getElementById("formError").textContent = "";

  if (existingReg) {
    // Already registered for this event -> show confirmed registered state
    regForm.classList.add("hidden");
    if (regPanel) regPanel.classList.remove("hidden");
    if (formHeading) formHeading.textContent = "Your registration";
    if (formDesc) formDesc.textContent = "You're registered for this event. Your booking details are below.";

    const regNameEl = document.getElementById("registeredName");
    const regEmailEl = document.getElementById("registeredEmail");
    const regDateEl = document.getElementById("registeredDate");

    if (regNameEl) regNameEl.textContent = existingReg.name || "Attendee";
    if (regEmailEl) regEmailEl.textContent = existingReg.email || "";
    if (regDateEl) {
      if (existingReg.registeredAt) {
        const d = new Date(existingReg.registeredAt);
        regDateEl.textContent = `Registered ${d.toLocaleDateString("en-US", { month: "short", day: "numeric" })}`;
      } else {
        regDateEl.textContent = "Registration Confirmed";
      }
    }
  } else {
    // Not registered -> show the registration form
    if (regPanel) regPanel.classList.add("hidden");
    regForm.classList.remove("hidden");
    if (formHeading) formHeading.textContent = "Save your spot";
    if (formDesc) formDesc.textContent = "Drop in your details below to register for this event.";
  }

  modal.classList.remove("hidden");
  document.body.style.overflow = "hidden";
}

function closeModal() {
  modal.classList.add("hidden");
  document.body.style.overflow = "";
}

// Category filter chips listener
filters.addEventListener("click", e => {
  const chip = e.target.closest("[data-category]");
  if (!chip) return;
  activeCategory = chip.dataset.category;
  filters.querySelectorAll(".filter-chip").forEach(c => {
    const isSelected = c === chip;
    c.classList.toggle("selected", isSelected);
    c.setAttribute("aria-selected", isSelected ? "true" : "false");
  });
  renderEvents();
});

// Search input listener
searchInput.addEventListener("input", renderEvents);

// Event card click & save listeners
grid.addEventListener("click", e => {
  const save = e.target.closest("[data-save]");
  if (save) {
    e.stopPropagation();
    const id = Number(save.dataset.save);
    const wasSaved = savedEvents.includes(id);
    savedEvents = wasSaved ? savedEvents.filter(x => x !== id) : [...savedEvents, id];
    localStorage.setItem("festpeakSaved", JSON.stringify(savedEvents));
    showToast(wasSaved ? "Event removed from saved" : "Event saved to bookmarks");
    renderEvents();
    return;
  }

  const card = e.target.closest("[data-id]");
  if (card) {
    openEvent(card.dataset.id);
  }
});

// Keyboard navigation on cards
grid.addEventListener("keydown", e => {
  if ((e.key === "Enter" || e.key === " ") && e.target.matches("[data-id]")) {
    e.preventDefault();
    openEvent(e.target.dataset.id);
  }
});

// Reset filters button
document.getElementById("resetFilters").addEventListener("click", () => {
  activeCategory = "All";
  searchInput.value = "";
  filters.querySelectorAll(".filter-chip").forEach(c => {
    const isAll = c.dataset.category === "All";
    c.classList.toggle("selected", isAll);
    c.setAttribute("aria-selected", isAll ? "true" : "false");
  });
  renderEvents();
});

// Exact scroll positioning for navigation and anchor links
function scrollToSection(targetEl) {
  if (!targetEl) return;
  const header = document.querySelector(".site-header");
  const headerHeight = header ? header.offsetHeight : 64;
  const rect = targetEl.getBoundingClientRect();
  const targetTop = rect.top + window.pageYOffset - headerHeight;

  window.scrollTo({
    top: Math.round(targetTop),
    behavior: "smooth"
  });
}

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function (e) {
    const targetId = this.getAttribute("href");
    if (!targetId || targetId === "#") return;
    const targetEl = document.querySelector(targetId);
    if (!targetEl) return;

    e.preventDefault();
    scrollToSection(targetEl);
    if (history.pushState) {
      history.pushState(null, "", targetId);
    }
  });
});

// Modal close listeners
document.getElementById("closeModal").addEventListener("click", closeModal);
document.getElementById("doneButton").addEventListener("click", () => {
  closeModal();
  const eventsSection = document.getElementById("events");
  if (eventsSection) {
    setTimeout(() => scrollToSection(eventsSection), 120);
  }
});

modal.addEventListener("click", e => {
  if (e.target === modal) closeModal();
});

// Global keyboard shortcuts (Escape to close, Cmd/Ctrl+K to search)
document.addEventListener("keydown", e => {
  if (e.key === "Escape") {
    if (modal && !modal.classList.contains("hidden")) closeModal();
    if (registrationsModal && !registrationsModal.classList.contains("hidden")) closeRegistrationsModal();
  }
  if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
    e.preventDefault();
    searchInput.focus();
  }
});

if (headerSearchBtn) {
  headerSearchBtn.addEventListener("click", () => {
    searchInput.focus();
    searchInput.scrollIntoView({ behavior: "smooth", block: "center" });
  });
}

document.getElementById("eventSelect").addEventListener("change", e => {
  document.getElementById("selectedEvent").value = e.target.value;
});

function showError(message) {
  document.getElementById("formError").textContent = message;
}

// Registration form submission & validation
document.getElementById("registrationForm").addEventListener("submit", e => {
  e.preventDefault();
  const form = e.currentTarget;
  const name = document.getElementById("fullName");
  const email = document.getElementById("email");
  const phone = document.getElementById("phone");

  [name, email, phone].forEach(x => x.classList.remove("invalid"));

  const cleanName = name.value.trim();
  const cleanEmail = email.value.trim();
  const cleanPhone = phone.value.replace(/\D/g, "");

  if (cleanName.length < 2) {
    name.classList.add("invalid");
    name.focus();
    return showError("Please enter your full name.");
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(cleanEmail)) {
    email.classList.add("invalid");
    email.focus();
    return showError("Please enter a valid email address.");
  }

  if (!/^[6-9]\d{9}$/.test(cleanPhone)) {
    phone.classList.add("invalid");
    phone.focus();
    return showError("Please enter a valid 10-digit mobile number.");
  }

  const selectedEventTitle = document.getElementById("eventSelect").value;
  const matchingEvent = events.find(ev => ev.title === selectedEventTitle);
  const eventIdToSave = matchingEvent ? matchingEvent.id : currentOpenEventId;

  const registration = {
    eventId: eventIdToSave,
    name: cleanName,
    email: cleanEmail,
    phone: cleanPhone,
    event: selectedEventTitle,
    registeredAt: new Date().toISOString()
  };

  const registrations = getRegistrations();
  const updatedRegs = registrations.filter(r => r.eventId !== eventIdToSave && r.event !== selectedEventTitle);
  updatedRegs.push(registration);
  localStorage.setItem("festpeakRegistrations", JSON.stringify(updatedRegs));

  updateRegistrationBadge();
  renderEvents();

  document.getElementById("successMessage").textContent = `Thanks, ${cleanName}! You're registered for ${registration.event}. We've saved your spot.`;
  form.classList.add("hidden");
  const regPanel = document.getElementById("registeredPanel");
  if (regPanel) regPanel.classList.add("hidden");
  document.getElementById("successPanel").classList.remove("hidden");
  showToast("Registration confirmed.");
});

// Cancel registration from the event modal
const cancelRegBtn = document.getElementById("cancelRegBtn");
if (cancelRegBtn) {
  cancelRegBtn.addEventListener("click", () => {
    if (!currentOpenEventId) return;
    const currentEv = events.find(ev => ev.id === currentOpenEventId);
    let regs = getRegistrations();
    regs = regs.filter(r => r.eventId !== currentOpenEventId && (!currentEv || r.event !== currentEv.title));
    localStorage.setItem("festpeakRegistrations", JSON.stringify(regs));
    updateRegistrationBadge();
    renderEvents();
    showToast("Registration cancelled.");
    openEvent(currentOpenEventId);
  });
}

// ==========================================================================
// MY REGISTRATIONS MODAL CONTROLLER
// ==========================================================================
const myRegistrationsNav = document.getElementById("myRegistrationsNav");
const registrationsModal = document.getElementById("registrationsModal");
const closeRegModal = document.getElementById("closeRegModal");
const regModalBody = document.getElementById("regModalBody");

function renderRegistrationsList() {
  if (!regModalBody) return;
  const regs = getRegistrations();
  if (regs.length === 0) {
    regModalBody.innerHTML = `
      <div class="reg-empty-wrap">
        <div class="reg-empty-icon">🎟️</div>
        <h3>No registered events yet</h3>
        <p>You haven't signed up for any events yet. Explore upcoming gigs, talks, and workshops.</p>
        <button class="button button-primary" id="regBrowseBtn">Browse events <span class="btn-arrow">↗</span></button>
      </div>
    `;
    const regBrowseBtn = document.getElementById("regBrowseBtn");
    if (regBrowseBtn) {
      regBrowseBtn.addEventListener("click", () => {
        closeRegistrationsModal();
        const evSection = document.getElementById("events");
        if (evSection) scrollToSection(evSection);
      });
    }
    return;
  }

  regModalBody.innerHTML = `
    <div class="reg-list">
      ${regs.map(r => {
        const ev = events.find(item => item.id === r.eventId || item.title === r.event);
        const img = ev ? ev.image : "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=400&q=80";
        const date = ev ? `${ev.date} · ${ev.time}` : "Upcoming";
        const venue = ev ? ev.venue : "Hyderabad";
        const title = r.event || (ev ? ev.title : "Registered Event");
        const regDateFormatted = r.registeredAt ? new Date(r.registeredAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : "Confirmed";

        return `
          <div class="reg-item-card" data-event-id="${ev ? ev.id : ''}">
            <img class="reg-item-thumb" src="${img}" alt="${title}" loading="lazy">
            <div class="reg-item-details">
              <span class="reg-item-tag">✓ Confirmed Spot</span>
              <h4 class="reg-item-title">${title}</h4>
              <div class="reg-item-meta">
                <span>🗓 ${date}</span>
                <span>⌖ ${venue}</span>
              </div>
              <div class="reg-item-attendee">
                Booked for <strong>${r.name}</strong> (${r.email}) · ${regDateFormatted}
              </div>
            </div>
            <div class="reg-item-actions">
              ${ev ? `<button type="button" class="button button-primary button-sm view-reg-event" data-open-id="${ev.id}">View event</button>` : ''}
              <button type="button" class="button button-outline button-sm cancel-single-reg" data-event-title="${title}" data-event-id="${ev ? ev.id : ''}">Cancel</button>
            </div>
          </div>
        `;
      }).join("")}
    </div>
  `;

  regModalBody.querySelectorAll(".view-reg-event").forEach(btn => {
    btn.addEventListener("click", () => {
      const openId = btn.dataset.openId;
      closeRegistrationsModal();
      if (openId) {
        setTimeout(() => openEvent(openId), 150);
      }
    });
  });

  regModalBody.querySelectorAll(".cancel-single-reg").forEach(btn => {
    btn.addEventListener("click", () => {
      const evId = btn.dataset.eventId ? Number(btn.dataset.eventId) : null;
      const evTitle = btn.dataset.eventTitle;
      let currentRegs = getRegistrations();
      currentRegs = currentRegs.filter(r => (evId ? r.eventId !== evId : true) && r.event !== evTitle);
      localStorage.setItem("festpeakRegistrations", JSON.stringify(currentRegs));
      updateRegistrationBadge();
      renderEvents();
      showToast("Registration cancelled.");
      renderRegistrationsList();
    });
  });
}

function openRegistrationsModal() {
  if (!registrationsModal) return;
  renderRegistrationsList();
  registrationsModal.classList.remove("hidden");
  document.body.style.overflow = "hidden";
}

function closeRegistrationsModal() {
  if (!registrationsModal) return;
  registrationsModal.classList.add("hidden");
  document.body.style.overflow = "";
}

if (myRegistrationsNav) {
  myRegistrationsNav.addEventListener("click", e => {
    e.preventDefault();
    openRegistrationsModal();
  });
}

if (closeRegModal) {
  closeRegModal.addEventListener("click", closeRegistrationsModal);
}

if (registrationsModal) {
  registrationsModal.addEventListener("click", e => {
    if (e.target === registrationsModal) closeRegistrationsModal();
  });
}

// Newsletter subscription
document.getElementById("newsletterForm").addEventListener("submit", e => {
  e.preventDefault();
  const email = document.getElementById("newsletterEmail");
  if (!email.checkValidity()) {
    email.reportValidity();
    return;
  }
  document.getElementById("newsletterMessage").textContent = "You're subscribed. We'll send our weekend picks every Thursday.";
  showToast("Subscribed to weekly picks.");
  email.value = "";
});

// Theme switcher
const themeToggle = document.getElementById("themeToggle");
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("light-theme");
  const isLight = document.body.classList.contains("light-theme");
  themeToggle.textContent = isLight ? "☼" : "☾";
  localStorage.setItem("festpeakTheme", isLight ? "light" : "dark");
});

if (localStorage.getItem("festpeakTheme") === "light" || localStorage.getItem("eventoraTheme") === "light") {
  document.body.classList.add("light-theme");
  themeToggle.textContent = "☼";
}

// Mobile navigation toggle
const menuToggle = document.getElementById("menuToggle");
const mainNav = document.querySelector(".main-nav");

menuToggle.addEventListener("click", () => {
  mainNav.classList.toggle("open");
});

document.querySelectorAll(".main-nav a").forEach(a => {
  a.addEventListener("click", () => {
    mainNav.classList.remove("open");
  });
});

// ==========================================================================
// 6. HALO 3D PRISM + REFRACTION LIGHT ENGINE
// ==========================================================================
(function initHaloPrismEngine() {
  const glCanvas = document.getElementById("gl");
  const fxCanvas = document.getElementById("fx");
  if (!glCanvas || !fxCanvas) return;

  const glCtx = glCanvas.getContext("2d");
  const fxCtx = fxCanvas.getContext("2d");
  if (!glCtx || !fxCtx) return;

  let W = 0, H = 0, dpr = 1;
  let centroidX = 0, centroidY = 0, prismSize = 0;
  let pointerX = 0.5, pointerY = 0.5;
  let targetPointerX = 0.5, targetPointerY = 0.5;
  let autoTime = 0;
  let lastUserInteraction = Date.now();
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const DUST_COUNT = 70;
  const dustMotes = Array.from({ length: DUST_COUNT }, () => ({
    dist: Math.random(),
    offset: (Math.random() - 0.5) * 36,
    speed: 0.0015 + Math.random() * 0.003,
    radius: 0.5 + Math.random() * 1.1,
    alpha: 0.3 + Math.random() * 0.6,
    twinkleSpeed: 0.03 + Math.random() * 0.05,
    twinklePhase: Math.random() * Math.PI * 2
  }));

  function resize() {
    const stage = glCanvas.parentElement;
    if (!stage) return;
    W = stage.clientWidth;
    H = stage.clientHeight;
    dpr = Math.min(window.devicePixelRatio || 1, 2);

    glCanvas.width = W * dpr;
    glCanvas.height = H * dpr;
    fxCanvas.width = W * dpr;
    fxCanvas.height = H * dpr;

    glCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
    fxCtx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const isMobile = W < 820;
    if (isMobile) {
      prismSize = Math.min(W * 0.72, H * 0.40, 380);
      centroidX = W * 0.5;
      centroidY = H * 0.68;
    } else {
      prismSize = Math.min(W * 0.36, H * 0.62, 480);
      centroidX = W * 0.66;
      centroidY = H * 0.53;
    }
  }

  window.addEventListener("resize", debounce(resize, 60));
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(resize);
  }
  resize();

  function handlePointer(clientX, clientY) {
    const stage = glCanvas.parentElement;
    if (!stage) return;
    const rect = stage.getBoundingClientRect();
    targetPointerX = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
    targetPointerY = Math.max(0, Math.min(1, (clientY - rect.top) / rect.height));
    lastUserInteraction = Date.now();
  }

  window.addEventListener("pointermove", e => handlePointer(e.clientX, e.clientY), { passive: true });
  window.addEventListener("touchmove", e => {
    if (e.touches && e.touches[0]) {
      handlePointer(e.touches[0].clientX, e.touches[0].clientY);
    }
  }, { passive: true });

  function wavelengthToRGB(wl) {
    let r = 0, g = 0, b = 0;
    if (wl >= 400 && wl < 440) {
      r = -(wl - 440) / 40;
      b = 1.0;
    } else if (wl >= 440 && wl < 490) {
      g = (wl - 440) / 50;
      b = 1.0;
    } else if (wl >= 490 && wl < 510) {
      g = 1.0;
      b = -(wl - 510) / 20;
    } else if (wl >= 510 && wl < 580) {
      r = (wl - 510) / 70;
      g = 1.0;
    } else if (wl >= 580 && wl < 645) {
      r = 1.0;
      g = -(wl - 645) / 65;
    } else if (wl >= 645 && wl <= 720) {
      r = 1.0;
    }
    return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
  }

  function cauchyIndex(wlNm) {
    const wlUm = wlNm / 1000;
    return 1.35 + 0.08 / (wlUm * wlUm);
  }

  function render() {
    requestAnimationFrame(render);

    const isIdle = Date.now() - lastUserInteraction > 5000;
    if (!prefersReducedMotion && isIdle) {
      autoTime += 0.008;
      targetPointerX = 0.5 + Math.sin(autoTime) * 0.28;
      targetPointerY = 0.5 + Math.cos(autoTime * 0.8) * 0.22;
    }

    pointerX += (targetPointerX - pointerX) * 0.08;
    pointerY += (targetPointerY - pointerY) * 0.08;

    glCtx.clearRect(0, 0, W, H);
    fxCtx.clearRect(0, 0, W, H);

    const R = prismSize / Math.sqrt(3);
    const topV = { x: centroidX, y: centroidY - R };
    const rightV = { x: centroidX + prismSize / 2, y: centroidY + R / 2 };
    const leftV = { x: centroidX - prismSize / 2, y: centroidY + R / 2 };

    const entryT = 0.2 + pointerX * 0.6;
    const entryX = topV.x + (rightV.x - topV.x) * entryT;
    const entryY = topV.y + (rightV.y - topV.y) * entryT;

    const beamAngle = Math.PI * 0.95 + (pointerY - 0.5) * 0.45;
    const beamLength = Math.max(W, H) * 1.2;
    const sourceX = entryX + Math.cos(beamAngle) * beamLength;
    const sourceY = entryY + Math.sin(beamAngle) * beamLength;

    // Incoming Beam
    fxCtx.save();
    fxCtx.globalCompositeOperation = "lighter";

    fxCtx.beginPath();
    fxCtx.moveTo(sourceX, sourceY);
    fxCtx.lineTo(entryX, entryY);
    fxCtx.lineWidth = 14;
    fxCtx.strokeStyle = "rgba(255, 255, 255, 0.12)";
    fxCtx.stroke();

    fxCtx.beginPath();
    fxCtx.moveTo(sourceX, sourceY);
    fxCtx.lineTo(entryX, entryY);
    fxCtx.lineWidth = 3.5;
    fxCtx.strokeStyle = "rgba(255, 255, 255, 0.85)";
    fxCtx.stroke();

    // Dust Motes
    dustMotes.forEach(m => {
      if (!prefersReducedMotion) {
        m.dist -= m.speed;
        if (m.dist < 0) m.dist = 1;
        m.twinklePhase += m.twinkleSpeed;
      }

      const mx = sourceX + (entryX - sourceX) * m.dist;
      const my = sourceY + (entryY - sourceY) * m.dist;
      const perpAngle = beamAngle + Math.PI / 2;
      const spread = (1 - m.dist) * m.offset;
      const px = mx + Math.cos(perpAngle) * spread;
      const py = my + Math.sin(perpAngle) * spread;
      const curAlpha = m.alpha * (0.6 + 0.4 * Math.sin(m.twinklePhase));

      fxCtx.beginPath();
      fxCtx.arc(px, py, m.radius, 0, Math.PI * 2);
      fxCtx.fillStyle = `rgba(255, 255, 255, ${curAlpha})`;
      fxCtx.fill();
    });

    // Dispersed Rainbow
    const WAVELENGTHS = 36;
    const fanPoints = [];

    for (let i = 0; i < WAVELENGTHS; i++) {
      const wl = 410 + (i / (WAVELENGTHS - 1)) * (680 - 410);
      const n = cauchyIndex(wl);
      const [r, g, b] = wavelengthToRGB(wl);

      const internalAngle = Math.PI - 0.28 / n - (pointerY - 0.5) * 0.15;
      const midX = entryX - Math.cos(internalAngle) * (prismSize * 0.42);
      const midY = entryY - Math.sin(internalAngle) * (prismSize * 0.42);

      const exitAngle = Math.PI * 1.05 + ((WAVELENGTHS - 1 - i) / WAVELENGTHS) * 0.28 + (pointerY - 0.5) * 0.25;
      const exitLen = Math.max(W, H) * 1.4;
      const outX = midX - Math.cos(exitAngle) * exitLen;
      const outY = midY + Math.sin(exitAngle) * exitLen;

      fanPoints.push({ midX, midY, outX, outY, r, g, b });

      fxCtx.beginPath();
      fxCtx.moveTo(entryX, entryY);
      fxCtx.lineTo(midX, midY);
      fxCtx.lineWidth = 2.4;
      fxCtx.strokeStyle = `rgba(${r}, ${g}, ${b}, 0.45)`;
      fxCtx.stroke();

      fxCtx.beginPath();
      fxCtx.moveTo(midX, midY);
      fxCtx.lineTo(outX, outY);
      fxCtx.lineWidth = 4.2;
      fxCtx.strokeStyle = `rgba(${r}, ${g}, ${b}, 0.7)`;
      fxCtx.stroke();
    }

    for (let i = 0; i < fanPoints.length - 1; i++) {
      const p1 = fanPoints[i];
      const p2 = fanPoints[i + 1];

      fxCtx.beginPath();
      fxCtx.moveTo(p1.midX, p1.midY);
      fxCtx.lineTo(p1.outX, p1.outY);
      fxCtx.lineTo(p2.outX, p2.outY);
      fxCtx.lineTo(p2.midX, p2.midY);
      fxCtx.closePath();

      const grad = fxCtx.createLinearGradient(p1.midX, p1.midY, p1.outX, p1.outY);
      grad.addColorStop(0, `rgba(${p1.r}, ${p1.g}, ${p1.b}, 0.55)`);
      grad.addColorStop(0.3, `rgba(${p1.r}, ${p1.g}, ${p1.b}, 0.45)`);
      grad.addColorStop(0.7, `rgba(${p1.r}, ${p1.g}, ${p1.b}, 0.2)`);
      grad.addColorStop(1, `rgba(${p1.r}, ${p1.g}, ${p1.b}, 0)`);

      fxCtx.fillStyle = grad;
      fxCtx.fill();
    }

    fxCtx.beginPath();
    fxCtx.arc(entryX, entryY, 5, 0, Math.PI * 2);
    fxCtx.fillStyle = "rgba(255, 255, 255, 0.95)";
    fxCtx.fill();

    fxCtx.restore();

    // 3D Glass Prism
    glCtx.save();

    const tiltX = (pointerX - 0.5) * 14;
    const tiltY = (pointerY - 0.5) * 10;

    glCtx.beginPath();
    glCtx.moveTo(topV.x + tiltX * 0.5, topV.y + tiltY * 0.5);
    glCtx.lineTo(rightV.x + tiltX * 0.5, rightV.y + tiltY * 0.5);
    glCtx.lineTo(leftV.x + tiltX * 0.5, leftV.y + tiltY * 0.5);
    glCtx.closePath();
    glCtx.fillStyle = "rgba(10, 10, 12, 0.45)";
    glCtx.filter = "blur(18px)";
    glCtx.fill();
    glCtx.filter = "none";

    glCtx.beginPath();
    glCtx.moveTo(topV.x, topV.y);
    glCtx.lineTo(rightV.x, rightV.y);
    glCtx.lineTo(leftV.x, leftV.y);
    glCtx.closePath();

    const glassGrad = glCtx.createLinearGradient(
      topV.x + tiltX, topV.y,
      centroidX - tiltX, centroidY + R
    );
    glassGrad.addColorStop(0, "rgba(45, 45, 52, 0.35)");
    glassGrad.addColorStop(0.5, "rgba(25, 25, 30, 0.45)");
    glassGrad.addColorStop(1, "rgba(18, 18, 22, 0.65)");

    glCtx.fillStyle = glassGrad;
    glCtx.fill();

    glCtx.beginPath();
    glCtx.moveTo(topV.x, topV.y);
    glCtx.lineTo(rightV.x, rightV.y);
    glCtx.lineTo(leftV.x, leftV.y);
    glCtx.closePath();
    glCtx.lineWidth = 1.2;
    glCtx.strokeStyle = "rgba(255, 255, 255, 0.28)";
    glCtx.stroke();

    glCtx.beginPath();
    glCtx.moveTo(topV.x, topV.y);
    glCtx.lineTo(rightV.x, rightV.y);
    glCtx.lineWidth = 2.4;
    glCtx.strokeStyle = "rgba(255, 255, 255, 0.4)";
    glCtx.stroke();

    glCtx.beginPath();
    glCtx.moveTo(topV.x, topV.y);
    glCtx.lineTo(centroidX + tiltX, centroidY + tiltY);
    glCtx.lineWidth = 0.8;
    glCtx.strokeStyle = "rgba(255, 255, 255, 0.12)";
    glCtx.stroke();

    glCtx.restore();
  }

  requestAnimationFrame(render);
})();

function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// ==========================================================================
// 7. INITIALIZE PAGE
// ==========================================================================
updateRegistrationBadge();
renderEvents();

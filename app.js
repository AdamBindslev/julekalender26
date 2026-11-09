/**
 * ==============================================================================
 * EDUTASIA JULEKALENDER 2026 - HOVEDSKRIPT
 * ==============================================================================
 */

(function () {
  "use strict";

  // Konfiguration
  const config = window.CALENDAR_CONFIG || {
    title: "Edutasia julekalender 2026",
    subtitle: "Åbn dagens låge og få et nyt e-læringsboost hver dag frem til jul",
    year: 2026,
    doors: []
  };

  const STORAGE_KEY = `edutasia_watched_doors_${config.year || 2026}`;

  // DOM elementer
  const gridEl = document.getElementById("calendar-grid");
  const modalEl = document.getElementById("video-modal");
  const modalCloseBtn = document.getElementById("modal-close-btn");
  const modalTitleEl = document.getElementById("modal-title");
  const modalDayPillEl = document.getElementById("modal-day-pill");
  const modalFooterDescEl = document.getElementById("modal-footer-desc");
  const videoWrapperEl = document.getElementById("video-wrapper");
  const toastEl = document.getElementById("toast");
  const toastMsgEl = document.getElementById("toast-message");
  const testBadgeEl = document.getElementById("test-mode-badge");
  const statusDateTextEl = document.getElementById("status-date-text");
  const statusWatchedCountEl = document.getElementById("status-watched-count");

  let toastTimeout = null;
  let lastActiveElement = null;

  // Læs URL parametre (til forhåndstest / preview)
  const urlParams = new URLSearchParams(window.location.search);
  const isPreviewMode = urlParams.get("preview") === "true" || urlParams.get("preview") === "1" || urlParams.get("admin") === "true";
  const simulatedDayParam = parseInt(urlParams.get("day"), 10);
  const simulatedDay = (!isNaN(simulatedDayParam) && simulatedDayParam >= 1 && simulatedDayParam <= 24) ? simulatedDayParam : null;

  // Håndter lokal dato & tid
  const today = new Date();
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth() + 1; // 1 = Jan, 12 = Dec
  const currentDay = today.getDate();

  // Beregn låge-tilstand for en given dag (1-24)
  function getDoorStatus(day) {
    // 1. Preview mode låser alle låger op
    if (isPreviewMode) {
      return { isUnlocked: true, isToday: day === 1 };
    }

    // 2. Simuleret dag i URL (?day=X)
    if (simulatedDay !== null) {
      return {
        isUnlocked: day <= simulatedDay,
        isToday: day === simulatedDay
      };
    }

    // 3. Reelt tjek mod årstal og december
    const targetYear = config.year || 2026;
    if (currentYear > targetYear) {
      // Året er passeret, alle låger er åbne som arkiv
      return { isUnlocked: true, isToday: false };
    } else if (currentYear === targetYear) {
      if (currentMonth === 12) {
        return {
          isUnlocked: day <= currentDay,
          isToday: day === currentDay
        };
      } else if (currentMonth > 12) {
        return { isUnlocked: true, isToday: false };
      } else {
        // Før 1. december
        return { isUnlocked: false, isToday: false };
      }
    } else {
      // Før målsat år
      return { isUnlocked: false, isToday: false };
    }
  }

  // Gemte sete låger (localStorage)
  function getWatchedDoors() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  }

  function markDoorAsWatched(day) {
    try {
      const watched = getWatchedDoors();
      if (!watched.includes(day)) {
        watched.push(day);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(watched));
      }
      updateWatchedCounter();
    } catch (e) {
      console.warn("Kunne ikke gemme lågestatus i localStorage:", e);
    }
  }

  function updateWatchedCounter() {
    const watched = getWatchedDoors();
    if (statusWatchedCountEl) {
      statusWatchedCountEl.textContent = `${watched.length} af 24 låger set`;
    }
  }

  // Parser Vimeo URL eller ID og returnerer sikker embed URL
  function buildVimeoEmbedUrl(inputUrl) {
    if (!inputUrl) return "";

    // Hvis det allerede er et komplet embed-link
    if (inputUrl.includes("player.vimeo.com/video/")) {
      const glue = inputUrl.includes("?") ? "&" : "?";
      return `${inputUrl}${glue}autoplay=1`;
    }

    // Regex til at udtrække video ID og evt unlisted privacy hash
    // fx https://vimeo.com/714785167 eller https://vimeo.com/714785167/9a8b7c6d5e
    const vimeoRegex = /(?:vimeo\.com\/)(\d+)(?:\/([a-zA-Z0-9]+))?/;
    const match = String(inputUrl).trim().match(vimeoRegex);

    if (match) {
      const videoId = match[1];
      const privacyHash = match[2];
      let embed = `https://player.vimeo.com/video/${videoId}?autoplay=1&title=0&byline=0&portrait=0&badge=0&autopause=0`;
      if (privacyHash) {
        embed += `&h=${privacyHash}`;
      }
      return embed;
    }

    // Hvis brugeren blot har skrevet et tal (video ID)
    if (/^\d+$/.test(String(inputUrl).trim())) {
      return `https://player.vimeo.com/video/${inputUrl.trim()}?autoplay=1&title=0&byline=0&portrait=0`;
    }

    // Fallback til original input
    return inputUrl;
  }

  // Vis venlig toast besked
  function showToast(message) {
    if (!toastEl || !toastMsgEl) return;
    toastMsgEl.textContent = message;
    toastEl.classList.add("is-visible");

    if (toastTimeout) clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => {
      toastEl.classList.remove("is-visible");
    }, 3200);
  }

  // Åbn Video Modal
  function openVideoModal(doorData) {
    lastActiveElement = document.activeElement;
    const embedUrl = buildVimeoEmbedUrl(doorData.videoUrl);

    modalDayPillEl.textContent = `Låge ${doorData.day}`;
    modalTitleEl.textContent = doorData.title || `${doorData.day}. december`;
    modalFooterDescEl.textContent = doorData.description || "God fornøjelse med dagens lektion!";

    // Indsæt Vimeo iframe
    videoWrapperEl.innerHTML = `
      <iframe
        src="${embedUrl}"
        width="100%"
        height="100%"
        frameborder="0"
        allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media"
        allowfullscreen
        title="${doorData.title || `Låge ${doorData.day}`}"
      ></iframe>
    `;

    modalEl.classList.add("is-open");
    modalEl.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden"; // Forhindr baggrunds-scroll

    // Sæt fokus på luk-knappen
    modalCloseBtn.focus();

    // Registrér at lågen er set
    markDoorAsWatched(doorData.day);

    // Opdater kortets udseende
    const cardEl = document.querySelector(`.door-card[data-day="${doorData.day}"]`);
    if (cardEl && !cardEl.classList.contains("is-watched")) {
      cardEl.classList.add("is-watched");
      const badge = cardEl.querySelector(".door-badge");
      if (badge) badge.textContent = "Set ✓";
    }
  }

  // Luk Video Modal
  function closeVideoModal() {
    modalEl.classList.remove("is-open");
    modalEl.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";

    // Fjern iframe for omgående at stoppe afspilning og lyd
    videoWrapperEl.innerHTML = "";

    if (lastActiveElement && typeof lastActiveElement.focus === "function") {
      lastActiveElement.focus();
    }
  }

  // Generer Kalender Låger
  function renderCalendar() {
    if (!gridEl) return;
    gridEl.innerHTML = "";

    const watchedDoors = getWatchedDoors();

    // Rækkefølge (enten defineret i config eller 1-24)
    const order = (config.displayOrder && config.displayOrder.length === 24)
      ? config.displayOrder
      : Array.from({ length: 24 }, (_, i) => i + 1);

    order.forEach(day => {
      const doorData = (config.doors && config.doors.find(d => d.day === day)) || {
        day: day,
        title: `${day}. december`,
        videoUrl: "https://vimeo.com/714785167",
        description: "Dagens e-læringsvideo fra Edutasia."
      };

      const status = getDoorStatus(day);
      const isWatched = watchedDoors.includes(day);

      const card = document.createElement("article");
      card.className = "door-card";
      card.setAttribute("data-day", day);
      card.setAttribute("role", "button");
      card.setAttribute("tabindex", "0");

      if (status.isUnlocked) {
        card.classList.add("is-unlocked");
        if (status.isToday) {
          card.classList.add("is-today");
        }
        if (isWatched) {
          card.classList.add("is-watched");
        }
        card.setAttribute("aria-label", `Åbn låge ${day}`);
      } else {
        card.classList.add("is-locked");
        card.setAttribute("aria-label", `Låge ${day} er låst. Åbner d. ${day}. december.`);
      }

      // Vælg ikon og badge tekst
      let iconSvg = "";
      let badgeText = "";

      if (!status.isUnlocked) {
        // Hængelås ikon
        iconSvg = `
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
            <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
          </svg>
        `;
        badgeText = `Låst til ${day}. dec`;
      } else if (status.isToday) {
        // Stjerne / Play ikon for i dag
        iconSvg = `
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
            <polygon points="5 3 19 12 5 21 5 3"></polygon>
          </svg>
        `;
        badgeText = isWatched ? "Set ✓" : "I dag 🎁";
      } else {
        // Åben play ikon
        iconSvg = `
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
            <polygon points="5 3 19 12 5 21 5 3"></polygon>
          </svg>
        `;
        badgeText = isWatched ? "Set ✓" : "Åben";
      }

      card.innerHTML = `
        <div class="door-card-header">
          <div class="door-number">
            <span>${day}</span><span class="dec-dot">.</span>
          </div>
          <div class="door-state-icon" aria-hidden="true">
            ${iconSvg}
          </div>
        </div>
        <div class="door-card-footer">
          <span class="door-badge">${badgeText}</span>
          <span class="door-preview-title">${doorData.title ? doorData.title.replace(/^\d+\.\s*december\s*[–-]?\s*/i, "") : "Se video"}</span>
        </div>
      `;

      // Klik event
      const handleClick = () => {
        if (status.isUnlocked) {
          openVideoModal(doorData);
        } else {
          // Rystekort og giv feedback
          card.classList.remove("shake");
          // Reflow
          void card.offsetWidth;
          card.classList.add("shake");

          const msg = (currentMonth < 12 && currentYear === (config.year || 2026))
            ? `🎄 Låge ${day} kan først åbnes d. ${day}. december!`
            : `🎅 Hav tålmodighed! Låge ${day} åbner først d. ${day}. december.`;
          showToast(msg);
        }
      };

      card.addEventListener("click", handleClick);
      card.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleClick();
        }
      });

      gridEl.appendChild(card);
    });
  }

  // Opdater statusbjælke med aktuel dato
  function updateStatusBar() {
    if (!statusDateTextEl) return;

    if (isPreviewMode) {
      statusDateTextEl.textContent = "Test-tilstand: Alle låger er åbnet";
      if (testBadgeEl) {
        testBadgeEl.classList.add("is-active");
        testBadgeEl.textContent = "⚙️ Test-tilstand aktiv (?preview)";
      }
      return;
    }

    if (simulatedDay !== null) {
      statusDateTextEl.textContent = `Test: Simulerer ${simulatedDay}. december ${config.year || 2026}`;
      if (testBadgeEl) {
        testBadgeEl.classList.add("is-active");
        testBadgeEl.textContent = `⚙️ Simulerer ${simulatedDay}. dec`;
      }
      return;
    }

    const danishMonths = [
      "januar", "februar", "marts", "april", "maj", "juni",
      "juli", "august", "september", "oktober", "november", "december"
    ];
    const monthName = danishMonths[today.getMonth()];
    statusDateTextEl.textContent = `I dag: ${currentDay}. ${monthName} ${currentYear}`;
  }

  // Modal event listeners
  if (modalCloseBtn) {
    modalCloseBtn.addEventListener("click", closeVideoModal);
  }

  if (modalEl) {
    modalEl.addEventListener("click", (e) => {
      if (e.target === modalEl) {
        closeVideoModal();
      }
    });
  }

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modalEl && modalEl.classList.contains("is-open")) {
      closeVideoModal();
    }
  });

  // ==============================================================================
  // DISKRET, EFFEKTIVT SNEFALD (Canvas)
  // ==============================================================================
  function setupSnowfall() {
    const canvas = document.getElementById("snow-canvas");
    if (!canvas) return;

    // Tjek prefers-reduced-motion
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      canvas.style.display = "none";
      return;
    }

    const ctx = canvas.getContext("2d");
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Ca. 40 diskrete snefnug
    const flakeCount = Math.min(Math.floor(width / 30), 45);
    const flakes = [];

    for (let i = 0; i < flakeCount; i++) {
      flakes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        r: Math.random() * 2 + 1,
        d: Math.random() * 1 + 0.5,
        opacity: Math.random() * 0.45 + 0.15,
        vx: (Math.random() - 0.5) * 0.4
      });
    }

    function draw() {
      ctx.clearRect(0, 0, width, height);
      for (let i = 0; i < flakes.length; i++) {
        const f = flakes[i];
        ctx.fillStyle = `rgba(255, 255, 255, ${f.opacity})`;
        ctx.beginPath();
        ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.fill();

        f.y += f.d * 0.8;
        f.x += f.vx;

        if (f.y > height) {
          f.y = -5;
          f.x = Math.random() * width;
        }
        if (f.x > width) f.x = 0;
        if (f.x < 0) f.x = width;
      }
      requestAnimationFrame(draw);
    }

    window.addEventListener("resize", () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    });

    draw();
  }

  // Initialisering
  function init() {
    renderCalendar();
    updateStatusBar();
    updateWatchedCounter();
    setupSnowfall();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();

/**
 * Navigation und Dropdowns.
 * Desktop: Dropdown schließt mit kurzer Verzögerung.
 * Mobil: Navigation wird über den Menüknopf ein- und ausgeblendet.
 */
document.addEventListener("includes:loaded", () => {
  markCurrentPage();
  initialiseMobileMenu();
  initialiseDropdowns();
});

function markCurrentPage() {
  const currentPage = location.pathname.split("/").pop() || "index.html";

  document.querySelectorAll(".page-link[data-page]").forEach((link) => {
    const isCurrentPage = link.dataset.page === currentPage;
    link.classList.toggle("active", isCurrentPage);

    if (isCurrentPage) {
      link.setAttribute("aria-current", "page");
    }
  });
}

function initialiseMobileMenu() {
  const menuButton = document.querySelector(".menu-toggle");
  const navigation = document.querySelector(".main-nav");

  if (!menuButton || !navigation) return;

  menuButton.addEventListener("click", () => {
    const isOpen = navigation.classList.toggle("open");
    menuButton.setAttribute("aria-expanded", String(isOpen));
  });

  navigation.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navigation.classList.remove("open");
      menuButton.setAttribute("aria-expanded", "false");
    });
  });
}

function initialiseDropdowns() {
  const groups = Array.from(document.querySelectorAll(".nav-group"));
  const desktopPointer = window.matchMedia("(hover: hover) and (pointer: fine)");
  const CLOSE_DELAY_MS = 650;

  function closeAll(except = null) {
    groups.forEach((group) => {
      if (group !== except) group.removeAttribute("open");
    });
  }

  groups.forEach((group) => {
    let closeTimer = null;

    function cancelScheduledClose() {
      if (closeTimer === null) return;
      window.clearTimeout(closeTimer);
      closeTimer = null;
    }

    function scheduleClose() {
      cancelScheduledClose();
      closeTimer = window.setTimeout(() => {
        group.removeAttribute("open");
        closeTimer = null;
      }, CLOSE_DELAY_MS);
    }

    group.querySelector("summary")?.addEventListener("click", () => closeAll(group));
    group.addEventListener("mouseenter", cancelScheduledClose);
    group.addEventListener("mouseleave", () => {
      if (desktopPointer.matches) scheduleClose();
    });

    group.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        cancelScheduledClose();
        group.removeAttribute("open");
      });
    });
  });

  document.addEventListener("click", (event) => {
    if (!event.target.closest(".nav-group")) closeAll();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape") return;
    closeAll();
    document.querySelector(".menu-toggle")?.focus();
  });
}

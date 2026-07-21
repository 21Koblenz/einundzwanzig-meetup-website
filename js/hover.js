/**
 * Simuliert den Karten-Hover auf Geräten ohne echte Maus.
 * Der Glow wird aktiviert, sobald die Kartenmitte nahe der Bildschirmmitte liegt.
 */
document.addEventListener("DOMContentLoaded", () => {
  const touchLikeDevice = window.matchMedia("(hover: none), (pointer: coarse)").matches;
  if (!touchLikeDevice) return;

  const cards = [...document.querySelectorAll(
    ".feature-card, .info-card, .step-card, .screen-card, .metric, .callout, .social-link"
  )];

  if (!cards.length) return;

  let activeCard = null;
  let ticking = false;

  const updateFocusedCard = () => {
    const viewportCenter = window.innerHeight / 2;
    let closestCard = null;
    let closestDistance = Number.POSITIVE_INFINITY;

    cards.forEach((card) => {
      const rect = card.getBoundingClientRect();
      const visible = rect.bottom > 0 && rect.top < window.innerHeight;
      if (!visible) return;

      const cardCenter = rect.top + rect.height / 2;
      const distance = Math.abs(cardCenter - viewportCenter);

      if (distance < closestDistance) {
        closestDistance = distance;
        closestCard = card;
      }
    });

    const focusRange = Math.max(150, window.innerHeight * 0.34);
    const nextCard = closestDistance <= focusRange ? closestCard : null;

    if (activeCard !== nextCard) {
      activeCard?.classList.remove("in-view");
      nextCard?.classList.add("in-view");
      activeCard = nextCard;
    }

    ticking = false;
  };

  const requestUpdate = () => {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(updateFocusedCard);
  };

  window.addEventListener("scroll", requestUpdate, { passive: true });
  window.addEventListener("resize", requestUpdate);
  window.addEventListener("orientationchange", requestUpdate);
  requestUpdate();
});

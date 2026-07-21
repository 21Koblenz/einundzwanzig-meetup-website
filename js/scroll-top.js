/**
 * Fügt einen dauerhaft erreichbaren „Seitenanfang“-Button ein.
 * Der Button erscheint erst, wenn die Seite ein Stück nach unten gescrollt wurde.
 */
document.addEventListener("DOMContentLoaded", () => {
  const button = document.createElement("button");
  button.className = "scroll-top";
  button.type = "button";
  button.setAttribute("aria-label", "Zum Seitenanfang");
  button.setAttribute("title", "Zum Seitenanfang");
  button.innerHTML = '<span aria-hidden="true">↑</span>';

  document.body.appendChild(button);

  const updateVisibility = () => {
    button.classList.toggle("is-visible", window.scrollY > 500);
  };

  button.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  window.addEventListener("scroll", updateVisibility, { passive: true });
  updateVisibility();
});

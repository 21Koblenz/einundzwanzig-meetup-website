/**
 * Dark-/Light-Mode.
 * Das Theme wird gespeichert und alle themeabhängigen Bilddateien
 * werden mit nur einem sichtbaren <img> ausgetauscht. Dadurch kann
 * der Lightning-QR-Code niemals doppelt übereinander erscheinen.
 */
document.addEventListener("DOMContentLoaded", () => {
  const root = document.documentElement;
  const storedTheme = localStorage.getItem("theme");
  const initialTheme = storedTheme === "light" ? "light" : "dark";

  applyTheme(initialTheme);

  document.addEventListener("click", (event) => {
    const toggle = event.target.closest(".theme-toggle");
    if (!toggle) return;

    const nextTheme = root.dataset.theme === "light" ? "dark" : "light";
    localStorage.setItem("theme", nextTheme);
    applyTheme(nextTheme);
  });

  function applyTheme(theme) {
    root.dataset.theme = theme;

    document.querySelectorAll(".theme-icon").forEach((icon) => {
      icon.textContent = theme === "light" ? "☀" : "☾";
    });

    document.querySelectorAll(".theme-qr-asset").forEach((image) => {
      const source = theme === "light"
        ? image.dataset.lightSrc
        : image.dataset.darkSrc;

      if (source && image.getAttribute("src") !== source) {
        image.setAttribute("src", source);
      }
    });
  }

  /* Nach dynamisch geladenen Komponenten erneut anwenden. */
  document.addEventListener("components:loaded", () => {
    applyTheme(root.dataset.theme || initialTheme);
  });
});

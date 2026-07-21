/**
 * Lädt wiederverwendbare HTML-Komponenten wie Navigation und Footer.
 * Die Website muss über einen Webserver geöffnet werden, nicht per file://.
 */
document.addEventListener("DOMContentLoaded", async () => {
  const placeholders = Array.from(document.querySelectorAll("[data-include]"));

  await Promise.all(placeholders.map(async (placeholder) => {
    try {
      const response = await fetch(placeholder.dataset.include);

      if (!response.ok) {
        throw new Error(`${response.status} ${placeholder.dataset.include}`);
      }

      placeholder.innerHTML = await response.text();
    } catch (error) {
      console.error("HTML-Komponente konnte nicht geladen werden:", error);
    }
  }));

  document.dispatchEvent(new Event("includes:loaded"));
  document.dispatchEvent(new CustomEvent("components:loaded"));
});

/**
 * Füllt den Aktualisierungsstand im Footer aus der zentralen config.js.
 */
document.addEventListener("includes:loaded", () => {
  const config = window.SITE_CONFIG;
  if (!config) return;

  const height = Number(config.updatedBlockHeight);
  const heightElement = document.getElementById("footerBlockHeight");
  const linkElement = document.getElementById("footerBlockLink");

  if (!Number.isFinite(height)) return;

  if (heightElement) {
    heightElement.textContent = new Intl.NumberFormat("de-DE").format(height);
  }

  if (linkElement) {
    linkElement.href = `${config.mempoolBaseUrl}${height}`;
    linkElement.setAttribute("aria-label", `Bitcoin Block ${height} auf mempool.space öffnen`);
  }
});

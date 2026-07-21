/**
 * Kopiert Texte aus einem Element mit data-copy-target in die Zwischenablage.
 */
document.addEventListener("click", async (event) => {
  const button = event.target.closest("[data-copy-target]");
  if (!button) return;

  const targetId = button.dataset.copyTarget;
  const target = document.getElementById(targetId);
  const text = target?.textContent.trim();

  if (!text) return;

  try {
    await navigator.clipboard.writeText(text);
  } catch {
    copyWithFallback(text);
  }

  showCopyConfirmation(button);
});

function copyWithFallback(text) {
  const textarea = document.createElement("textarea");
  textarea.value = text;
  document.body.append(textarea);
  textarea.select();
  document.execCommand("copy");
  textarea.remove();
}

function showCopyConfirmation(button) {
  const originalLabel = button.textContent;
  button.textContent = "Kopiert ✓";

  window.setTimeout(() => {
    button.textContent = originalLabel;
  }, 1800);
}

function copyNpub() {

    const npub = document.getElementById("nostrKey").innerText.trim();

    if (navigator.clipboard) {

        navigator.clipboard.writeText(npub)
        .then(() => showCopied())
        .catch(() => fallbackCopy(npub));

    } else {

        fallbackCopy(npub);

    }

}


function fallbackCopy(text) {

    const textarea = document.createElement("textarea");

    textarea.value = text;

    document.body.appendChild(textarea);

    textarea.select();

    document.execCommand("copy");

    textarea.remove();

    showCopied();

}


function showCopied() {

    const button = document.querySelector(".copy-button");

    button.innerHTML = "✅ Kopiert";

    setTimeout(() => {
        button.innerHTML = "📋 Kopieren";
    }, 2000);

}

// script.js
document.addEventListener('DOMContentLoaded', () => {

    const elements = document.querySelectorAll('.card, .box, .btn, .button');

    if (elements.length === 0) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {

            const el = entry.target;
            const ratio = entry.intersectionRatio;

            // Hysterese:
            // Start bei 60%
            if (ratio >= 0.52) {
                el.classList.add('in-view');
            }

            // Entfernen erst bei 30%
            else if (ratio <= 0.48) {
                el.classList.remove('in-view');
            }

        });

    }, {
        threshold: [0.3, 0.6],
        rootMargin: '-10px 0px -10px 0px'
    });

    elements.forEach(el => observer.observe(el));
});

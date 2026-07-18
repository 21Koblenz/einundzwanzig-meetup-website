document.addEventListener("DOMContentLoaded", async () => {

    const includes = document.querySelectorAll("[data-include]");


    for (const element of includes) {

        try {

            const response = await fetch(element.dataset.include);

            if (!response.ok) {
                throw new Error(element.dataset.include);
            }

            element.innerHTML = await response.text();

        } catch (error) {

            console.error(
                "Fehler beim Laden:",
                error
            );

        }

    }

});

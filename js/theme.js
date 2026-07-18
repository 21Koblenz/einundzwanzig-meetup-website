document.addEventListener("DOMContentLoaded", () => {

    const icons = document.querySelectorAll(".theme-icon");

    // gespeichertes Theme laden
    if (localStorage.getItem("theme") === "light") {
        document.body.classList.add("light-mode");

        icons.forEach(icon => {
            icon.textContent = "☀️";
        });

    } else {

        icons.forEach(icon => {
            icon.textContent = "🌙";
        });

    }


    // Theme Button
    document.addEventListener("click", (e) => {

        if (e.target.closest(".theme-toggle")) {

            document.body.classList.toggle("light-mode");

            const isLight = document.body.classList.contains("light-mode");

            if (isLight) {

                localStorage.setItem("theme", "light");

                document.querySelectorAll(".theme-icon").forEach(icon => {
                    icon.textContent = "☀️";
                });

            } else {

                localStorage.setItem("theme", "dark");

                document.querySelectorAll(".theme-icon").forEach(icon => {
                    icon.textContent = "🌙";
                });

            }

        }

    });

});

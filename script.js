/* =========================================================
   AR BIOMASS — WEBSITE INTERACTIONS
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    /* -----------------------------------------
       Smooth navigation
       ----------------------------------------- */

    const navigationLinks = document.querySelectorAll(
        'a[href^="#"]'
    );

    navigationLinks.forEach(function (link) {

        link.addEventListener("click", function (event) {

            const targetId = this.getAttribute("href");

            if (
                !targetId ||
                targetId === "#" ||
                targetId.length < 2
            ) {
                return;
            }

            const target = document.querySelector(targetId);

            if (target) {

                event.preventDefault();

                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            }

        });

    });


    /* -----------------------------------------
       Header shadow while scrolling
       ----------------------------------------- */

    const header = document.querySelector(".site-header");

    function updateHeader() {

        if (!header) {
            return;
        }

        if (window.scrollY > 20) {
            header.style.boxShadow =
                "0 5px 25px rgba(18, 61, 40, 0.08)";
        } else {
            header.style.boxShadow = "none";
        }

    }

    window.addEventListener("scroll", updateHeader);

    updateHeader();


    /* -----------------------------------------
       Reveal elements when they enter screen
       ----------------------------------------- */

    const revealElements = document.querySelectorAll(
        ".product-card, .application-card, .gallery-placeholder, .why-grid > div, .stat"
    );

    if ("IntersectionObserver" in window) {

        const observer = new IntersectionObserver(
            function (entries) {

                entries.forEach(function (entry) {

                    if (entry.isIntersecting) {

                        entry.target.classList.add("visible");

                        observer.unobserve(entry.target);

                    }

                });

            },
            {
                threshold: 0.12
            }
        );

        revealElements.forEach(function (element) {

            element.classList.add("reveal");

            observer.observe(element);

        });

    }


    /* -----------------------------------------
       Current year in footer
       ----------------------------------------- */

    const yearElements = document.querySelectorAll(
        ".current-year"
    );

    yearElements.forEach(function (element) {

        element.textContent = new Date().getFullYear();

    });


    /* -----------------------------------------
       WhatsApp enquiry buttons
       ----------------------------------------- */

    const whatsappNumber = "919837591626";

    const enquiryLinks = document.querySelectorAll(
        ".product-link"
    );

    enquiryLinks.forEach(function (link) {

        link.addEventListener("click", function (event) {

            const productCard =
                this.closest(".product-card");

            if (!productCard) {
                return;
            }

            const productName =
                productCard.querySelector("h3");

            if (!productName) {
                return;
            }

            const message =
                "Hello AR Biomass, I am interested in " +
                productName.textContent.trim() +
                ". Please share the details.";

            const whatsappURL =
                "https://wa.me/" +
                whatsappNumber +
                "?text=" +
                encodeURIComponent(message);

            event.preventDefault();

            window.open(
                whatsappURL,
                "_blank"
            );

        });

    });


    /* -----------------------------------------
       Gallery placeholder interaction
       ----------------------------------------- */

    const galleryItems = document.querySelectorAll(
        ".gallery-placeholder"
    );

    galleryItems.forEach(function (item) {

        item.addEventListener("click", function () {

            this.classList.toggle("gallery-selected");

        });

    });

});


/* =========================================================
   Add small animation styles dynamically
   ========================================================= */

const animationStyles = document.createElement("style");

animationStyles.textContent = `
    .reveal {
        opacity: 0;
        transform: translateY(25px);
        transition:
            opacity 0.6s ease,
            transform 0.6s ease;
    }

    .reveal.visible {
        opacity: 1;
        transform: translateY(0);
    }

    .gallery-placeholder {
        cursor: pointer;
    }

    .gallery-placeholder.gallery-selected {
        transform: scale(1.03);
    }
`;

document.head.appendChild(animationStyles);

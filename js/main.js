document.addEventListener("DOMContentLoaded", () => {

    console.log("Artist Portfolio loaded successfully.");

    initializeGlobalFeatures();

});


function initializeGlobalFeatures() {

    setCurrentYear();

    markActiveNavigation();

}


function setCurrentYear() {

    const yearElements =
        document.querySelectorAll("[data-current-year]");


    yearElements.forEach(element => {

        element.textContent =
            new Date().getFullYear();

    });

}


function markActiveNavigation() {

    const currentPage =
        window.location.pathname
            .split("/")
            .pop() || "index.html";


    const navigationLinks =
        document.querySelectorAll(
            "nav a"
        );


    navigationLinks.forEach(link => {

        const href =
            link.getAttribute("href");


        if (!href) {
            return;
        }


        const linkPage =
            href.split("/").pop();


        if (linkPage === currentPage) {

            link.classList.add("active");

        }

    });

}
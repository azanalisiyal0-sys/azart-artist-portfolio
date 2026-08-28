// =====================================================
// USER INTERFACE
// =====================================================


// =====================================================
// MODAL STATE
// =====================================================

let currentArtworkIndex = -1;

let artworkModal = null;

let lastFocusedElement = null;


// =====================================================
// DOM READY
// =====================================================

document.addEventListener(
    "DOMContentLoaded",
    () => {

        initializeMobileNavigation();

        initializeArtworkModal();

    }
);


// =====================================================
// MOBILE NAVIGATION
// =====================================================

function initializeMobileNavigation() {

    const menuButton =
        document.querySelector(
            ".mobile-toggle"
        );


    const mobileMenu =
        document.querySelector(
            ".mobile-menu"
        );


    if (
        !menuButton ||
        !mobileMenu
    ) {

        return;

    }


    menuButton.addEventListener(
        "click",
        () => {

            const isOpen =
                mobileMenu.classList.toggle(
                    "active"
                );


            menuButton.classList.toggle(
                "active",
                isOpen
            );


            menuButton.setAttribute(
                "aria-expanded",
                String(isOpen)
            );

        }
    );


    // Close menu when link clicked

    const links =
        mobileMenu.querySelectorAll(
            "a"
        );


    links.forEach(
        link => {

            link.addEventListener(
                "click",
                () => {

                    mobileMenu.classList.remove(
                        "active"
                    );


                    menuButton.classList.remove(
                        "active"
                    );


                    menuButton.setAttribute(
                        "aria-expanded",
                        "false"
                    );

                }
            );

        }
    );

}


// =====================================================
// ARTWORK MODAL
// =====================================================

function initializeArtworkModal() {

    artworkModal =
        document.querySelector(
            "#artwork-modal"
        );


    if (!artworkModal) {

        console.error(
            "Artwork modal #artwork-modal was not found."
        );

        return;

    }


    // Start in a closed state

    artworkModal.classList.remove(
        "active"
    );


    artworkModal.setAttribute(
        "aria-hidden",
        "true"
    );


    // Prevent hidden modal from receiving focus

    artworkModal.setAttribute(
        "inert",
        ""
    );


    // =================================================
    // CLOSE BUTTONS
    // =================================================

    const closeButtons =
        artworkModal.querySelectorAll(
            "[data-close-modal]"
        );


    closeButtons.forEach(
        button => {

            button.type = "button";


            button.addEventListener(
                "click",
                event => {

                    event.preventDefault();

                    event.stopPropagation();

                    closeArtworkModal();

                }
            );

        }
    );


    // =================================================
    // PREVIOUS BUTTON
    // =================================================

    const previousButton =
        artworkModal.querySelector(
            "[data-modal-previous]"
        );


    if (previousButton) {

        previousButton.type = "button";


        previousButton.addEventListener(
            "click",
            event => {

                event.preventDefault();

                showPreviousArtwork();

            }
        );

    }


    // =================================================
    // NEXT BUTTON
    // =================================================

    const nextButton =
        artworkModal.querySelector(
            "[data-modal-next]"
        );


    if (nextButton) {

        nextButton.type = "button";


        nextButton.addEventListener(
            "click",
            event => {

                event.preventDefault();

                showNextArtwork();

            }
        );

    }


    // =================================================
    // BACKGROUND CLICK
    // =================================================

    artworkModal.addEventListener(
        "click",
        event => {

            if (
                event.target === artworkModal
            ) {

                closeArtworkModal();

            }

        }
    );


    // =================================================
    // OPEN EVENT
    // =================================================

    document.addEventListener(
        "openArtworkModal",
        event => {

            showArtwork(
                event.detail
            );

        }
    );


    // =================================================
    // KEYBOARD
    // =================================================

    document.addEventListener(
        "keydown",
        handleModalKeyboard
    );

}


// =====================================================
// SHOW ARTWORK
// =====================================================

function showArtwork(
    artwork
) {

    const modal =
        artworkModal ||
        document.querySelector(
            "#artwork-modal"
        );


    if (!modal) {

        return;

    }


    // Remember what was focused before opening

    lastFocusedElement =
        document.activeElement;


    // =================================================
    // GET MODAL ELEMENTS
    // =================================================

    const image =
        modal.querySelector(
            "[data-modal-image]"
        );


    const title =
        modal.querySelector(
            "[data-modal-title]"
        );


    const category =
        modal.querySelector(
            "[data-modal-category]"
        );


    const year =
        modal.querySelector(
            "[data-modal-year]"
        );


    const description =
        modal.querySelector(
            "[data-modal-description]"
        );


    const software =
        modal.querySelector(
            "[data-modal-software]"
        );


    // =================================================
    // IMAGE
    // =================================================

    if (image) {

        image.src =
            artwork.imageURL;

        image.alt =
            artwork.title || "";

    }


    // =================================================
    // TITLE
    // =================================================

    if (title) {

        title.textContent =
            artwork.title || "";

    }


    // =================================================
    // CATEGORY
    // =================================================

    if (category) {

        category.textContent =
            formatCategoryName(
                artwork.category
            );

    }


    // =================================================
    // YEAR
    // =================================================

    if (year) {

        year.textContent =
            artwork.year || "";

    }


    // =================================================
    // DESCRIPTION
    // =================================================

    if (description) {

        description.textContent =
            artwork.description || "";

    }


    // =================================================
    // SOFTWARE
    // =================================================

    if (software) {

        software.textContent =
            artwork.software || "";

    }


    // =================================================
    // CURRENT ARTWORK INDEX
    // =================================================

    currentArtworkIndex =
        artworks.findIndex(
            item =>
                item.id === artwork.id
        );


    // =================================================
    // OPEN MODAL
    // =================================================

    modal.classList.add(
        "active"
    );


    modal.setAttribute(
        "aria-hidden",
        "false"
    );


    // Remove inert BEFORE focusing anything

    modal.removeAttribute(
        "inert"
    );


    document.body.classList.add(
        "modal-open"
    );


    // =================================================
    // FOCUS CLOSE BUTTON
    // =================================================

    const closeButton =
        modal.querySelector(
            "[data-close-modal]"
        );


    if (closeButton) {

        requestAnimationFrame(
            () => {

                closeButton.focus();

            }
        );

    }

}


// =====================================================
// CLOSE MODAL
// =====================================================

function closeArtworkModal() {

    const modal =
        artworkModal ||
        document.querySelector(
            "#artwork-modal"
        );


    if (!modal) {

        return;

    }


    // =================================================
    // REMOVE FOCUS FROM MODAL FIRST
    // =================================================

    const activeElement =
        document.activeElement;


    if (
        activeElement &&
        modal.contains(activeElement)
    ) {

        activeElement.blur();

    }


    // =================================================
    // CLOSE
    // =================================================

    modal.classList.remove(
        "active"
    );


    modal.setAttribute(
        "aria-hidden",
        "true"
    );


    // Hidden modal must not be focusable

    modal.setAttribute(
        "inert",
        ""
    );


    document.body.classList.remove(
        "modal-open"
    );


    // =================================================
    // RESTORE FOCUS
    // =================================================

    if (
        lastFocusedElement &&
        document.contains(
            lastFocusedElement
        )
    ) {

        requestAnimationFrame(
            () => {

                lastFocusedElement.focus();

            }
        );

    }


    lastFocusedElement = null;

}


// =====================================================
// KEYBOARD
// =====================================================

function handleModalKeyboard(
    event
) {

    const modal =
        artworkModal ||
        document.querySelector(
            "#artwork-modal"
        );


    if (
        !modal ||
        !modal.classList.contains(
            "active"
        )
    ) {

        return;

    }


    // Escape

    if (
        event.key === "Escape"
    ) {

        event.preventDefault();

        closeArtworkModal();

        return;

    }


    // Right arrow

    if (
        event.key === "ArrowRight"
    ) {

        event.preventDefault();

        showNextArtwork();

        return;

    }


    // Left arrow

    if (
        event.key === "ArrowLeft"
    ) {

        event.preventDefault();

        showPreviousArtwork();

    }

}


// =====================================================
// NEXT ARTWORK
// =====================================================

function showNextArtwork() {

    if (
        artworks.length === 0
    ) {

        return;

    }


    currentArtworkIndex++;


    if (
        currentArtworkIndex >=
        artworks.length
    ) {

        currentArtworkIndex = 0;

    }


    showArtwork(
        artworks[
            currentArtworkIndex
        ]
    );

}


// =====================================================
// PREVIOUS ARTWORK
// =====================================================

function showPreviousArtwork() {

    if (
        artworks.length === 0
    ) {

        return;

    }


    currentArtworkIndex--;


    if (
        currentArtworkIndex < 0
    ) {

        currentArtworkIndex =
            artworks.length - 1;

    }


    showArtwork(
        artworks[
            currentArtworkIndex
        ]
    );

}


// =====================================================
// FORMAT CATEGORY
// =====================================================

function formatCategoryName(
    category
) {

    if (!category) {

        return "";

    }


    return category
        .replaceAll("-", " ")
        .replace(
            /\b\w/g,
            letter =>
                letter.toUpperCase()
        );

}
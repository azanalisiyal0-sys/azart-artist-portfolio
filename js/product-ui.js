// =====================================================
// USER INTERFACE (PRODUCTS PAGE)
// =====================================================


// =====================================================
// MODAL STATE
// =====================================================

let productModal = null;

let lastFocusedProductTrigger = null;


// =====================================================
// SLIDER STATE
// =====================================================

let currentSlideIndex = 0;

let totalSlides = 0;


// =====================================================
// DOM READY
// =====================================================

document.addEventListener(
    "DOMContentLoaded",
    () => {

        initializeMobileNavigation();

        initializeProductModal();

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
// PRODUCT MODAL
// =====================================================

function initializeProductModal() {

    productModal =
        document.querySelector(
            "#product-modal"
        );


    if (!productModal) {

        console.error(
            "Product modal #product-modal was not found."
        );

        return;

    }


    // Start in a closed state

    productModal.classList.remove(
        "active"
    );


    productModal.setAttribute(
        "aria-hidden",
        "true"
    );


    // Prevent hidden modal from receiving focus

    productModal.setAttribute(
        "inert",
        ""
    );


    // =================================================
    // CLOSE BUTTONS
    // =================================================

    const closeButtons =
        productModal.querySelectorAll(
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

                    closeProductModal();

                }
            );

        }
    );


    // =================================================
    // IMAGE SLIDER
    // =================================================

    initializeProductSlider(
        productModal
    );


    // =================================================
    // BACKGROUND CLICK
    // =================================================

    productModal.addEventListener(
        "click",
        event => {

            if (
                event.target === productModal
            ) {

                closeProductModal();

            }

        }
    );


    // =================================================
    // OPEN EVENT
    // =================================================

    document.addEventListener(
        "openProductModal",
        event => {

            showProduct(
                event.detail
            );

        }
    );


    // =================================================
    // KEYBOARD
    // =================================================

    document.addEventListener(
        "keydown",
        handleProductModalKeyboard
    );

}


// =====================================================
// SLIDER: SET UP BUTTONS + SWIPE (runs once)
// =====================================================

function initializeProductSlider(
    modal
) {

    const previousButton =
        modal.querySelector(
            "[data-slide-previous]"
        );


    const nextButton =
        modal.querySelector(
            "[data-slide-next]"
        );


    const viewport =
        modal.querySelector(
            "[data-slider-viewport]"
        );


    if (previousButton) {

        previousButton.type = "button";


        previousButton.addEventListener(
            "click",
            event => {

                event.preventDefault();

                showPreviousSlide();

            }
        );

    }


    if (nextButton) {

        nextButton.type = "button";


        nextButton.addEventListener(
            "click",
            event => {

                event.preventDefault();

                showNextSlide();

            }
        );

    }


    // Touch swipe (mobile)

    if (viewport) {

        let touchStartX = 0;


        viewport.addEventListener(
            "touchstart",
            event => {

                touchStartX =
                    event.changedTouches[0].clientX;

            },
            { passive: true }
        );


        viewport.addEventListener(
            "touchend",
            event => {

                const distance =
                    event.changedTouches[0].clientX -
                    touchStartX;


                if (Math.abs(distance) < 50) {

                    return;

                }


                if (distance < 0) {

                    showNextSlide();

                } else {

                    showPreviousSlide();

                }

            },
            { passive: true }
        );

    }

}


// =====================================================
// SLIDER: COLLECT IMAGES FOR A PRODUCT
// Main image first, then every extra image.
// Duplicates and empty values are removed.
// =====================================================

function getProductImages(
    product
) {

    const list = [

        product.productURL,

        ...(
            Array.isArray(product.images)
                ? product.images
                : []
        )

    ].filter(Boolean);


    return [...new Set(list)];

}


// =====================================================
// SLIDER: BUILD SLIDES FOR THE OPENED PRODUCT
// =====================================================

function buildProductSlider(
    modal,
    product
) {

    const track =
        modal.querySelector(
            "[data-slider-track]"
        );


    const dotsContainer =
        modal.querySelector(
            "[data-slider-dots]"
        );


    const previousButton =
        modal.querySelector(
            "[data-slide-previous]"
        );


    const nextButton =
        modal.querySelector(
            "[data-slide-next]"
        );


    if (!track) {

        console.error(
            "Slider track [data-slider-track] was not found."
        );

        return;

    }


    const images =
        getProductImages(
            product
        );


    track.innerHTML = "";


    if (dotsContainer) {

        dotsContainer.innerHTML = "";

    }


    images.forEach(
        (source, index) => {

            const slide =
                document.createElement(
                    "div"
                );


            slide.className =
                "product-slide";


            const image =
                document.createElement(
                    "img"
                );


            image.src =
                source;

            image.alt =
                `${product.name || "Product"} - image ${index + 1} of ${images.length}`;

            image.draggable =
                false;


            slide.appendChild(
                image
            );

            track.appendChild(
                slide
            );


            if (dotsContainer) {

                const dot =
                    document.createElement(
                        "button"
                    );


                dot.type =
                    "button";

                dot.className =
                    "slider-dot";

                dot.setAttribute(
                    "aria-label",
                    `Show image ${index + 1}`
                );


                dot.addEventListener(
                    "click",
                    () => {

                        goToSlide(index);

                    }
                );


                dotsContainer.appendChild(
                    dot
                );

            }

        }
    );


    totalSlides =
        images.length;


    // Hide controls when there is only one image

    const hasMultiple =
        totalSlides > 1;


    [
        previousButton,
        nextButton,
        dotsContainer
    ].forEach(
        element => {

            if (element) {

                element.hidden =
                    !hasMultiple;

            }

        }
    );


    // Always open on the first image, without animating

    track.style.transition =
        "none";


    goToSlide(0);


    void track.offsetWidth;


    track.style.transition =
        "";

}


// =====================================================
// SLIDER: GO TO A SLIDE
// =====================================================

function goToSlide(
    index
) {

    const modal =
        productModal ||
        document.querySelector(
            "#product-modal"
        );


    if (
        !modal ||
        totalSlides === 0
    ) {

        return;

    }


    const track =
        modal.querySelector(
            "[data-slider-track]"
        );


    if (!track) {

        return;

    }


    // Wrap around

    if (index >= totalSlides) {

        index = 0;

    }


    if (index < 0) {

        index = totalSlides - 1;

    }


    currentSlideIndex =
        index;


    track.style.transform =
        `translateX(-${index * 100}%)`;


    // Only the current slide is exposed to screen readers

    modal.querySelectorAll(
        ".product-slide"
    ).forEach(
        (slide, slideIndex) => {

            slide.setAttribute(
                "aria-hidden",
                String(slideIndex !== index)
            );

        }
    );


    // Highlight the current dot

    modal.querySelectorAll(
        ".slider-dot"
    ).forEach(
        (dot, dotIndex) => {

            dot.classList.toggle(
                "active",
                dotIndex === index
            );

        }
    );

}


// =====================================================
// SLIDER: NEXT / PREVIOUS
// =====================================================

function showNextSlide() {

    goToSlide(
        currentSlideIndex + 1
    );

}


function showPreviousSlide() {

    goToSlide(
        currentSlideIndex - 1
    );

}


// =====================================================
// SHOW PRODUCT
// =====================================================

function showProduct(
    product
) {

    const modal =
        productModal ||
        document.querySelector(
            "#product-modal"
        );


    if (!modal) {

        return;

    }


    // Remember what was focused before opening

    lastFocusedProductTrigger =
        document.activeElement;


    // =================================================
    // GET MODAL ELEMENTS
    // =================================================

    const productName =
        modal.querySelector(
            "[data-modal-name]"
        );


    const category =
        modal.querySelector(
            "[data-modal-category]"
        );


    const price =
        modal.querySelector(
            "[data-modal-price]"
        );


    const status =
        modal.querySelector(
            "[data-modal-status]"
        );


    const orderButton =
        modal.querySelector(
            "[data-modal-order]"
        );


    // =================================================
    // IMAGE SLIDER
    // =================================================

    buildProductSlider(
        modal,
        product
    );


    // =================================================
    // NAME
    // =================================================

    if (productName) {

        productName.textContent =
            product.name || "";

    }


    // =================================================
    // CATEGORY
    // =================================================

    if (category) {

        category.textContent =
            product.category || "";

    }


    // =================================================
    // PRICE
    // =================================================

    if (price) {

        price.textContent =
            product.price !== undefined
                ? Number(product.price).toLocaleString()
                : "";

    }


    // =================================================
    // STATUS
    // =================================================

    if (status) {

        status.textContent =
            product.status || "";

    }


    // =================================================
    // ORDER BUTTON
    // =================================================

    if (orderButton) {

        if (product.orderBtnLink) {

            orderButton.href =
                product.orderBtnLink;

            orderButton.hidden =
                false;

        } else {

            orderButton.removeAttribute(
                "href"
            );

            orderButton.hidden =
                true;

        }

    }


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

function closeProductModal() {

    const modal =
        productModal ||
        document.querySelector(
            "#product-modal"
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
        lastFocusedProductTrigger &&
        document.contains(
            lastFocusedProductTrigger
        )
    ) {

        requestAnimationFrame(
            () => {

                lastFocusedProductTrigger.focus();

            }
        );

    }


    lastFocusedProductTrigger = null;

}


// =====================================================
// KEYBOARD
// Escape closes, arrow keys move the image slider
// =====================================================

function handleProductModalKeyboard(
    event
) {

    const modal =
        productModal ||
        document.querySelector(
            "#product-modal"
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

        closeProductModal();

        return;

    }


    // Right arrow

    if (
        event.key === "ArrowRight"
    ) {

        event.preventDefault();

        showNextSlide();

        return;

    }


    // Left arrow

    if (
        event.key === "ArrowLeft"
    ) {

        event.preventDefault();

        showPreviousSlide();

    }

}
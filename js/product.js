// =====================================================
// PRODUCTS
// Display, Search and Filtering
// =====================================================

let currentCategory = "all";
let currentSearch = "";


// =====================================================
// WAIT FOR PRODUCT DATA
// =====================================================

document.addEventListener(
    "productsLoaded",
    event => {

        const loadedProducts =
            event.detail;

        initializeProducts(
            loadedProducts
        );

    }
);


// =====================================================
// INITIALIZE PRODUCTS
// =====================================================

function initializeProducts(
    productList
) {

    const productGrid =
        document.querySelector(
            "#product-grid"
        );


    if (!productGrid) {

        return;

    }


    displayProducts(
        productList
    );


    initializeCategoryFilters();

    initializeSearch();

}


// =====================================================
// DISPLAY PRODUCTS
// =====================================================

function displayProducts(list) {

    const grid =
        document.querySelector(
            "#product-grid"
        );


    if (!grid) {

        return;

    }


    grid.innerHTML = "";


    if (list.length === 0) {

        grid.innerHTML = `
            <div class="no-results">

                <h2>No products found</h2>

                <p>
                    Try another category
                    or search term.
                </p>

            </div>
        `;

        return;

    }


    list.forEach(
        product => {

            const card =
                createProductCard(
                    product
                );

            grid.appendChild(card);

        }
    );

}


// =====================================================
// CREATE PRODUCT CARD
// =====================================================

function createProductCard(
    product
) {

    const card =
        document.createElement(
            "article"
        );


    card.className =
        "product-card";


    card.dataset.id =
        product.id;


    card.innerHTML = `
        <button
            class="product-card-button"
            data-product-id="${product.id}"
            type="button"
        >

            <img
                src="${product.productURL || (product.images && product.images[0]) || ""}"
                alt="${product.name}"
                loading="lazy"
            >

            <div class="product-card-info">

                <h2>
                    ${product.name}
                </h2>

            </div>

        </button>
    `;


    const button =
        card.querySelector(
            ".product-card-button"
        );


    button.addEventListener(
        "click",
        () => {

            openProduct(
                product.id
            );

        }
    );


    return card;

}


// =====================================================
// CATEGORY FILTERS
// =====================================================

function initializeCategoryFilters() {

    const filterButtons =
        document.querySelectorAll(
            "[data-category]"
        );


    filterButtons.forEach(
        button => {

            button.addEventListener(
                "click",
                () => {

                    currentCategory =
                        button.dataset.category;


                    updateActiveFilter(
                        button
                    );


                    applyFilters();

                }
            );

        }
    );

}


// =====================================================
// ACTIVE FILTER BUTTON
// =====================================================

function updateActiveFilter(
    activeButton
) {

    const buttons =
        document.querySelectorAll(
            "[data-category]"
        );


    buttons.forEach(
        button => {

            button.classList.remove(
                "active"
            );

        }
    );


    activeButton.classList.add(
        "active"
    );

}


// =====================================================
// SEARCH
// =====================================================

function initializeSearch() {

    const searchInput =
        document.querySelector(
            "#search-input"
        );


    if (!searchInput) {

        return;

    }


    searchInput.addEventListener(
        "input",
        event => {

            currentSearch =
                event.target.value
                    .trim()
                    .toLowerCase();


            applyFilters();

        }
    );

}


// =====================================================
// APPLY FILTERS
// =====================================================

function applyFilters() {

    let filteredProducts =
        [...products];


    // Category

    if (
        currentCategory !== "all"
    ) {

        filteredProducts =
            filteredProducts.filter(
                product =>
                    product.category ===
                    currentCategory
            );

    }


    // Search

    if (
        currentSearch !== ""
    ) {

        filteredProducts =
            filteredProducts.filter(
                product => {

                    const searchableText = [

                        product.name,

                        product.category,

                        product.status

                    ]
                        .filter(Boolean)
                        .join(" ")
                        .toLowerCase();


                    return searchableText.includes(
                        currentSearch
                    );

                }
            );

    }


    displayProducts(
        filteredProducts
    );

}


// =====================================================
// FORMAT CATEGORY
// =====================================================

function formatCategory(
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


// =====================================================
// OPEN PRODUCT
// =====================================================

function openProduct(id) {

    const product =
        getProductById(id);


    if (!product) {

        console.error(
            "Product not found:",
            id
        );

        return;

    }


    document.dispatchEvent(
        new CustomEvent(
            "openProductModal",
            {
                detail: product
            }
        )
    );

}
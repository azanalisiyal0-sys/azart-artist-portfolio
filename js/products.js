// =====================================================
// PRODUCT DATA
// Loads and manages product data
// =====================================================

let products = [];


// =====================================================
// LOAD PRODUCT DATA
// =====================================================

async function loadProducts() {

    try {

        const response = await fetch(
            "data/products.json"
        );


        if (!response.ok) {

            throw new Error(
                `Failed to load products: ${response.status}`
            );

        }


        const data = await response.json();

        // Works with [ {...}, {...} ] and also a single { ... } object

        products = Array.isArray(data) ? data : [data];


        console.log(
            `Successfully loaded ${products.length} products.`
        );


        // Inform product.js that data is ready

        document.dispatchEvent(
            new CustomEvent(
                "productsLoaded",
                {
                    detail: products
                }
            )
        );


    } catch (error) {

        console.error(
            "Could not load product data:",
            error
        );

    }

}


// =====================================================
// FIND PRODUCT BY ID
// =====================================================

function getProductById(id) {

    return products.find(
        product =>
            String(product.id) === String(id)
    );

}


// =====================================================
// GET IN-STOCK PRODUCTS
// =====================================================

function getInStockProducts() {

    return products.filter(
        product =>
            product.status === "In Stock"
    );

}


// =====================================================
// GET PRODUCTS BY CATEGORY
// =====================================================

function getProductsByCategory(category) {

    if (category === "all") {

        return products;

    }


    return products.filter(
        product =>
            product.category === category
    );

}


// =====================================================
// START LOADING
// =====================================================

loadProducts();
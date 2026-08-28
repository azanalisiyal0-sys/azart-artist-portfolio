// =====================================================
// ARTWORK DATA
// Loads and manages artwork data
// =====================================================

let artworks = [];


// =====================================================
// LOAD ARTWORK DATA
// =====================================================

async function loadArtworks() {

    try {

        const response = await fetch(
            "data/artworks.json"
        );


        if (!response.ok) {

            throw new Error(
                `Failed to load artworks: ${response.status}`
            );

        }


        artworks = await response.json();


        console.log(
            `Successfully loaded ${artworks.length} artworks.`
        );


        // Inform portfolio.js that data is ready

        document.dispatchEvent(
            new CustomEvent(
                "artworksLoaded",
                {
                    detail: artworks
                }
            )
        );


    } catch (error) {

        console.error(
            "Could not load artwork data:",
            error
        );

    }

}


// =====================================================
// FIND ARTWORK BY ID
// =====================================================

function getArtworkById(id) {

    return artworks.find(
        artwork =>
            artwork.id === Number(id)
    );

}


// =====================================================
// GET FEATURED ARTWORKS
// =====================================================

function getFeaturedArtworks() {

    return artworks.filter(
        artwork =>
            artwork.featured === true
    );

}


// =====================================================
// GET ARTWORKS BY CATEGORY
// =====================================================

function getArtworkByCategory(category) {

    if (category === "all") {

        return artworks;

    }


    return artworks.filter(
        artwork =>
            artwork.category === category
    );

}


// =====================================================
// START LOADING
// =====================================================

loadArtworks();
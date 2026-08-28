// =====================================================
// PORTFOLIO
// Display, Search and Filtering
// =====================================================

let currentCategory = "all";
let currentSearch = "";


// =====================================================
// WAIT FOR ARTWORK DATA
// =====================================================

document.addEventListener(
    "artworksLoaded",
    event => {

        const loadedArtworks =
            event.detail;

        initializePortfolio(
            loadedArtworks
        );

    }
);


// =====================================================
// INITIALIZE PORTFOLIO
// =====================================================

function initializePortfolio(
    artworkList
) {

    const artworkGrid =
        document.querySelector(
            "#artwork-grid"
        );


    if (!artworkGrid) {

        return;

    }


    displayArtworks(
        artworkList
    );


    initializeCategoryFilters();

    initializeSearch();

}


// =====================================================
// DISPLAY ARTWORKS
// =====================================================

function displayArtworks(list) {

    const grid =
        document.querySelector(
            "#artwork-grid"
        );


    if (!grid) {

        return;

    }


    grid.innerHTML = "";


    if (list.length === 0) {

        grid.innerHTML = `
            <div class="no-results">

                <h2>No artwork found</h2>

                <p>
                    Try another category
                    or search term.
                </p>

            </div>
        `;

        return;

    }


    list.forEach(
        artwork => {

            const card =
                createArtworkCard(
                    artwork
                );

            grid.appendChild(card);

        }
    );

}


// =====================================================
// CREATE ARTWORK CARD
// =====================================================

function createArtworkCard(
    artwork
) {

    const card =
        document.createElement(
            "article"
        );


    card.className =
        "artwork-card";


    card.dataset.id =
        artwork.id;


    card.innerHTML = `
        <button
            class="artwork-card-button"
            data-artwork-id="${artwork.id}"
            type="button"
        >

            <img
                src="${artwork.imageURL}"
                alt="${artwork.title}"
                loading="lazy"
            >

            <div class="artwork-card-info">

                <h2>
                    ${artwork.title}
                </h2>

            </div>

        </button>
    `;


    const button =
        card.querySelector(
            ".artwork-card-button"
        );


    button.addEventListener(
        "click",
        () => {

            openArtwork(
                artwork.id
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

    let filteredArtwork =
        [...artworks];


    // Category

    if (
        currentCategory !== "all"
    ) {

        filteredArtwork =
            filteredArtwork.filter(
                artwork =>
                    artwork.category ===
                    currentCategory
            );

    }


    // Search

    if (
        currentSearch !== ""
    ) {

        filteredArtwork =
            filteredArtwork.filter(
                artwork => {

                    const searchableText = [

                        artwork.title,

                        artwork.category,

                        artwork.description,

                        artwork.software

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


    displayArtworks(
        filteredArtwork
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
// OPEN ARTWORK
// =====================================================

function openArtwork(id) {

    const artwork =
        getArtworkById(id);


    if (!artwork) {

        console.error(
            "Artwork not found:",
            id
        );

        return;

    }


    document.dispatchEvent(
        new CustomEvent(
            "openArtworkModal",
            {
                detail: artwork
            }
        )
    );

}
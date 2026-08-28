# AZART Portfolio — Project Notes

## Project

**Name:** AZART
**Type:** Artist Portfolio Website
**Platform:** GitHub Pages
**Technology:** HTML, CSS, JavaScript
**Status:** Production / Portfolio Website

---

## Purpose

AZART is a personal artist portfolio website created to showcase digital artwork and provide a simple way for visitors or potential clients to explore artwork and request custom projects.

The primary goal is to keep the website visually focused on the artwork while maintaining a clean, responsive, and accessible interface.

---

## Main Pages

### `index.html`

The homepage introduces the artist and the purpose of the website.

Main content includes:

* Hero introduction
* Featured artwork
* Artwork categories
* Services preview
* Calls to action
* Social links

---

### `portfolio.html`

The main artwork gallery.

Features include:

* Artwork cards
* Artwork categories
* Search
* Filtering
* Artwork modal
* Artwork descriptions
* Category information
* Previous/next artwork navigation

The artwork grid changes depending on viewport size.

Desktop layouts display multiple columns, while smaller screens progressively reduce the number of columns. The current responsive implementation uses four columns on large screens, three on desktop, two on tablet/mobile, and one column on very small screens.

---

### `about.html`

Contains information about the artist and creative direction.

Potential sections include:

* About the artist
* More about the artist
* Creative approach
* Skills
* Tools
* Development goals

---

### `services.html`

Describes available creative services.

Current service concepts include:

* Character Art
* Portraits
* Commercial Artwork
* Custom Digital Artwork

---

### `contact.html`

Provides visitors with a way to discuss artwork commissions and projects.

The page contains:

* Contact information
* Contact form
* Commission information
* Project requirements
* Social/contact links

The contact form uses Formspree for submission handling.

---

# Artwork System

Artwork data is maintained separately from the HTML so that new artwork can be added without manually creating every portfolio card.

Relevant JavaScript files:

```text
js/artworks.js
js/portfolio.js
```

### Artwork flow

```text
Artwork data
     ↓
JavaScript
     ↓
Filter / Search
     ↓
Artwork cards
     ↓
User selects artwork
     ↓
Artwork modal
     ↓
Artwork information
```

---

# Portfolio Categories

Current artwork categories include:

* Character Art
* Portraits
* Digital Art
* Commercial Artwork

Categories should remain consistent between:

* Artwork data
* Filter buttons
* Artwork cards
* Modal information
* SEO content

---

# Design System

## Colors

```css
--bg-primary: #0a0a0a;
--bg-secondary: #121212;
--bg-card: #181818;
--text-primary: #f2f2f0;
--text-secondary: #9a9a9a;
--border-color: #292929;
--border-accent: #c62828;
--border-accent-hover: #e53935;
--shadow-card: rgba(0, 0, 0, 0.45);
```

## Fonts

```text
Headings: Sora
Body: Inter
```

---

# Responsive Design

The website is designed for:

* Large desktop
* Desktop
* Tablet
* Mobile
* Small mobile devices

Special attention should be given to:

* Navigation
* Artwork grid
* Artwork modal
* Footer
* Contact form
* Search/filter controls

The portfolio modal prevents background page scrolling while open.

---

# JavaScript Responsibilities

## `main.js`

Responsible for global website behavior such as:

* Mobile navigation
* General UI behavior
* Shared interactions

## `artworks.js`

Responsible for:

* Artwork data
* Artwork information
* Artwork categories

## `portfolio.js`

Responsible for:

* Rendering artwork
* Search
* Filtering
* Artwork selection
* Portfolio interactions

## `ui.js`

Responsible for:

* Shared UI functionality
* Modal behavior
* User interface interactions

---

# Assets

Images are stored inside:

```text
assets/images/
```

The logo is:

```text
assets/images/logo.png
```

Icons and favicon assets are stored separately.

---

# Favicon

Favicon assets are stored inside:

```text
assets/favicon/
```

Current favicon-related files include:

```text
favicon.ico
favicon-16x16.png
favicon-32x32.png
apple-touch-icon.png
android-chrome-192x192.png
android-chrome-512x512.png
site.webmanifest
```

---

# SEO

SEO files are kept in the root of the repository:

```text
robots.txt
sitemap.xml
```

The sitemap should contain every publicly accessible HTML page.

The robots file should point search engines toward the sitemap.

Each HTML page should also have:

* Unique `<title>`
* Unique meta description
* Canonical URL
* Open Graph metadata
* Descriptive image `alt` text
* Semantic HTML
* Correct heading hierarchy

---

# Deployment

The website is intended for GitHub Pages.

Before deployment:

1. Test every page.
2. Test all navigation links.
3. Test the mobile menu.
4. Test artwork search.
5. Test artwork filtering.
6. Test the artwork modal.
7. Test modal navigation.
8. Test the contact form.
9. Check all images.
10. Check favicon.
11. Check `robots.txt`.
12. Check `sitemap.xml`.
13. Check the 404 page.
14. Test the site on mobile.
15. Run browser console checks.
16. Verify Google Search Console after deployment.

---

# Maintenance

When adding new artwork:

1. Add the image to the appropriate assets folder.
2. Add the artwork information to the artwork data.
3. Assign the correct category.
4. Add descriptive text.
5. Use meaningful image alt text.
6. Test the artwork modal.
7. Test search/filter behavior.

When adding a new HTML page:

1. Add the page to the navigation if required.
2. Add it to `sitemap.xml`.
3. Add appropriate SEO metadata.
4. Add a canonical URL.
5. Test desktop and mobile layouts.
6. Verify internal links.

---

# Important Notes

Avoid unnecessary third-party libraries unless they provide a clear benefit.

Keep the website lightweight and maintainable.

Artwork quality and presentation should remain the primary visual focus.

Do not expose private configuration, API keys, passwords, or other sensitive information in the repository.

---

## Current Project Goal

The final website should present AZART as a professional digital artist portfolio while remaining simple, fast, responsive, and easy to maintain.

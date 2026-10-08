# StayEase — Agoda-inspired hotel results UI

A frontend-only hotel search/listing page inspired by common travel-booking patterns. It uses original StayEase branding and sample data; it is not Agoda's source code or an exact copy.

## Requirements
- Node.js 18+ (for the Vite development toolchain)
- npm

## Run locally
```bash
npm install
npm run dev
```
Open the local URL printed by Vite.

## Production build
```bash
npm run build
npm run preview
```

## Included
- Responsive search bar with destination, dates, guest and room selectors
- Listing cards with image, rating, price, amenity tags and sample deals
- Dynamic filters for property name, maximum price, guest rating, star rating, free cancellation, breakfast and pool
- Sorting by recommendation, price and ratings
- Favorites toggle for the current session
- Hotel details modal and demo booking CTA
- Responsive mobile filter drawer
- Sample listings and sample prices in INR

## Important limitations
- All hotels, prices, reviews, and availability are sample/demo data.
- No backend, database, live inventory, real authentication, SMS OTP, or real payments.
- The demo booking CTA does not create a reservation.
- Hotel images load from Unsplash URLs and Google Fonts loads from Google Fonts, so those assets require internet access.

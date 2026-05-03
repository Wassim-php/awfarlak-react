# Awfarlak Frontend

Awfarlak is the React frontend for the Lebanese price comparison platform. It lets authenticated users search for products, compare total prices across supported local stores, view trending searches, manage their delivery location, and review previous searches.

This frontend is built with React, Vite, Tailwind CSS, React Router, Axios, and Lucide icons.

## Features

- Email/password login and registration
- Google Sign-In support
- Protected app routes for authenticated users
- Product comparison through the backend comparison API
- Delivery-location-aware comparisons for inside/outside Beirut
- Trending searches loaded from the backend
- Search history page
- Account page with location and password settings
- Responsive sidebar navigation

## Requirements

- Node.js 20 or newer recommended
- npm
- Awfarlak backend running locally or deployed

For local development, the backend normally runs at:

```bash
http://localhost:8000
```

The frontend dev server runs at:

```bash
http://localhost:5173
```

## Environment Variables

Create a local `.env.local` file from `.env.example`:

```bash
cp .env.example .env.local
```

Then fill in:

```env
VITE_GOOGLE_CLIENT_ID=your-google-client-id.apps.googleusercontent.com
VITE_API_BASE_URL=/api
```

`VITE_API_BASE_URL=/api` is recommended during local development because Vite proxies `/api` requests to the backend.

For production, set `VITE_API_BASE_URL` to the deployed backend API base URL if the frontend and backend are not served from the same domain.

Do not commit `.env.local`; it is ignored by git.

## Installation

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

Run linting:

```bash
npm run lint
```

## Backend Integration

API calls are handled through `src/services/apiClient.js`.

The main frontend services are:

- `src/services/authService.js` for login, registration, Google login, logout, account location, and password changes
- `src/services/productService.js` for product comparisons and trending searches
- `src/services/historyService.js` for search history

The frontend expects the backend API under `/api`, including:

```text
POST /api/auth/login
POST /api/auth/register
POST /api/auth/google
POST /api/auth/logout
PATCH /api/auth/location
POST /api/auth/password
POST /api/comparisons/compare
GET  /api/comparisons/trending
```

Authenticated requests automatically include the JWT access token from local storage.

## Routing

Public routes:

```text
/login
/register
```

Protected routes:

```text
/home
/search-history
/account
/about-help
```

Unknown routes redirect to `/login`.

## Project Structure

```text
src/
  components/   Reusable UI components and page bodies
  pages/        Route-level page wrappers
  services/     Axios API client and backend service modules
  App.jsx       Router and protected route setup
  main.jsx      React app entry point
```

## Deployment Notes

Before deploying:

- Set `VITE_API_BASE_URL` for the deployed backend.
- Set `VITE_GOOGLE_CLIENT_ID` for Google Sign-In.
- Make sure the backend `FRONTEND_URLS`, CORS, CSRF trusted origins, and Google OAuth client ID match the deployed frontend domain.
- Run `npm run build` and deploy the generated `dist/` folder.

## Security Notes

This repository should not contain private API keys. Frontend `VITE_*` values are bundled into browser code, so only public browser-safe values should be placed there.

Authentication tokens are stored in local storage by the frontend. Keep the app free of unsafe HTML injection and avoid adding third-party scripts unless they are trusted.

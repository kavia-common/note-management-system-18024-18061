# Notes Frontend (Astro)

PUBLIC_INTERFACE
A modern, responsive notes application frontend built with Astro. Features:
- User login/authentication
- Create, edit, delete notes
- Tagging and categorization
- Search notes
- Responsive layout with top navigation, sidebar, and main panel
- Light theme using palette: primary #3498db, secondary #2ecc71, accent #f1c40f

## Getting started

1. Copy `.env.example` to `.env` and set:
   - PUBLIC_API_BASE_URL: Base URL of the notes_database REST API

2. Install and run:
```
npm install
npm run dev
```

3. Open the app at http://localhost:3000

## API Contract

The frontend expects the backend to provide:
- POST /auth/login { username, password } -> { token, user: { id, username, name? } }
- GET /notes?search=&tag=&category= -> Note[]
- GET /notes/:id -> Note
- POST /notes -> Note
- PUT /notes/:id -> Note
- DELETE /notes/:id -> { success: true }

Where `Note` is:
```
{
  id: string;
  title: string;
  content: string;
  tags: string[];
  category?: string;
  createdAt: string; // ISO
  updatedAt: string; // ISO
}
```

## Structure

- src/pages
  - login.astro
  - index.astro
  - notes/new.astro
  - notes/[id].astro
- src/components
  - NavBar.astro
  - Sidebar.astro
  - NotesList.astro
  - NoteEditor.astro
- src/services
  - api.ts
  - auth.ts
  - notes.ts
- src/styles/global.css

## Notes

- Environment variables must not be hard-coded. Use `.env`.
- Auth token is stored in localStorage as `auth_token`. Do not store sensitive user data.
- Client-side fetching is used to include the Authorization header with user token.

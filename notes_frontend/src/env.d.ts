/// <reference types="astro/client" />

/**
 * PUBLIC_INTERFACE
 * This file defines the ambient types for environment variables used in the Astro app.
 * Values are provided via .env (do not commit .env). Provide an .env.example to guide configuration.
 */
interface ImportMetaEnv {
  readonly PUBLIC_API_BASE_URL: string; // Base URL for the notes_database REST API
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

/**
 * PUBLIC_INTERFACE
 * Lightweight API client for communicating with the notes_database REST API.
 * Handles base URL, JSON encoding, error handling, and auth token injection.
 */
export type ApiMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export interface ApiOptions {
  method?: ApiMethod;
  path: string;
  params?: Record<string, string | number | boolean | undefined>;
  body?: unknown;
  auth?: boolean; // whether to include Authorization header
  headers?: Record<string, string>;
}

export interface ApiError extends Error {
  status?: number;
  details?: unknown;
}

const BASE_URL = import.meta.env.PUBLIC_API_BASE_URL;

function buildQuery(params?: ApiOptions['params']): string {
  if (!params) return '';
  const q = new URLSearchParams();
  Object.entries(params).forEach(([k, v]) => {
    if (v !== undefined && v !== null) q.set(k, String(v));
  });
  const s = q.toString();
  return s ? `?${s}` : '';
}

function getToken(): string | null {
  try {
    return localStorage.getItem('auth_token');
  } catch {
    return null;
  }
}

export async function apiRequest<T>(opts: ApiOptions): Promise<T> {
  const url = `${BASE_URL}${opts.path}${buildQuery(opts.params)}`;
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(opts.headers || {}),
  };

  if (opts.auth) {
    const token = getToken();
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
  }

  const res = await fetch(url, {
    method: opts.method ?? 'GET',
    headers,
    body: opts.body ? JSON.stringify(opts.body) : undefined,
  });

  const contentType = res.headers.get('content-type') || '';
  const isJson = contentType.includes('application/json');
  const payload = isJson ? await res.json().catch(() => ({})) : await res.text();

  if (!res.ok) {
    const err: ApiError = new Error(
      (payload && (payload.message || payload.error)) || `Request failed: ${res.status}`
    );
    err.status = res.status;
    err.details = payload;
    throw err;
  }

  return payload as T;
}

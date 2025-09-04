/**
 * PUBLIC_INTERFACE
 * Authentication service to manage user login/logout and token storage.
 */
import { apiRequest } from './api';

export interface LoginRequest {
  username: string;
  password: string;
}
export interface LoginResponse {
  token: string;
  user: {
    id: string;
    username: string;
    name?: string;
  };
}

export interface User {
  id: string;
  username: string;
  name?: string;
}

const TOKEN_KEY = 'auth_token';
const USER_KEY = 'auth_user';

export async function login(data: LoginRequest): Promise<User> {
  const resp = await apiRequest<LoginResponse>({
    method: 'POST',
    path: '/auth/login',
    body: data,
  });
  localStorage.setItem(TOKEN_KEY, resp.token);
  localStorage.setItem(USER_KEY, JSON.stringify(resp.user));
  return resp.user;
}

export function logout(): void {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
}

export function getCurrentUser(): User | null {
  try {
    const s = localStorage.getItem(USER_KEY);
    return s ? (JSON.parse(s) as User) : null;
  } catch {
    return null;
  }
}

export function getToken(): string | null {
  try {
    return localStorage.getItem(TOKEN_KEY);
  } catch {
    return null;
  }
}

export function isAuthenticated(): boolean {
  return !!getToken();
}

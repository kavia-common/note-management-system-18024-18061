/**
 * PUBLIC_INTERFACE
 * Notes service with CRUD operations, tag/category helpers, and search.
 */
import { apiRequest } from './api';

export interface Note {
  id: string;
  title: string;
  content: string;
  tags: string[];
  category?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateNote {
  title: string;
  content: string;
  tags?: string[];
  category?: string;
}
export interface UpdateNote {
  title?: string;
  content?: string;
  tags?: string[];
  category?: string;
}

export async function fetchNotes(params?: {
  search?: string;
  tag?: string;
  category?: string;
}): Promise<Note[]> {
  return apiRequest<Note[]>({
    method: 'GET',
    path: '/notes',
    params,
    auth: true,
  });
}

export async function getNote(id: string): Promise<Note> {
  return apiRequest<Note>({
    method: 'GET',
    path: `/notes/${encodeURIComponent(id)}`,
    auth: true,
  });
}

export async function createNote(data: CreateNote): Promise<Note> {
  return apiRequest<Note>({
    method: 'POST',
    path: '/notes',
    body: data,
    auth: true,
  });
}

export async function updateNote(id: string, data: UpdateNote): Promise<Note> {
  return apiRequest<Note>({
    method: 'PUT',
    path: `/notes/${encodeURIComponent(id)}`,
    body: data,
    auth: true,
  });
}

export async function deleteNote(id: string): Promise<{ success: boolean }> {
  return apiRequest<{ success: boolean }>({
    method: 'DELETE',
    path: `/notes/${encodeURIComponent(id)}`,
    auth: true,
  });
}

export function extractTagsAndCategories(notes: Note[]): {
  tags: Record<string, number>;
  categories: Record<string, number>;
} {
  const tags: Record<string, number> = {};
  const categories: Record<string, number> = {};
  for (const n of notes) {
    for (const t of n.tags || []) {
      tags[t] = (tags[t] || 0) + 1;
    }
    if (n.category) {
      categories[n.category] = (categories[n.category] || 0) + 1;
    }
  }
  return { tags, categories };
}

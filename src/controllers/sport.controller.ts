/**
 * SportHub MVC Architecture - Controller Layer
 * Plain `fetch()` calls the app consumes from `useState` / `useEffect`.
 *
 * These are same-origin relative paths (`/api/v1/...`), not the real backend
 * host. `next.config.ts` has a `rewrites()` rule that forwards `/api/v1/*` to
 * the backend server-side, which is required because the backend answers every
 * browser request with `403 Invalid CORS request`.
 */

import {
  Sport,
  SportCategory,
  SportEvent,
  SportComment,
  SportFavorite,
  CreateSportDto,
  CreateEventDto,
  CreateCommentDto,
  CreateCategoryDto,
  CreateFavoriteDto,
} from "@/models/sport.model";

export const API_BASE_URL = "/api/v1";

// ==================== SPORTS CONTROLLER ====================

export async function getSports(): Promise<Sport[]> {
  const res = await fetch(`${API_BASE_URL}/sports`, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch sports from backend API");
  return res.json();
}

export async function getSportByUuid(uuid: string): Promise<Sport> {
  const res = await fetch(`${API_BASE_URL}/sports/${uuid}`, { cache: "no-store" });
  if (!res.ok) throw new Error(`Failed to fetch sport: ${uuid}`);
  return res.json();
}

export async function createSport(data: CreateSportDto): Promise<Sport> {
  const res = await fetch(`${API_BASE_URL}/sports`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to create sport item");
  return res.json();
}

export async function updateSport(
  uuid: string,
  data: Partial<CreateSportDto>
): Promise<Sport> {
  const res = await fetch(`${API_BASE_URL}/sports/${uuid}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error(`Failed to update sport: ${uuid}`);
  return res.json();
}

export async function deleteSport(uuid: string): Promise<boolean> {
  const res = await fetch(`${API_BASE_URL}/sports/${uuid}`, {
    method: "DELETE",
  });
  return res.ok;
}

// ==================== CATEGORIES CONTROLLER ====================

export async function getSportCategories(): Promise<SportCategory[]> {
  const res = await fetch(`${API_BASE_URL}/sport_categories`, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch sport categories");
  return res.json();
}

export async function getCategoryByUuid(uuid: string): Promise<SportCategory> {
  const res = await fetch(`${API_BASE_URL}/sport_categories/${uuid}`, {
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`Failed to fetch category: ${uuid}`);
  return res.json();
}

export async function createSportCategory(
  data: CreateCategoryDto
): Promise<SportCategory> {
  const res = await fetch(`${API_BASE_URL}/sport_categories`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to create sport category");
  return res.json();
}

// ==================== EVENTS & VENUES CONTROLLER ====================

export async function getEvents(): Promise<SportEvent[]> {
  const res = await fetch(`${API_BASE_URL}/events`, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch events from backend");
  return res.json();
}

export async function getEventByUuid(uuid: string): Promise<SportEvent> {
  const res = await fetch(`${API_BASE_URL}/events/${uuid}`, { cache: "no-store" });
  if (!res.ok) throw new Error(`Failed to fetch event: ${uuid}`);
  return res.json();
}

export async function createEvent(data: CreateEventDto): Promise<SportEvent> {
  const res = await fetch(`${API_BASE_URL}/events`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to create sport event");
  return res.json();
}

export async function updateEvent(
  uuid: string,
  data: Partial<CreateEventDto>
): Promise<SportEvent> {
  const res = await fetch(`${API_BASE_URL}/events/${uuid}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error(`Failed to update event: ${uuid}`);
  return res.json();
}

export async function deleteEvent(uuid: string): Promise<boolean> {
  const res = await fetch(`${API_BASE_URL}/events/${uuid}`, {
    method: "DELETE",
  });
  return res.ok;
}

// ==================== COMMENTS CONTROLLER ====================

export async function getComments(): Promise<SportComment[]> {
  const res = await fetch(`${API_BASE_URL}/comments`, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch comments");
  return res.json();
}

export async function getCommentsByEvent(eventUuid: string): Promise<SportComment[]> {
  const res = await fetch(`${API_BASE_URL}/comments/events/${eventUuid}`, {
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`Failed to fetch comments for event: ${eventUuid}`);
  return res.json();
}

export async function createComment(data: CreateCommentDto): Promise<SportComment> {
  const res = await fetch(`${API_BASE_URL}/comments`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to post comment");
  return res.json();
}

export async function deleteComment(uuid: string): Promise<boolean> {
  const res = await fetch(`${API_BASE_URL}/comments/${uuid}`, {
    method: "DELETE",
  });
  return res.ok;
}

// ==================== FAVORITES CONTROLLER ====================

export async function getFavorites(): Promise<SportFavorite[]> {
  const res = await fetch(`${API_BASE_URL}/favorites`, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch favorites");
  return res.json();
}

export async function addFavorite(data: CreateFavoriteDto): Promise<SportFavorite> {
  const res = await fetch(`${API_BASE_URL}/favorites`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to add favorite");
  return res.json();
}

export async function deleteFavorite(uuidOrId: string): Promise<boolean> {
  const res = await fetch(`${API_BASE_URL}/favorites/${uuidOrId}`, {
    method: "DELETE",
  });
  return res.ok;
}

// ==================== FILE UPLOAD CONTROLLER ====================

export async function uploadImage(file: File): Promise<string[]> {
  const formData = new FormData();
  formData.append("file", file);

  const res = await fetch(`${API_BASE_URL}/upload`, {
    method: "POST",
    body: formData,
  });

  if (!res.ok) throw new Error("Failed to upload image file");
  const data = await res.json();
  return Array.isArray(data) ? data : [data.url || data.uri || data];
}

// ==================== AUTHENTICATION CONTROLLER ====================

export interface AuthResult {
  ok: boolean;
  status: number;
  data?: {
    username?: string;
    email?: string;
    role?: string;
    accessToken?: string;
    token?: string;
    avatarUrl?: string;
  };
}

export async function login(
  username: string,
  password: string
): Promise<AuthResult> {
  const res = await fetch(`${API_BASE_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });

  const data = await res.json().catch(() => undefined);
  return { ok: res.ok, status: res.status, data };
}

export async function register(
  username: string,
  email: string,
  password: string
): Promise<AuthResult> {
  const res = await fetch(`${API_BASE_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      username,
      email,
      rawPassword: password,
      confirmedPassword: password,
    }),
  });

  const data = await res.json().catch(() => undefined);
  return { ok: res.ok, status: res.status, data };
}

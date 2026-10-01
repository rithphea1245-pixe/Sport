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
} from "@/types/sport";

const getBaseUrl = () => {
  if (typeof window !== "undefined") {
    // In browser: use Next.js local proxy to bypass backend CORS 403 block
    return "/api/proxy";
  }
  return process.env.NEXT_PUBLIC_API_URL || "https://sport-api.eunglyzhia.com/api/v1";
};

// ==================== SPORTS ====================
export async function getSports(): Promise<Sport[]> {
  const res = await fetch(`${getBaseUrl()}/sports`, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch sports");
  return res.json();
}

export async function getSportByUuid(uuid: string): Promise<Sport> {
  const res = await fetch(`${getBaseUrl()}/sports/${uuid}`, { cache: "no-store" });
  if (!res.ok) throw new Error(`Failed to fetch sport: ${uuid}`);
  return res.json();
}

export async function createSport(data: CreateSportDto): Promise<Sport> {
  const res = await fetch(`${getBaseUrl()}/sports`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to create sport");
  return res.json();
}

export async function updateSport(
  uuid: string,
  data: Partial<CreateSportDto>
): Promise<Sport> {
  const res = await fetch(`${getBaseUrl()}/sports/${uuid}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error(`Failed to update sport: ${uuid}`);
  return res.json();
}

export async function deleteSport(uuid: string): Promise<boolean> {
  const res = await fetch(`${getBaseUrl()}/sports/${uuid}`, {
    method: "DELETE",
  });
  return res.ok;
}

// ==================== CATEGORIES ====================
export async function getSportCategories(): Promise<SportCategory[]> {
  const res = await fetch(`${getBaseUrl()}/sport_categories`, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch categories");
  return res.json();
}

export async function getCategoryByUuid(uuid: string): Promise<SportCategory> {
  const res = await fetch(`${getBaseUrl()}/sport_categories/${uuid}`, {
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`Failed to fetch category: ${uuid}`);
  return res.json();
}

export async function createSportCategory(
  data: CreateCategoryDto
): Promise<SportCategory> {
  const res = await fetch(`${getBaseUrl()}/sport_categories`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to create category");
  return res.json();
}

// ==================== EVENTS ====================
export async function getEvents(): Promise<SportEvent[]> {
  const res = await fetch(`${getBaseUrl()}/events`, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch events");
  return res.json();
}

export async function getEventByUuid(uuid: string): Promise<SportEvent> {
  const res = await fetch(`${getBaseUrl()}/events/${uuid}`, { cache: "no-store" });
  if (!res.ok) throw new Error(`Failed to fetch event: ${uuid}`);
  return res.json();
}

export async function createEvent(data: CreateEventDto): Promise<SportEvent> {
  const res = await fetch(`${getBaseUrl()}/events`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to create event");
  return res.json();
}

export async function updateEvent(
  uuid: string,
  data: Partial<CreateEventDto>
): Promise<SportEvent> {
  const res = await fetch(`${getBaseUrl()}/events/${uuid}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error(`Failed to update event: ${uuid}`);
  return res.json();
}

export async function deleteEvent(uuid: string): Promise<boolean> {
  const res = await fetch(`${getBaseUrl()}/events/${uuid}`, {
    method: "DELETE",
  });
  return res.ok;
}

// ==================== COMMENTS ====================
export async function getComments(): Promise<SportComment[]> {
  const res = await fetch(`${getBaseUrl()}/comments`, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch comments");
  return res.json();
}

export async function getCommentsByEvent(eventUuid: string): Promise<SportComment[]> {
  const res = await fetch(`${getBaseUrl()}/comments/events/${eventUuid}`, {
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`Failed to fetch comments for event: ${eventUuid}`);
  return res.json();
}

export async function createComment(data: CreateCommentDto): Promise<SportComment> {
  const res = await fetch(`${getBaseUrl()}/comments`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to post comment");
  return res.json();
}

export async function deleteComment(uuid: string): Promise<boolean> {
  const res = await fetch(`${getBaseUrl()}/comments/${uuid}`, {
    method: "DELETE",
  });
  return res.ok;
}

// ==================== FAVORITES ====================
export async function getFavorites(): Promise<SportFavorite[]> {
  const res = await fetch(`${getBaseUrl()}/favorites`, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch favorites");
  return res.json();
}

export async function addFavorite(data: CreateFavoriteDto): Promise<SportFavorite> {
  const res = await fetch(`${getBaseUrl()}/favorites`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to add favorite");
  return res.json();
}

export async function deleteFavorite(uuidOrId: string): Promise<boolean> {
  const res = await fetch(`${getBaseUrl()}/favorites/${uuidOrId}`, {
    method: "DELETE",
  });
  return res.ok;
}

// ==================== FILE UPLOAD ====================
export async function uploadImage(file: File): Promise<string[]> {
  const formData = new FormData();
  formData.append("file", file);

  const res = await fetch(`${getBaseUrl()}/upload`, {
    method: "POST",
    body: formData,
  });

  if (!res.ok) throw new Error("Failed to upload image");
  const data = await res.json();
  return Array.isArray(data) ? data : [data.url || data.uri || data];
}

/**
 * SportHub MVC Architecture - Data Models & DTOs
 * Defines core entity interfaces, mutation schemas, and user auth profiles.
 */

export interface SportCategory {
  id?: number;
  uuid?: string;
  name: string;
  description?: string;
  sports?: Sport[];
  createdAt?: string;
  updatedAt?: string;
}

export interface Sport {
  id: number;
  uuid: string;
  name: string;
  description: string;
  imageUrls: string[];
  category?: { name: string } | null;
  createdAt: string;
  updatedAt: string;
  disabled: boolean;
}

export interface SportEvent {
  id: number;
  uuid: string;
  name: string;
  description: string;
  imageUrls: string[];
  locationName: string;
  latitude: number;
  longitude: number;
  category?: { name: string } | null;
  createdAt: string;
  updatedAt: string;
}

export interface SportComment {
  id: number;
  uuid: string;
  eventUuid: string;
  comment: string;
  createdAt: string;
  authorName?: string;
  avatarUrl?: string;
}

export interface SportFavorite {
  id: string | number;
  uuid?: string | null;
  sportUuid?: string | null;
  eventUuid?: string | null;
  isDeleted: boolean;
  isFavorite: boolean;
}

export interface CreateSportDto {
  name: string;
  description: string;
  imageUrls: string[];
  categoryName: string;
}

export interface CreateEventDto {
  name: string;
  description: string;
  imageUrls: string[];
  locationName: string;
  latitude: number;
  longitude: number;
  categoryName: string;
}

export interface CreateCommentDto {
  eventUuid: string;
  comment: string;
}

export interface CreateCategoryDto {
  name: string;
  description: string;
}

export interface CreateFavoriteDto {
  sportUuid?: string;
  eventUuid?: string;
}

export type UserRole = "user" | "admin";

export interface UserProfile {
  username: string;
  email?: string;
  role: UserRole;
  avatarUrl?: string;
  token?: string;
}

export interface AuthResponse {
  success: boolean;
  error?: string;
  user?: UserProfile;
}

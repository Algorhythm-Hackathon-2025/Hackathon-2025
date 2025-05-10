// types/auth.ts

// Represents the authenticated user data received from the backend
export interface User {
  _id: string;
  username: string;
  number: Number;
  role: "user" | "admin" | "worker";
  createdAt: string; // ISO date string
  token?: string; // Token included in login/register response
}

// Represents the data sent to the backend for user login
export interface LoginCredentials {
  username: string;
  password: string;
}

// Represents the data received from the backend after a successful login
export interface LoginResponse {
  _id: string;
  username: string;
  number: Number;
  role: "user" | "admin" | "worker";
  token: string; // The JWT
}

// Represents the data sent to the backend for user registration
export interface RegisterCredentials {
  username: string;
  number: Number;
  password: string;
  confirmPassword?: string; // For frontend validation, not sent to backend
  role?: "user" | "admin" | "worker"; // Optional, defaults to "user" in backend
}

// Represents the data sent to the backend for updating a user's profile
export interface UpdateUserPayload {
  username?: string;
  number?: Number;
  password?: string; // For password updates
  role?: "user" | "admin" | "worker"; // Typically admin-only
}

// Represents the data received from the backend when fetching a user profile by ID
export interface UserProfile {
  _id: string;
  username: string;
  number: Number;
  role: "user" | "admin" | "worker";
  createdAt: string; // ISO date string
}

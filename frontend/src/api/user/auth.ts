import { apiPOST } from "..";

export type LoginRequest = {
  number: string;
  password: string;
};
export type RegisterRequest = {
  username: string;
  number: number;
  password: string;
};

export function login(body: LoginRequest) {
  return apiPOST("/api/auth/login", body);
}
export function register(body: RegisterRequest) {
  return apiPOST("/api/auth/register", body);
}

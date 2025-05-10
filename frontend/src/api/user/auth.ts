import { apiPOST } from "..";

export type LoginRequest = {
  number: string;
  password: string;
};
export type RegisterRequest = {
  username: string;
  number: string;
  password: string;
};

export async function login({ number, password }: LoginRequest) {
  await apiPOST("/api/auth/login", {
    number: number.replace(/\s/g, ""),
    password,
  });
}
export async function register({
  username,
  number,
  password,
}: RegisterRequest) {
  await apiPOST("/api/auth/signup", {
    username,
    number: number.replace(/\s/g, ""),
    password,
  });
  await login({ number, password });
}

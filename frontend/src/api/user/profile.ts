import { apiGET } from "..";
import type User from "../../types/user";

export function profile() {
  return apiGET<User>("/api/user/profile", { credentials: "include" });
}

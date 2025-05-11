import { apiGET } from "..";
import type User from "../../types/user";

export function profile() {
  return apiGET<User>("/api/user/profile", { credentials: "include" })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.error("Error fetching user profile:", error);
      throw error; 
    });
}

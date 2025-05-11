import { profile } from "../api/user/profile";
import { useRequest } from "ahooks";
import { createContext, type PropsWithChildren, useContext } from "react";
import type User from "../types/user";
import { data } from "react-router";

export type UserContext = {
  user?: User;
  refresh: () => void;
  loading: boolean;
};

const UserContext = createContext<UserContext>({} as any);

export function useUser() {
  return useContext(UserContext);

}

export function UserProvider({ children }: PropsWithChildren) {
  const {
    data: user,
    loading,
    refresh,
  } = useRequest(async () => await profile());
  console.log("User data:", user); // Log the user data for debugging
  return (
    <UserContext.Provider
      value={{ user: user as User | undefined, loading, refresh }}
    >
      {children}
    </UserContext.Provider>
  );
}

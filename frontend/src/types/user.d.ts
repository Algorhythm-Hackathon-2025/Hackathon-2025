import type Model from "./model";

type User = Model & {
  username: string;
  number: number;
  password: string;
  isAdmin: boolean;
};
export default User;

import type Model from "./model";

type User = {
  username: string;
  number: string;
  isAdmin: boolean;
  takenProblems: string[];
  balance: number;
};

export default User;

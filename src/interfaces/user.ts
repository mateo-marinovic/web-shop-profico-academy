import { Roles } from "@/enums/roles";

export interface User {
  id: number;
  username: string;
  firstName: string;
  lastName: string;
  password: string;
  role?: Roles;
}

export type UserSignIn = Omit<User, "id">;

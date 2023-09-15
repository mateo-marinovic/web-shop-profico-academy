export interface User {
  id: number;
  username: string;
  firstName: string;
  lastName: string;
  password: string;
}

export type UserSignIn = Omit<User, "id">;

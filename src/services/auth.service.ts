import usersHttpClient from "@/http-clients/users.http-client";
import { User, UserSignIn } from "@/interfaces/user";

export class AuthService {
  public async login(username: string, password: string): Promise<User | null> {
    const users = await usersHttpClient.getUsersByUsername(username);
    if (users.length === 0) {
      alert("User name or password are not correct!");
      return null;
    }

    const [user] = users;

    if (user.password !== password) {
      alert("User name or password are not correct!");
      return null;
    }

    return user;
  }

  public async signIn(userLogin: UserSignIn): Promise<User> {
    const users = await usersHttpClient.getUsersByUsername(userLogin.username);

    if (users.length > 0) {
      throw new Error("User already exist");
    }

    const user = await usersHttpClient.create(userLogin);
    return user;
  }
}

export default new AuthService();

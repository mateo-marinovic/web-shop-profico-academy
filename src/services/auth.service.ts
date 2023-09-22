import usersHttpClient from "@/http-clients/users.http-client";
import { UserSignIn } from "@/interfaces/user";

export class AuthService {
  public async login(username: string, password: string): Promise<boolean> {
    const users = await usersHttpClient.getUsersByUsername(username);
    if (users.length === 0) {
      alert("User name or password are not correct!");
      return false;
    }

    const [user] = users;

    if (user.password !== password) {
      alert("User name or password are not correct!");
      return false;
    }

    localStorage.setItem("jwt-token", `some-dummy-value-${user.id}`);
    return true;
  }

  public async signIn(userLogin: UserSignIn) {
    const users = await usersHttpClient.getUsersByUsername(userLogin.username);

    if (users.length > 0) {
      throw new Error("User already exist");
    }

    const user = await usersHttpClient.create(userLogin);

    localStorage.setItem("jwt-token", `some-dummy-value-${user.id}`);
  }
}

export default new AuthService();

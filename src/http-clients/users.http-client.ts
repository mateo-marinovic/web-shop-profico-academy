import { User, UserSignIn } from "@/types/user";
import { BaseHttpClient } from "./base";

class UsersHttpClient extends BaseHttpClient {
  private BASE_URL = "/users";
  public constructor() {
    super();
  }

  public getUsersByUsername(username: string): Promise<User[]> {
    return this.get<User[]>(`${this.BASE_URL}?username=${username}`);
  }

  public create(user: UserSignIn): Promise<User> {
    return this.post<UserSignIn, User>(`${this.BASE_URL}`, user);
  }
}

export default new UsersHttpClient();

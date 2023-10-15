import { User, UserSignIn } from "@/interfaces/user";
import { BaseHttpClient } from "./base";
import { Roles } from "@/enums/roles";

class UsersHttpClient extends BaseHttpClient {
  private BASE_URL = "/users";
  public constructor() {
    super();
  }

  public getUsersByUsername(username: string): Promise<User[]> {
    return this.get<User[]>(`${this.BASE_URL}?username=${username}`);
  }

  public async getUserById(id: number): Promise<User | null> {
    const result = await this.get<User[]>(`${this.BASE_URL}?id=${id}`);
    return result && result.length > 0 ? result[0] : null;
  }

  public create(user: UserSignIn): Promise<User> {
    return this.post<UserSignIn, User>(`${this.BASE_URL}`, {
      ...user,
      role: Roles.User,
    });
  }
}

export default new UsersHttpClient();

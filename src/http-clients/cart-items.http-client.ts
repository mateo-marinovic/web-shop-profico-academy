import { User, UserSignIn } from "@/interfaces/user";
import { BaseHttpClient } from "./base";
import { Roles } from "@/enums/roles";
import { CartItem, CartItemCreate } from "@/interfaces/cart-item";

class CartItemsHttpClient extends BaseHttpClient {
  private BASE_URL = "/cartItems";
  public constructor() {
    super();
  }

  public async getByUserIdAndProductId(
    userId: number,
    productId: number
  ): Promise<CartItem | null> {
    const [cartItem] = await this.get<CartItem[]>(
      `${this.BASE_URL}?userId=${userId}&productId=${productId}`
    );

    return cartItem ?? null;
  }

  public async getByUserId(userId: number): Promise<CartItem[]> {
    return this.get<CartItem[]>(`${this.BASE_URL}?userId=${userId}`);
  }

  public add(cartItem: CartItemCreate): Promise<CartItem> {
    return this.post<CartItemCreate, CartItem>(`${this.BASE_URL}`, cartItem);
  }

  public update(cartItem: CartItem): Promise<CartItem> {
    return this.patch(
      `${this.BASE_URL}/${cartItem.id}`,
      {
        numberOfItems: cartItem.numberOfItems,
      },
      { headers: { "Content-Type": "application/json" } }
    );
  }

  public async deleteCartItems(ids: number[]): Promise<void> {
    await Promise.all(
      ids.map((id) => {
        return this.delete(`${this.BASE_URL}/${id}`);
      })
    );
  }
}

export default new CartItemsHttpClient();

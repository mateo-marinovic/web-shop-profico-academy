import axios from "axios";
import { BaseHttpClient } from "./base";
import { Product } from "@/types/product";

class ProductsHttpClient extends BaseHttpClient {
  private BASE_URL = "/products";
  public constructor() {
    super();
  }
  public async getItems(): Promise<Product[]> {
    return this.get<Product[]>(`${this.BASE_URL}`);
  }

  public favoriteItem(id: any, favoriteBy: any) {
    axios.patch(
      `http://localhost:3004/products/${id}`,
      { favoriteBy: favoriteBy },
      { headers: { "Content-Type": "application/json" } }
    );
  }
}
export default new ProductsHttpClient();

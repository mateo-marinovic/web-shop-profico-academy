import axios from "axios";
import { BaseHttpClient } from "./base";
import { Product } from "@/interfaces/product";

class ProductsHttpClient extends BaseHttpClient {
  private BASE_URL = "/products";
  public constructor() {
    super();
  }
  public getItems(): Promise<Product[]> {
    return this.get<Product[]>(`${this.BASE_URL}`);
  }

  public getProductByTitle(search?: string): Promise<Product[]> {
    return this.get<Product[]>(`${this.BASE_URL}?q=${search}`);
  }

  public getProductById(id: string): Promise<Product> {
    return this.get<Product>(`${this.BASE_URL}/${id}`);
  }

  public async favoriteItem(id: number, favoriteBy: number[]): Promise<void> {
    await this.patch(
      `${this.BASE_URL}/${id}`,
      { favoriteBy: favoriteBy },
      { headers: { "Content-Type": "application/json" } }
    );
  }
}
export default new ProductsHttpClient();

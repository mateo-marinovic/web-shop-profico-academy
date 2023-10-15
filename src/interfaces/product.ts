export interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  favoriteBy: number[];
  cart: boolean;
}

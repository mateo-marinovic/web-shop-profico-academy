export interface CartItem {
  id: number;
  productId: number;
  userId: number;
  numberOfItems: number;
}

export interface CartItemCreate {
  productId: number;
  userId: number;
  numberOfItems: number;
}

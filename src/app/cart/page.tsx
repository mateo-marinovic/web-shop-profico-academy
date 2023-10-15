"use client";
import ItemCard from "@/components/item-card/item-card";
import { useUsersContext } from "@/contexts/users.context";
import cartItemsHttpClient from "@/http-clients/cart-items.http-client";
import productsHttpClient from "@/http-clients/products.http-client";
import { CartItem } from "@/interfaces/cart-item";
import { Product } from "@/interfaces/product";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

function Cart() {
  const { user } = useUsersContext();
  const [products, setProducts] = useState<Product[]>([]);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [total, setTotal] = useState<number>(0);
  const router = useRouter();

  const getCartItems = useCallback(async () => {
    if (!user?.id) return;
    const [products, cartItems] = await Promise.all([
      productsHttpClient.getItems(),
      cartItemsHttpClient.getByUserId(user.id),
    ]);

    let sum = 0;
    const cartProducts = cartItems.map((cartItem) => {
      const found = products.find(
        (product) => product.id === cartItem.productId
      );
      sum += (found?.price as number) * cartItem.numberOfItems;
      return {
        ...found,
        price: (found?.price as number) * cartItem.numberOfItems,
      } as Product;
    });
    setProducts(cartProducts);
    setCartItems(cartItems);
    setTotal(sum);
  }, [user]);

  useEffect(() => {
    getCartItems();
  }, [getCartItems]);

  const onBuyClick = async () => {
    const cartItemsIds = cartItems.map((x) => x.id);
    await cartItemsHttpClient.deleteCartItems(cartItemsIds);
    router.push("/products");
  };

  return (
    <>
      <ul className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 pb-[80px]">
        {products.map((item: Product) => {
          return (
            <ItemCard
              key={item.id}
              item={item}
            />
          );
        })}
      </ul>
      <h1 className="flex justify-center items-center">
        Ukupno za platiti: {total}
      </h1>
      <div className="flex items-center justify-center">
        <button
          className="align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
          onClick={onBuyClick}
        >
          Kupi
        </button>
      </div>
    </>
  );
}

export default Cart;

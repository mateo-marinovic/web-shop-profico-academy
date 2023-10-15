"use client";
import ItemList from "@/components/item-list/item-list";
import { useCallback, useEffect, useState } from "react";
import { Product } from "@/interfaces/product";
import productsHttpClient from "@/http-clients/products.http-client";
import { useUsersContext } from "@/contexts/users.context";

function WishList() {
  const [items, setItems] = useState<Product[]>([]);
  const { user } = useUsersContext();

  const userId = user?.id || 0;

  const fetchItems = useCallback(async () => {
    const items = await productsHttpClient.getItems();

    const favoriteProducts = items.filter((item) => {
      return item.favoriteBy.includes(userId);
    });

    setItems(favoriteProducts);
  }, []);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  return (
    <>
      <ItemList items={items} />
    </>
  );
}
export default WishList;

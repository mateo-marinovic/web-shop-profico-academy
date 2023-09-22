"use client";
import ItemList from "@/components/item-list/item-list";
import { ItemsHeader } from "@/components/items-header/items-header";
import { useCallback, useEffect, useState } from "react";
import { Product } from "@/interfaces/product";
import productsHttpClient from "@/http-clients/products.http-client";
import { useUsersContext } from "@/contexts/users.context";

function WishList() {
  const [items, setItems] = useState<Product[]>([]);
  const { id } = useUsersContext();

  const fetchItems = useCallback(async () => {
    const items = await productsHttpClient.getItems();

    const favoriteProducts = items.filter((item) => {
      return item.favoriteBy.includes(id);
    });

    setItems(favoriteProducts);
  }, []);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  return (
    <>
      <ItemsHeader />
      <ItemList items={items} />
    </>
  );
}
export default WishList;

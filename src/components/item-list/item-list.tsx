import ItemCard from "../item-card/item-card";
import { useState, useCallback, useEffect } from "react";
import productsHttpClient from "@/http-clients/products.http-client";
import { Product } from "@/types/product";

function ItemList() {
  const [items, setItems] = useState<Product[]>([]);

  const fetchItems = useCallback(async () => {
    const items = await productsHttpClient.getItems();
    setItems(items);
  }, []);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  const list = items.map((item: Product, index: number) => {
    return (
      <ItemCard
        key={index}
        item={item}
      ></ItemCard>
    );
  });
  return (
    <>
      <ul className="contact-list">{list}</ul>
    </>
  );
}

export default ItemList;

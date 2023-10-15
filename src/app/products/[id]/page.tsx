"use client";
import productsHttpClient from "@/http-clients/products.http-client";
import ItemDetails from "@/components/item-details/item-details";
import { useParams } from "next/navigation";
import { useCallback, useState, useEffect } from "react";
import { Product } from "@/interfaces/product";

function ItemInfo() {
  const [selectItemById, setSelectItemById] = useState<Product | null>(null);

  const { id } = useParams();

  const fetchItemById = useCallback(async () => {
    if (!id) return;
    const selectItemById = await productsHttpClient.getProductById(
      id as string
    );
    setSelectItemById(selectItemById);
  }, [id]);

  useEffect(() => {
    fetchItemById();
  }, [fetchItemById]);

  console.log(selectItemById?.price);

  if (!selectItemById) return null;
  return <ItemDetails product={selectItemById} />;
}
export default ItemInfo;

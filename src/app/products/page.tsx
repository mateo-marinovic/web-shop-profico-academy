"use client";
import ItemList from "@/components/item-list/item-list";
import { UsersProvider } from "@/contexts/users.context";
import { ItemsHeader } from "@/components/items-header/items-header";

export default function Products() {
  return (
    <>
      <UsersProvider>
        <ItemsHeader></ItemsHeader>
        <ItemList></ItemList>
      </UsersProvider>
    </>
  );
}

import ItemCard from "../item-card/item-card";
import { Product } from "@/interfaces/product";
interface ItemListProps {
  items: Product[];
}
function ItemList({ items }: ItemListProps) {
  return (
    <ul className="">
      {items.map((item: Product) => {
        return (
          <ItemCard
            key={item.id}
            item={item}
          />
        );
      })}
    </ul>
  );
}

export default ItemList;

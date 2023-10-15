import ItemCard from "../item-card/item-card";
import { Product } from "@/interfaces/product";
interface ItemListProps {
  items: Product[];
}
function ItemList({ items }: ItemListProps) {
  return (
    <ul className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 pb-[80px]">
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

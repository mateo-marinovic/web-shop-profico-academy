import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faBars } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { useUsersContext } from "@/contexts/users.context";
import productsHttpClient from "@/http-clients/products.http-client";
import { Product } from "@/interfaces/product";
import { usePathname } from "next/navigation";

interface ItemCardProps {
  item: Product;
}

function ItemCard({ item }: ItemCardProps) {
  const { user } = useUsersContext();
  const userId = user?.id || 0;
  const pathname = usePathname();

  const [favorite, setFavorite] = useState(item.favoriteBy.includes(userId));
  const favoriteHandler = (e: React.MouseEvent<SVGSVGElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (!favorite) {
      item.favoriteBy.push(userId);
    } else {
      item.favoriteBy = item.favoriteBy.filter((x: number) => x !== userId);
    }

    productsHttpClient.favoriteItem(item.id, item.favoriteBy);

    setFavorite(!favorite);
  };
  return (
    <Link href={`/products/${item.id}`}>
      <div className="relative p-2 ">
        {pathname !== "/cart" && (
          <FontAwesomeIcon
            className="z-10"
            size="lg"
            icon={faHeart}
            onClick={favoriteHandler}
            color={favorite ? "red" : "gray"}
          />
        )}

        <img
          className="h-48 w-full rounded-lg object-fill"
          src={item.image}
          alt="ball"
        />
        <div className="bg-white absolute bottom-2 flex w-full justify-between p-1 pr-6 font-inter">
          <div>
            <h3>title:{item.title}</h3>
          </div>
          <div>
            <h3>Price:{item.price}</h3>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default ItemCard;

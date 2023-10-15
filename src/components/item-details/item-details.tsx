import { Product } from "@/interfaces/product";
import ItemCounter from "../item-counter/item-counter";
import { useCallback, useEffect, useState } from "react";
import productsHttpClient from "@/http-clients/products.http-client";
import { useUsersContext } from "@/contexts/users.context";
import cartItemsHttpClient from "@/http-clients/cart-items.http-client";
import { useRouter } from "next/navigation";

type ItemInfoProps = {
  product: Product;
};

function ItemDetails({ product }: ItemInfoProps) {
  const [numberOfItems, setNumberOfItems] = useState<number>(0);
  const [cartItemId, setCartItemId] = useState<number>(0);
  const { user } = useUsersContext();
  const rout = useRouter();

  const getAndSetCartItemByUserIdAndProductId = useCallback(
    async (userId: number, productId: number) => {
      const cartItem = await cartItemsHttpClient.getByUserIdAndProductId(
        userId as number,
        productId
      );
      if (!cartItem) return;
      setCartItemId(cartItem.id);
      setNumberOfItems(cartItem.numberOfItems);
    },
    [user, product]
  );

  useEffect(() => {
    if (!user) return;
    getAndSetCartItemByUserIdAndProductId(user.id, product.id);
  }, [product, user]);

  const onCartHandler = async () => {
    if (!cartItemId)
      await cartItemsHttpClient.add({
        productId: product.id,
        userId: user?.id as number,
        numberOfItems,
      });
    else
      await cartItemsHttpClient.update({
        id: cartItemId,
        productId: product.id,
        userId: user?.id as number,
        numberOfItems,
      });
    rout.push("/products");
  };

  const multiple = () => {
    return numberOfItems * product.price;
  };

  return (
    <div className="grid grid-cols-2">
      <div className="grid-cols-6">
        <img
          className="w-full"
          src={"/" + product.image}
          alt={product.title}
        />
      </div>
      <div className="grid-cols-6 p-2">
        <div className="font-bold text-xl mb-2">{product.title}</div>
        <div className="text mb-4">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce
          fermentum finibus eros nec euismod. Sed a neque vel nulla porta
          condimentum sed at velit. Nullam diam erat, ultricies et dapibus ac,
          faucibus vitae orci. Donec tristique velit nec purus accumsan, sed
          pulvinar lorem sagittis.
        </div>
        <div className="text-gray-700 text-base">
          <ItemCounter
            numberOfItems={numberOfItems}
            setNumberOfITems={setNumberOfItems}
          />
          <h3>Price: {product.price}€</h3>
          <h3>Total: {multiple()}€</h3>
          <button
            disabled={numberOfItems === 0}
            onClick={onCartHandler}
            className="mb-5 flex items-center justify-center -block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
          >
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
}
export default ItemDetails;

import { Product } from "@/interfaces/product";

type ItemInfoProps = {
  product: Product;
};

function ItemDetails({ product }: ItemInfoProps) {
  return (
    <>
      <h3>Price: {product.price}</h3>
      <div className="float-left m-0 flex h-screen w-2/4 flex-col items-center justify-center bg-slate-400 p-0 text-center">
        <img
          src={"/" + product.image}
          alt={product.title}
        ></img>
      </div>
    </>
  );
}
export default ItemDetails;

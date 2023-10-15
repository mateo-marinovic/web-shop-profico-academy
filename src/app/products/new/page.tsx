"use client";
import productsHttpClient from "@/http-clients/products.http-client";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

export type NewProductValues = {
  title: string;
  image: string;
  price: number;
};

export default function AddNewProduct() {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
      price: 0,
      image: "",
      favoriteBy: [],
      cart: false,
    },
  });

  const router = useRouter();

  const newProductData = async (newProductData: NewProductValues) => {
    productsHttpClient.addNewProduct(newProductData);
  };
  const onSubmit = (formValues: NewProductValues): void => {
    newProductData(formValues);
    router.push("/products");
  };

  return (
    <div className="  flex items-center justify-center">
      <form className="bg-white">
        <input
          className="mt-10 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          {...register("title", {
            required: "This field is required!",
          })}
          placeholder="Product title"
        />
        <p className="mb-10  text-red-500 text-xs italic">
          {errors.title?.message}
        </p>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          {...register("image", { required: "This field is required!" })}
          placeholder="Product image"
        />
        <p className="mb-10  text-red-500 text-xs italic">
          {errors.image?.message}
        </p>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          {...register("price", { required: "This field is required!" })}
          placeholder="Product price"
          type="number"
        />
        <p className="mb-10 text-red-500 text-xs italic">
          {errors.price?.message}
        </p>
        <div className="flex items-center justify-center">
          <button
            onClick={handleSubmit(onSubmit)}
            className="mt-10 inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
          >
            Add new product!
          </button>
        </div>
      </form>
    </div>
  );
}

"use client";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { useRouter } from "next/navigation";
import usersHttpClient from "@/http-clients/users.http-client";
import authService from "@/services/auth.service";
import { UserSignIn } from "@/types/user";

type FormValues = {
  username: string;
  firstName: string;
  lastName: string;
  password: string;
};

export default function Auth() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: "",
      firstName: "",
      lastName: "",
      password: "",
    },
  });

  const router = useRouter();

  const signIn = async (userSignIn: UserSignIn) => {
    await authService.signIn(userSignIn);
    router.push("/products");
  };

  const onSubmit = (formValues: FormValues) => {
    signIn(formValues);
  };

  return (
    <div className="  flex items-center justify-center">
      <form
        className="bg-white shadow-md rounded px-32 pt-28 pb-28 mb-10"
        onSubmit={handleSubmit(onSubmit)}
      >
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          {...register("username", { required: "This field is required!" })}
          placeholder="Username"
        />
        <p className="mb-10  text-red-500 text-xs italic">
          {errors.username?.message}
        </p>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          {...register("firstName", { required: "This field is required!" })}
          placeholder="First Name"
        />
        <p className="mb-10  text-red-500 text-xs italic">
          {errors.firstName?.message}
        </p>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          {...register("lastName", { required: "This field is required!" })}
          placeholder="Last Name"
        />
        <p className="mb-10 text-red-500 text-xs italic">
          {errors.lastName?.message}
        </p>
        <input
          type="password"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          {...register("password", {
            required: "This field is required!",
            minLength: {
              value: 4,
              message: "Min length is 4!",
            },
          })}
          placeholder="Password"
        />
        <p className=" text-red-500 text-xs italic">
          {errors.password?.message}
        </p>
        <div className="flex items-center justify-center">
          <button className="mt-10 inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800">
            Sign in
          </button>
        </div>
        <div className="flex items-center justify-center">
          <Link href="/auth/login">Login</Link>
        </div>
      </form>
    </div>
  );
}

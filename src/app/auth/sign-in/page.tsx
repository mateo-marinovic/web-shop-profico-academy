"use client";
import { useForm } from "react-hook-form";
import Link from "next/link";
import authService from "@/services/auth.service";
import { UserSignIn } from "@/interfaces/user";
import { useUsersContext } from "@/contexts/users.context";

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

  const { onUserLoggedIn } = useUsersContext();

  const signIn = async (userSignIn: UserSignIn) => {
    const user = await authService.signIn(userSignIn);
    onUserLoggedIn(user);
  };

  const onSubmit = (formValues: FormValues) => {
    signIn(formValues);
  };

  return (
    <div className="  flex items-center justify-center">
      <form
        className="bg-white"
        onSubmit={handleSubmit(onSubmit)}
      >
        <input
          className="mt-10 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
        <div className="mb-5 flex items-center justify-center -block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800">
          <Link href="/auth/login">Login</Link>
        </div>
      </form>
    </div>
  );
}

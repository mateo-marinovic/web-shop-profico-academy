"use client";
import { useForm } from "react-hook-form";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";

type FormValues = {
  username: string;
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
      password: "",
    },
  });

  const router = useRouter();

  const onSubmit = (formValues: FormValues) => {
    axios
      .get(`http://localhost:3004/users?username=${formValues.username}`)
      .then(({ data }) => {
        if (data.length === 0) {
          alert("User name or password are not correct!");
          return;
        }

        const [user] = data;

        if (user.password !== formValues.password) {
          alert("User name or password are not correct!");
          return;
        }

        localStorage.setItem("jwt-token", `some-dummy-value-${user.id}`);

        router.push("/test");
      });
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
          <Link href="/auth/sign-in">Create account</Link>
        </div>
      </form>
    </div>
  );
}

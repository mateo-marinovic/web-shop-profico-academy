"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export function AuthGuard({ children }: any) {
  const router = useRouter();
  useEffect(() => {
    if (window.location.pathname.startsWith("/auth")) return;
    const token = localStorage.getItem("jwt-token");
    if (!token) {
      router.push("/auth/login");
    }
  }, []);
  return <>{children}</>;
}

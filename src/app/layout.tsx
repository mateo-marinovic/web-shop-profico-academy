import { error } from "console";
import "./styles/globals.css";

import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { AuthGuard } from "@/components/auth-guard/auth-guard";
import { UsersProvider } from "@/contexts/users.context";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Sign in",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head></head>
      <body className={inter.className}>
        <AuthGuard>
          <UsersProvider>{children}</UsersProvider>
        </AuthGuard>
      </body>
    </html>
  );
}

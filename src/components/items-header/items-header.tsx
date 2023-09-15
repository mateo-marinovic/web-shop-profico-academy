"use client";
import Link from "next/link";

export function ItemsHeader() {
  return (
    <>
      <Link href={"/wish-list"}>
        <button>Wish list</button>
      </Link>
    </>
  );
}

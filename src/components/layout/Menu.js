"use client";
import Image from "next/image";
import Card from "./Card";
import { useEffect, useState } from "react";
import { signOut, useSession } from "next-auth/react";

export default function Menu() {
  const { data, status } = useSession();
  const [products, setProducts] = useState();

  const getProducts = async () => {
    const response = await fetch("/api/products", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    const data = await response.json();
    setProducts(data);
  };

  const getUsers = async () => {
    const response = await fetch("/api/profile", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    const data = await response.json();
  };


  useEffect(() => {
    getProducts();
    getUsers()
  }, []);

  return (
    <section className="mt-5 flex flex-col justify-center items-center gap-5">
      <h2 className="mb-5 text-3xl font-semibold">Menu</h2>
      <div className="w-full flex flex-wrap gap-2">
        {products ? (
          products && products.map((product,key) => <Card key={key} product={product} btn={status === "authenticated" ? true : false} />)
        ) : (
          <p>loaaaading....</p>
        )}
      </div>
    </section>
  );
}

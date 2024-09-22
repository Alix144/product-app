"use client";
import Image from "next/image";
import Card from "./Card";
import { useEffect, useState } from "react";
import { signOut, useSession } from "next-auth/react";

export default function Menu() {
  const { data, status } = useSession();
  const [products, setProducts] = useState();
  const [productName, setProductName] = useState();
  const [description, setDescription] = useState();
  const [price, setPrice] = useState();
  const [error, setError] = useState("");

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

  const addProduct = async (e) => {
    e.preventDefault()
    const response = await fetch("/api/products", {
      method: "POST",
      headers: { 
        "Content-Type": "application/json" 
      },
      body: JSON.stringify({name: productName, description, price}),
    });
  
    const data = await response.json();
    setProducts((prevProducts) => [...prevProducts, data.product]);
    setProductName("")
    setDescription("")
    setPrice("")
  }

  useEffect(() => {
    getProducts();
    getUsers()
  }, []);

  return (
    <section className="mt-5 flex flex-col justify-center items-center gap-5">
      <h2 className="mb-5 text-3xl font-semibold">Menu</h2>
      <form action="" className="flex flex-col gap-3" onSubmit={(e)=>addProduct(e)}>
        <h2>Add Product</h2>
        <input type="text" placeholder="product name" value={productName} onChange={(e)=>setProductName(e.target.value)} required/>
        <input type="text" placeholder="description" value={description} onChange={(e)=>setDescription(e.target.value)}/>
        <input type="number" placeholder="Price $" className="px-2 bg-slate-100 rounded-md h-10 border" value={price} onChange={(e)=>setPrice(e.target.value)} required/>
        <button className="px-6 py-2 bg-primary text-white rounded-full" type="submit">Add</button>
      </form>
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

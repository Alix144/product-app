"use client";
import Card from "@/components/layout/Card";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

export default function Cart() {
  const { data, status } = useSession();
  const [userId, setUserId] = useState(null);
  const [inCartProducts, setInCartProducts] = useState(null);

  const getUserInformation = async () => {
    const response = await fetch(`/api/profile/${userId}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    const data = await response.json();
    setInCartProducts(data.cart);
  };

  // useEffect(() => {
  //   console.log("useeffect with ........")
  //   if(userId != null){
  //     getUserInformation();
  //   }
  //   setUserId(data?.user.id);
  // }, []);

  useEffect(() => {
    setUserId(data?.user.id);
    if (userId != null) {
      getUserInformation();
    }
  }, [data]);

  useEffect(() => {
    if (userId != null) {
      getUserInformation();
    }
  }, [userId]);

  // one solution is to find the user by email
  // but we still should save the logged in userId somewhere

  return (
    <div>
      <h1 className="my-10 text-4xl text-rose-600 text-center">Cart</h1>
      <div className="flex gap-5 flex-wrap">
        {inCartProducts != null && inCartProducts.length > 0 ? (
          inCartProducts.map((product, key) => (
            <Card key={key} product={product} btn={false} />
          ))
        ) : inCartProducts != null && inCartProducts.length === 0 ? (
          <p>No products in cart</p>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
}

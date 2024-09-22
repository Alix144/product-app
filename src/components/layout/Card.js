"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { increment, setAmount } from "@/redux/features/counter";
import { useDispatch } from "react-redux";
import { useSession } from "next-auth/react";

export default function Card({ product, btn }) {
  const dispatch = useDispatch();
  const { data, status } = useSession();
  const [userId, setUserId] = useState(null);

  const addToCart = async (id) => {
    //increase the cart items number
    dispatch(increment())
    //add product to user's products array
    const response = await fetch("/api/profile/cart-items", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({userId: data.user.id, productId: id}),
    });
  };


  useEffect(() => {

  }, []);

  // useEffect(() => {
  //   console.log("useeffect with idddddddd")
  //   if (userId != null) {
  //     getUserInformation();
  //   }
  //   console.log(userId)
  // }, [userId]);

  return (
    <div className=" w-52 h-72 flex flex-col justify-between items-center bg-gray-300 rounded-lg text-center">
      <div className="w-full h-2/5 relative">
        <Image
          src={"/images/no-img.png"}
          alt={"img"}
          fill
          className="rounded-md"
        />
      </div>
      <div className="flex flex-col justify-between items-center gap-1 p-3">
        <h3 className="font-semibold">{product?.name}</h3>
        <p className="text-sm">{product?.description}</p>

        {btn ? (
          <button className="flex items-center gap-1 bg-primary text-white px-4 py-2 rounded-full " onClick={() => addToCart(product?._id)}>
            Add To Cart ${product?.price}
          </button>
        ) : (
          <p className="text-[#ff4f4f]">${product?.price}</p>
        )}
      </div>
    </div>
  );
}

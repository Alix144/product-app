"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { redirect } from "next/dist/server/api-utils";

export default function Gg() {
  const { data, status } = useSession();
  const [name, setName] = useState("");

  const userImage = data?.user?.image;

  const handleNameUpdate = async (e) => {
    e.preventDefault();
    const response = await fetch('/api/profile/', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({name}),
    })
  };

  if (status === "loading") {
    return <h1>fetching data ...</h1>;
  }else if (status === "unauthenticated") {
    return redirect("/login");
  }else if (status === "authenticated") {
    return (
      <div className="flex flex-col items-center">
        {(
          <h2 className="mb-5 text-center text-primary text-4xl">
            welcome {data?.user?.name}
          </h2>
        )}

        {data?.user && (
          <>
            <Image
              className="mb-5 rounded-full"
              src={userImage}
              alt="profile-img"
              width={100}
              height={100}
            />
            <button className="mb-10 bg-red-500 w-48 text-white">
              Change Image
            </button>
          </>
        )}

        <form action="" onSubmit={(e)=>handleNameUpdate(e)} className="flex flex-col items-center">
          <input
            className="w-48"
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            className="w-48"
            type="text"
            placeholder={data?.user && data.user.email}
            disabled
          />
          <button className="bg-red-500 w-48 text-white">Save</button>
        </form>
      </div>
    );
  }else{
    return <h1>Try again</h1>
  }
}

"use client";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";

export default function AuthBtns() {
  const { data, status } = useSession();

  return (
    <nav className="flex items-center gap-4 text-gray-500 font-semibold">
      {status === "loading" && <p>Loadinng...</p>}
      {status === "unauthenticated" && (
        <>
          <Link href={"/login"} className="pl-6 pr-2 py-2">
            Login
          </Link>

          <Link
            href={"/register"}
            className="px-6 py-2 bg-primary text-white rounded-full"
          >
            Register
          </Link>
        </>
      )}
      {status === "authenticated" && (
        <>
          <button className="pl-6 pr-2 py-2" onClick={() => signOut()}>
            Logout
          </button>
        </>
      )}
    </nav>
  );
}

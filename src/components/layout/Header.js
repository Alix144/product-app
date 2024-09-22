import Link from "next/link";
import AuthBtns from "./AuthBtns";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/nextAuth";
import { useSelector } from "react-redux";
import CartBtn from "./CartBtn";

export default async function Header() {
  const session = await getServerSession(authOptions);

  return (
    <header className="flex justify-between items-center">
      <Link href="/" className="text-primary font-semibold text-2xl">
        MA PIZZA
      </Link>
      <nav className="flex items-center gap-4 text-gray-500 font-semibold">
        <Link href={"/"} className="hover:underline">
          Home
        </Link>
        <Link href={"/menu"} className="hover:underline">
          Menu
        </Link>
      </nav>

      {session?.user && (
        <>
          <Link
            href={"/profile"}
            className="px-6 py-2 bg-primary text-white rounded-full"
          >
            Hello {session?.user?.name}
          </Link>
          <CartBtn/>
        </>
      )}
      <AuthBtns />
    </header>
  );
}

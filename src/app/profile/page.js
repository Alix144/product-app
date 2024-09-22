import Image from "next/image";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/nextAuth";
import Gg from "@/components/layout/Gg";

export default async function Profile() {
  const session = await getServerSession(authOptions)

  return (
    <section className="mt-8">
      <h1>Profile</h1>

      <Gg/>
    
    </section>
  );
}

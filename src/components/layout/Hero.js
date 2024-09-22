import Image from "next/image";
import Right from "../icons/Right";

export default function Hero() {
  return (
    <section className="flex items-center justify-between gap-2">
      <div className=" w-3/5 py-12">
        <h1 className="text-4xl font-semibold">Everything is better with a Pizza</h1>
        <p className="mt-4 text-gray-400">
          Pizza is the missing piece that makes every day complete, a simple yet
          delicious joy in life.
        </p>

        <div className="mt-5 flex gap-4 text-sm">
            <button className="flex items-center gap-1 bg-primary text-white px-4 py-2 rounded-full uppercase">Order Now <Right /></button>
            <button className="px-4 py-2 flex items-center gap-1 text-gray-600 font-semibold">Learn More <Right /></button>
        </div>
      </div>

      <div className="w-2/5 h-48 relative">
        <Image
          src={"/images/pizza.jpg"}
          alt={"pizza"}
          fill
          
        />
      </div>
    </section>
  );
}

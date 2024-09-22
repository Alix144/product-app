"use client";
import { useState } from "react";
import {signIn} from 'next-auth/react'

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleFormSubmit(e) {
    e.preventDefault();
    fetch("/api/register", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: { "Content-Type": "application/json" },
    });
  }

  return (
    <section className="mt-8">
      <h1 className="mb-5 text-center text-primary text-4xl"> Register</h1>
      <form
        action=""
        className="w-[50%] flex flex-col  mx-auto"
        onSubmit={handleFormSubmit}
      >
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type="submit"
          className="mb-2 py-2 bg-primary rounded-md text-white "
        >
          Submit
        </button>
        <p className="mx-auto mt-2 mb-1 text-gray-500 text-sm">
          or login with a provider
        </p>
        <button className="border" onClick={() => signIn("google", {redirect: true, callbackUrl: "/"})}>Login with google</button>
      </form>
    </section>
  );
}

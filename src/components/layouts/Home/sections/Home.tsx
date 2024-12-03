import Link from "next/link";
import React from "react";

const Home = () => {
  return (
    <main className="w-full h-screen flex justify-center items-center">
      <div className="flex flex-col gap-4 items-center">
        <h1 className="font-bold text-xl">Homepage</h1>
        <span className="flex items-center gap-6">
          <Link href={"/register"}>Register</Link>
          <Link href={"/login"}>Login</Link>
        </span>
      </div>
    </main>
  );
};

export default Home;

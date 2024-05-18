"use client";

import React from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";

const Nav = () => {
  const session = useSession();
  const status = session.status;
  return (
    <header className="flex items-center justify-between">
      <nav className="flex gap-8 items-center text-gray-500 font-semibold">
        <Link href="" className="text-primary font-semibold text-2xl">
          ST PIZZLink
        </Link>
        <Link href={"/"}>Home</Link>
        <Link href={""}>Menu</Link>
        <Link href={""}>About</Link>
        <Link href={""}>Contact</Link>
      </nav>
      <nav className="flex items-center gap-4 text-gray-500 font-semibold">
        {status !== "authenticated" && (
          <>
            <Link href={"/login"}>Login</Link>

            <Link
              className="bg-primary text-white rounded-full px-6 py-2 rounded-6"
              href={"/register"}
            >
              Register
            </Link>
          </>
        )}
        {status === "authenticated" && (
          <button
            className="bg-primary text-white rounded-full px-6 py-2 rounded-6"
            onClick={signOut}
          >
            Logout
          </button>
        )}
      </nav>
    </header>
  );
};

export default Nav;

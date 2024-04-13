"use client";
import { UserButton, useUser } from "@clerk/nextjs";
import Link from "next/link";
import React from "react";

function Header() {
  const { user, isLoaded } = useUser();
  return (
    <header>
      <nav
        className="flex items-center justify-between p-6 lg:px-8 h-20 border border-t-0 border-l-0 border-b-gray-600"
        aria-label='"Global'
      >
        <div className="flex flex-1 py-4 px-5">
          <Link href="/">
            <h1 className="text-3xl font-bold">DARDEUS AI Concept</h1>
          </Link>
        </div>
        {isLoaded && user && (
          <div className="flex justify-between">
            <Link href="/generation">Generation</Link>
            <UserButton afterSignOutUrl="/" />
          </div>
        )}
        {isLoaded && !user && (
          <Link href="/login">Login</Link>
        )}
      </nav>
    </header>
  );
}

export default Header;

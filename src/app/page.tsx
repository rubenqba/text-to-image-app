import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import React from "react";

export default function Page() {
  const {userId} = auth();

  if (userId) {
    redirect("/generation");
  }
  return (
    <main className="">
      <section className="">
        This is a demo application
      </section>
    </main>
  );
}

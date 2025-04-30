import Link from "next/link";
import Image from "next/image";
import React from "react";
import { auth, signOut, signIn } from "@/auth";

const Navbar = async () => {
  const session = await auth();
  return (
    <header className="px-5 py-3 shadow-sm bg-white font-work-sans">
      <nav className="flex justify-between items-center ">
        <Link href="/">
          <Image
            src="/ycd-logo.png" // No need for "/public"
            alt="YC-Logo"
            width={144}
            height={30}
          />
        </Link>

        <div className="flex item-center gap-5 text-black">
          {session && session.user ? (
           <>
            <Link href="/startup/create">
              <span>Create</span>
            </Link>
            <form
            action={async () => { 
              "use server";
              await signOut({ redirectTo: "/" })}}>
              <button type="submit">Logout</button>
            </form>

            <Link href={`/user/${session?.user?.id}`}>
              <span>{session?.user?.name}</span>
            </Link>
           </>
          ) : (
            <form
            action={async () => { 
              "use server";
              await signIn('github')}}>
              <button type="submit">Login</button>
            </form>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;

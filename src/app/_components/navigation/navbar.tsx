'use client'
import React from "react";
import Link from "next/link";
import { useState, useEffect } from "react";
import {
	signInWithGoogle,
	signOut,
	onAuthStateChanged
} from "@/app/_lib/firebase/auth";



function useUserSession(initialUser: any) {
	return;
}

const Navbar = () => {



  return (
    <>


      <div className="w-full h-20 sticky top-0">
        <div className="container mx-auto px-4 h-full">
          <div className="flex justify-around items-center h-full">
            {/* <Logo /> */}
            <ul className="hidden md:flex gap-x-6 ">

            <li>
                <Link href="/">
                  <p>Home</p>
                </Link>
              </li>

            <li>
                <Link href="/buy">
                  <p>Buy</p>
                </Link>
              </li>

              <li>
                <Link href="/sell">
                  <p>Sell</p>
                </Link>
              </li>

              <li>
                <Link href="/about">
                  <p>About</p>
                </Link>
              </li>
              
              <li>
                <Link href="/contacts">
                  <p>Contacts</p>
                </Link>
              </li>

              <li>
                <Link href="/admin">
                  <p>Admin</p>
                </Link>
              </li>

            </ul>
            {/* <Button /> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
'use client'
import React from "react";
import Link from "next/link";
import { useState } from "react";
import { Bars4Icon, ArrowsPointingOutIcon } from '@heroicons/react/24/solid';
import "@/app/_styles/animations.css";


const Navbar = () => {

  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>

<nav className="bg-white opacity-95 sticky top-0 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className=" text-2xl font-bold">
          <Link href="/" className="hover:text-gray-800 hover:font-extrabold">
                  <p>MyBrand</p>
                </Link>
                </div>
        
        {/* <div className="hidden md:flex space-x-6">
          <a href="#" className="text-white hover:text-gray-300">Home</a>
          <a href="#" className="text-white hover:text-gray-300">About</a>
          <a href="#" className="text-white hover:text-gray-300">Services</a>
          <a href="#" className="text-white hover:text-gray-300">Contact</a>
        </div> */}

<div id="NAVBAR ITEMS" className="w-full">
        <div className="container mx-auto px-4 h-full">
          <div className="flex justify-around items-center h-full">
            {/* <Logo /> */}
            <ul className="hidden md:flex gap-x-6">

            <li>
                <Link href="/buy" className="hover:text-gray-800 hover:font-bold">
                  <p>Buy</p>
                </Link>
              </li>

              <li>
                <Link href="/sell" className="hover:text-gray-800 hover:font-bold">
                  <p>Sell</p>
                </Link>
              </li>

              <li>
                <Link href="/about" className="hover:text-gray-800 hover:font-bold">
                  <p>About</p>
                </Link>
              </li>
              
              <li>
                <Link href="/contacts" className="hover:text-gray-800 hover:font-bold">
                  <p>Contacts</p>
                </Link>
              </li>

              <li>
                <Link href="/console" className="hover:text-gray-800 hover:font-bold">
                  <p>Console</p>
                </Link>
              </li>

            </ul>
            {/* <Button /> */}
          </div>
        </div>
      </div>

        <div className="md:hidden">
          <button onClick={toggleMenu} className=" focus:outline-none">
            {isOpen ? <ArrowsPointingOutIcon className="w-6 h-6" /> : <Bars4Icon className="w-6 h-6" />}
          </button>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden mt-4 flex flex-col space-y-2">
          <a href="#" className=" hover:text-gray-300">Home</a>
          <a href="#" className=" hover:text-gray-300">About</a>
          <a href="#" className=" hover:text-gray-300">Services</a>
          <a href="#" className=" hover:text-gray-300">Contact</a>
        </div>
      )}
    </nav>


     
    </>
  );
};

export default Navbar;
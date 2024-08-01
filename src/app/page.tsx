
'use client'
import Carrier from "./_components/carrier"
import React from "react";


export default function Home() {

  return (


    <main className="flex min-h-screen flex-col items-center justify-between p-4">


      <div className="mb-2 grid text-center lg:mb-0 lg:w-full lg:max-w-5xl 2xl:grid-cols-2 lg:text-center">

      <Carrier/>

      </div>
  

    </main>
  );
}

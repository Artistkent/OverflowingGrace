import React from "react";
import Image from "next/image";
import Link from "next/link";



const Carrier = ({imgsrc, alttext}:{ imgsrc: string, alttext:string}) => {
  return (
    <>
    <a
          
          className="group rounded-lg border my-5 mx-2 transition-colors border-gray-300 bg-white dark:border-neutral-700 dark:bg-neutral-800/30"
          target="_blank"
          rel="noopener noreferrer"
        >
            <div className="items-center rounded-lg grid md:grid-cols-2 text-left lg:mb-0 lg:w-full lg:max-w-5xl overflow-hidden">


            <Image draggable="false"
            className="h-full sm:w-full "
          src={imgsrc}
          width={500}
          height={500}
          alt={alttext}
            />
            

          <div id="text-container" className="group h-full p-4 grid  transition-colors border-gray-300 dark:border-neutral-700 dark:bg-neutral-800/30">


      <span className="group h-fit w-fit py-1 px-4 rounded-2xl transition-colors border-gray-300 bg-yellow-300 0">
      Top Property
      </span>

            <h3 className="font-semibold m-0 ">
            &#8358; 700,000
            </h3>

          <p className="m-0 text-sm ">
            Awesome land! There&apos;s so much you can do here! Plant flowers, plant seeds, plant virus flowers, plant elemental evolution flowers, plant nuclear flowers, plant hyfroxinated flowers...
          </p>

          </div>

          </div>

          
        </a>
    </>
  );
};

export default Carrier;
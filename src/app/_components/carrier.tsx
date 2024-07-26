import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {Property, PropertyWithId} from './types/types';
import axios from "axios";





const Carrier = () => {

  const [properties, setProperties] = useState<PropertyWithId[]>([]);




  useEffect(() => {

    axios.get('api/properties')
      .then(response => setProperties(response.data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
    <>


{properties.map((property: Property, index:number) => (
  <a key={index}
          
          className="group rounded-lg border my-5 mx-2 transition-colors border-gray-300 bg-white dark:border-neutral-700 dark:bg-neutral-800/30"
          target="_blank"
          rel="noopener noreferrer"
        >
            <div className="items-center rounded-lg grid md:grid-cols-2 text-left lg:mb-0 lg:w-full lg:max-w-5xl overflow-hidden">


            <Image draggable="false"
            className="h-full sm:w-full "
          src={property.url!}
          width={500}
          height={500}
          alt={property.alt!}
            />
            

          <div id="text-container" className="group h-full p-4 grid  transition-colors border-gray-300 dark:border-neutral-700 dark:bg-neutral-800/30">


      <span className="group h-fit w-fit py-1 px-4 rounded-2xl transition-colors border-gray-300 bg-yellow-300 0">
      Top Property
      </span>

            <h3 className="font-semibold m-0 ">
           {property.price}
            </h3>

          <p className="m-0 text-sm ">
            {property.description}
          </p>

          </div>

          </div>

          
        </a>
))
    
}
    </>
  );
};

export default Carrier;
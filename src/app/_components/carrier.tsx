import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {Property} from './types/types';
import axios from "axios";
import { storage } from "../_firebase/firebaseConfig";
import { getDownloadURL, ref } from "firebase/storage";
import Slider from 'react-slick';




const Carrier = () => {

  const [properties, setProperties] = useState<Property[]>([]);

  useEffect(() => {
    const fetchProperties = async () => {
      const propertiesRef = ref(storage, 'properties.json');
      try {
        const url = await getDownloadURL(propertiesRef);
        const response = await axios.get(url);
        setProperties(response.data);
      } catch (error) {
        console.error('Error fetching properties:', error);
      }
    };

    fetchProperties();
  }, []);

  const sliderSettings = {
    accessibility:true,
    adaptiveHeight:true,
    mobileFirst:true,
    arrows:true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 6000,
  };

  return (
    <>


{properties.map((property: Property, index:number) => (
  <div key={index}
          
          className="group rounded-lg border my-5 mx-2 transition-colors border-gray-300 bg-white dark:border-neutral-700 dark:bg-neutral-800/30"
          rel="noopener noreferrer"
        >
            

          <div className="items-center rounded-lg grid md:grid-cols-2 text-left lg:mb-0 lg:w-full lg:max-w-5xl overflow-hidden">



<Slider className="my-7 " {...sliderSettings}>
              {property.url && Array.isArray(property.url) &&  property.url.map((imageUrl, i) => (
                <div key={i}>
                  <Image draggable="false"
                    className="h-full sm:w-full"
                    src={imageUrl}
                    width={100}
                    height={100}
                    alt={property.alt || '' }
                  />
                 

                </div>

                
              ))}
            </Slider>
            

          <div id="text-container" className="group h-full p-4 grid  transition-colors border-gray-300 dark:border-neutral-700 dark:bg-neutral-800/30 space-y-3 ">


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


{/* Lower part */}

          <div className="flex p-3 rounded-lg text-left lg:mb-0 lg:w-full lg:max-w-5xl overflow-hidden flex-nowrap">

          <div className="flex items-start h-full w-full ">
  <p>Lagos</p>
</div>

{/* Stuffff */}

<div className="flex justify-around items-end">
  <p className="px-2">Call</p> <p>Email</p>
</div>
          </div>
          
        </div>
))
    
}
    </>
  );
};

export default Carrier;
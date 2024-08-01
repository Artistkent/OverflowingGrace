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
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);


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

  const openModal = (imageUrl: string) => {
    setSelectedImage(imageUrl);
    setModalOpen(true);
  };

  const closeModal = () => {
    setSelectedImage(null);
    setModalOpen(false);
  };

  return (
    <>


{properties.map((property: Property, index:number) => (
  <a key={index}
          
          className="grid group rounded-lg border my-5 mx-2  max-h-max lg:max-h-96 transition-colors border-gray-300 bg-white dark:border-neutral-700 dark:bg-neutral-800/30 overflow-hidden"
          
          rel="noopener noreferrer" 
        >
            

          <div className="items-center grid md:grid-cols-2 text-left lg:mb-0 lg:w-full lg:max-w-5xl  overflow-hidden">

<div id="carousel-container" className="carousel-container overflow-hidden h-full align-middle" >

<Slider className="carousel-container h-full" {...sliderSettings}>
              {property.url && Array.isArray(property.url) &&  property.url.map((imageUrl, i) => (

                <div key={i} onClick={() => openModal(imageUrl)} className="carousel-must-flex cursor-pointer" > 
                  <Image draggable="false"
                    className="h-full w-auto"
                    src={imageUrl}
                    width={100}
                    height={100}
                    alt={property.alt || '' }
                  />
                 

                </div>

                
              ))}
            </Slider>

            </div>
            

          <div id="text-container" className="group h-max p-4 grid  transition-colors  border-gray-300 dark:border-neutral-700 dark:bg-neutral-800/30 space-y-3 ">

          <h1 className="font-semibold m-0 text-lg">
           {property.name}
            </h1>

            <h3 className="font-semibold m-0 text-lg">
           {property.price}
            </h3>

          <p className="m-0 text-sm ">
            {property.description}
          </p>

          </div>

          </div>


{/* Lower part */}

          <div className="flex p-3  text-left lg:mb-0 lg:w-full lg:max-w-5xl transition-colors border-y border-gray-300  dark:border-neutral-700 dark:bg-neutral-800/30 overflow-hidden flex-nowrap">

          <div className="flex items-start h-full w-full ">
  <h1>{property.location}</h1>
</div>

{/* Stuffff */}

<div className="flex justify-around items-end">
  <p className="px-2">Call: +234 8035 200 283</p> <p>Email: ebakkym@gmail.com</p>
</div>
          </div>
          
        </a>
))}


{modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50" onClick={closeModal}>
          <div className="relative p-2" onClick={(e) => e.stopPropagation()}>
            {selectedImage && (
              <Image
                src={selectedImage}
                alt="Expanded Image"
                width={600}
                height={600}
                className="rounded-lg"
              />
            )}
            <button className="absolute top-2 right-2 text-white" onClick={closeModal}>
              &times;
            </button>
          </div>
        </div>
      )}

    </>
  );
};

export default Carrier;
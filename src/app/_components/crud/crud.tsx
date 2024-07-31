
import { useState, useEffect, ChangeEvent} from 'react';
import Image from "next/image";
import axios from 'axios';
import {Property} from '../types/types';
import {PropertyWithId} from '../types/types';
import { ref, getDownloadURL, uploadString, uploadBytes, deleteObject   } from "firebase/storage";
import { storage, auth } from "../../_firebase/firebaseConfig";
import Slider from 'react-slick';

const Crud = () => {

  //Data Editor Start
  //
  //
  //
  
    const [properties, setProperties] = useState<PropertyWithId[]>([]);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [uploadingIndex, setUploadingIndex] = useState<number | null>(null);
    const [uploadButton, setUploadButton] = useState<boolean | null>(false);
    const [delOnlyURL, setDelOnlyURL] = useState<boolean | null>(false);



    const addedProperty = [
      {
      "name": "...",
    "price": "...",
    "description": "...",
    "url": ["..."],
    "alt": "..."
      }  
  ];

 
  useEffect(() => {
    const fetchProperties = async () => {
      const propertiesRef = ref(storage, 'properties.json');
      try {
        const url = await getDownloadURL(propertiesRef);
        const response = await axios.get(url);
        setProperties(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchProperties();
  }, []);



      const handleInputChange = (index: number, event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    const newProperties = [...properties];
    newProperties[index] = { ...newProperties[index], [name]: value };
    setProperties(newProperties);
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>, index: number) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedFile(event.target.files[0]);
      // setUploadingIndex(index);
      setUploadButton(!uploadButton);
    } else{
      setUploadButton(uploadButton)
    }
  };

  const setFileAndIndex = ( index: number) => {
   
      //setSelectedFile(event.target.files[0]);
      setUploadingIndex(index);
      setUploadButton(true);
    
  }



  const uploadImage = async (file: File, index: number) => {
    const user = auth.currentUser;

    if (user) {
      const imageRef = ref(storage, `images/${file.name}`);
      try {
        await uploadBytes(imageRef, file);
        const url = await getDownloadURL(imageRef);
        const newProperties = [...properties];
        const existingUrls = newProperties[index].url || [];
        newProperties[index] = { ...newProperties[index], url: [...existingUrls, url] };
        setProperties(newProperties);
      } catch (error) {
        console.error('Error uploading image:', error);
       
      }
    } else {
      console.error('User is not authenticated.');
      
    }
  };


  
  const deleteImage = async (propertyIndex: number, imageIndex: number) => {
    const user = auth.currentUser;

    if (user) {
      const urlToDelete = properties[propertyIndex]?.url?.[imageIndex];

      if (!urlToDelete) {
        console.error('No URL found to delete.');
        return; // Exit function if URL is not available
      }

      const fileName = decodeURIComponent(urlToDelete.split('/').pop()?.split('?')[0] || '');

      if (!fileName) {
        console.error('Unable to extract file name from URL.');
        return; // Exit function if file name is not available
      }
    

      const imageRef = ref(storage, fileName);

      try {
        await deleteObject(imageRef);
        const newProperties = [...properties];
        newProperties[propertyIndex].url.splice(imageIndex, 1);
        setProperties(newProperties);
      } catch (error) {
        console.error('Error deleting image:', error);
        setDelOnlyURL(true);

      }
    } else {
      console.error('User is not authenticated.');
    }
  };


  const deleteURLOnly = async (propertyIndex: number, imageIndex: number) => {

    const user = auth.currentUser;

    if (user) {
      const urlToDelete = properties[propertyIndex]?.url?.[imageIndex];

      if (!urlToDelete) {
        console.error('No URL found to delete.');
        return; // Exit function if URL is not available
      }

      const fileName = decodeURIComponent(urlToDelete.split('/').pop()?.split('?')[0] || '');

      if (!fileName) {
        console.error('Unable to extract file name from URL.');
        return; // Exit function if file name is not available
      }

      try {
        const newProperties = [...properties];
        newProperties[propertyIndex].url.splice(imageIndex, 1);
        setProperties(newProperties);
        setDelOnlyURL(false);
      } catch (error) {
        console.error('Error deleting image:', error);

      }
    } else {
      console.error('User is not authenticated.');
    }
  }

//Carousel Slider

const sliderSettings = {
  accessibility:true,
  adaptiveHeight:true,
  mobileFirst:true,
  arrows:true,
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 6000,
};


  const addToList = () => {
    const newerProperties = [...properties];
    const concatProperties: PropertyWithId[] = newerProperties.concat(addedProperty);
    setProperties(concatProperties);
  };

   

  const deleteFromList = (index: number) => {
    const newerProperties = [...properties];
    newerProperties.splice(index, 1);
    setProperties(newerProperties);
  };


  const saveChanges = async () => {
    const propertiesRef = ref(storage, 'properties.json');
    try {
      const jsonData = JSON.stringify(properties);
      await uploadString(propertiesRef, jsonData, 'raw', { contentType: 'application/json' });
      console.log('Data saved successfully');
    } catch (error) {
      console.error('Error saving data:', error);
    }
  };

  useEffect(() => {
    if (selectedFile && uploadingIndex !== null) {
      uploadImage(selectedFile, uploadingIndex);
      setSelectedFile(null);
      setUploadingIndex(null);
      setUploadButton(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedFile, uploadingIndex]);


//
//
//
//Data Editor End

  return (
    <div>
        


<div>
      {properties.map((property, index) => (
        <div key={index} style={{ marginBottom: '20px' }}>
          <div>
            <label>Name: </label>
            <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              type="text"
              name="name"
              value={property.name}
              onChange={(e) => handleInputChange(index, e)}
            />
          </div>
          <div>
            <label>Price: </label>
            <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              type="text"
              name="price"
              value={property.price}
              onChange={(e) => handleInputChange(index, e)}
            />
          </div>
          <div>
            <label>Description: </label>
            <textarea className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              name="description"
              value={property.description}
              onChange={(e) => handleInputChange(index, e)}
            />
          </div>
          <div>
            <label>Image URL: </label>
            <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              type="text"
              name="url"
              value ={property.url ? property.url[0] : ''}
              onChange={(e) => handleInputChange(index, e)}
            />
          </div>
          <div>
            <label>Image Alt Text: </label>
            <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              type="text"
              name="alt"
              value={property.alt}
              onChange={(e) => handleInputChange(index, e)}
            />
          </div>

          <Slider className="my-7" {...sliderSettings}>
              {property.url && Array.isArray(property.url) &&  property.url.map((imageUrl, i) => (
                <div key={i}>
                  <Image draggable="false"
                    className=""
                    src={imageUrl}
                    width={100}
                    height={100}
                    alt={property.alt || '' }
                  />
                  <div className='my-2'>
<button
                    onClick={() => deleteImage(index, i)}
                    className=" top-2 right-2 bg-red-500 text-white rounded-full p-2 mx-2"
                  >
                    Delete
                  </button>

              {delOnlyURL?
                  <button onClick={() => deleteURLOnly(index, i)}
                    className=" top-2 right-2 bg-red-500 text-white rounded-full p-2 mx-2">Delete Url Only</button> :<></>
                  }
                  </div>
                 

                </div>

                
              ))}
            </Slider>

<div>
      <label>Choose Image: </label>
      <input accept="image/*" 
        type="file"
        onChange={(e) => handleFileChange(e, index)}
      />
      </div>

      {uploadButton ? <button onClick={() => setFileAndIndex(index)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 mx-1 rounded" >Upload Image</button> : <></>}


          <button onClick={() => deleteFromList(index)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 mx-1 rounded">Delete Item</button>
        </div>
      ))}
      
      <div className='sticky bottom-0 p-2 bg-white opacity-95'>

      <button onClick={addToList} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 mx-1 rounded">Add Item</button>
      
      <button onClick={saveChanges} className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-3 mx-1 rounded">Save Changes</button>
      </div>

    </div>
        </div>




  );
};

export default Crud;

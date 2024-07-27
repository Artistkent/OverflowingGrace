
import { useState, useEffect, ChangeEvent, Key, SetStateAction } from 'react';
import Image from "next/image";
import axios from 'axios';
import {Property} from '../types/types';
import {PropertyWithId} from '../types/types';
import { ref, getDownloadURL, uploadString, uploadBytes  } from "firebase/storage";
import { storage } from "../../_firebase/firebaseConfig";

const Crud = () => {

  //Data Editor Start
  //
  //
  //


  
    const [properties, setProperties] = useState<PropertyWithId[]>([]);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [uploadingIndex, setUploadingIndex] = useState<number | null>(null);
    const [uploadButton, setuploadButton] = useState<boolean | null>(false);



    const addedProperty = [
      {
      "name": "...",
    "price": "...",
    "description": "...",
    "url": "...",
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
      setuploadButton(!uploadButton);
    } else{
      setuploadButton(uploadButton)
    }
  };

  const setFileAndIndex = ( index: number) => {
   
      //setSelectedFile(event.target.files[0]);
      setUploadingIndex(index);
      setuploadButton(!uploadButton);
    
  }



  const uploadImage = async (file: File, index: number) => {
    const imageRef = ref(storage, `images/${file.name}`);
    try {
      await uploadBytes(imageRef, file);
      const url = await getDownloadURL(imageRef);
      const newProperties = [...properties];
      newProperties[index] = { ...newProperties[index], url };
      setProperties(newProperties);
    } catch (error) {
      console.error('Error uploading image:', error);
    }
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
              value={property.url}
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

          <Image draggable="false"
            className=""
          src={property.url!}
          width={100}
          height={100}
          alt={property.alt!}
            />

<div>
      <label>Choose Image: </label>
      <input
        type="file"
        onChange={(e) => handleFileChange(e, index)}
      />
      </div>

      {uploadButton ? <button onClick={() => setFileAndIndex(index)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 mx-1 rounded" >Upload Image</button> : <></>}


          <button onClick={() => deleteFromList(index)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 mx-1 rounded">Delete Item</button>
        </div>
      ))}
      

      <button onClick={addToList} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 mx-1 rounded">Add Item</button>
      
      <button onClick={saveChanges} className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-3 mx-1 rounded">Save Changes</button>
    </div>

      <h1>CRUD App</h1>

    </div>
  );
};

export default Crud;

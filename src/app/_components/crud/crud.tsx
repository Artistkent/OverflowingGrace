
import { useState, useEffect, ChangeEvent, Key, SetStateAction } from 'react';
import Image from "next/image";
import axios from 'axios';
import {Property} from '../types/types';
import {PropertyWithId} from '../types/types';
import { ref, getDownloadURL, uploadString } from "firebase/storage";
import { storage } from "../../_firebase/firebaseConfig";

const Crud = () => {

  //Data Editor Start
  //
  //
  //


  
    const [properties, setProperties] = useState<PropertyWithId[]>([]);



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
            <input
              type="text"
              name="name"
              value={property.name}
              onChange={(e) => handleInputChange(index, e)}
            />
          </div>
          <div>
            <label>Price: </label>
            <input
              type="text"
              name="price"
              value={property.price}
              onChange={(e) => handleInputChange(index, e)}
            />
          </div>
          <div>
            <label>Description: </label>
            <textarea
              name="description"
              value={property.description}
              onChange={(e) => handleInputChange(index, e)}
            />
          </div>
          <div>
            <label>Image URL: </label>
            <input
              type="text"
              name="url"
              value={property.url}
              onChange={(e) => handleInputChange(index, e)}
            />
          </div>
          <div>
            <label>Image Alt Text: </label>
            <input
              type="text"
              name="alt"
              value={property.alt}
              onChange={(e) => handleInputChange(index, e)}
            />
          </div>
          {/* <img src={property.url} alt={property.alt} style={{ width: '100px', height: '100px' }} /> */}
          
          <Image draggable="false"
            className="h-full sm:w-full "
          src={property.url!}
          width={100}
          height={100}
          alt={property.alt!}
            />

          <button onClick={() => deleteFromList(index)}>Delete Item</button>
        </div>
      ))}
      

      <button onClick={addToList}>Add Item</button>
      <button onClick={saveChanges}>Save Changes</button>
    </div>

      <h1>CRUD App</h1>

    </div>
  );
};

export default Crud;

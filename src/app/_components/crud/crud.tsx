
import { useState, useEffect, ChangeEvent, Key, SetStateAction } from 'react';
import Image from "next/image";
import axios from 'axios';
import {Property} from '../types/types';
import {PropertyWithId} from '../types/types';

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

      axios.get('/api/properties')
        .then(response => setProperties(response.data))
        .catch(error => console.error('Error fetching data:', error));
    }, []);




    // useEffect(() => {
    //   const fetchProperties = async () => {
    //     try {
    //       const querySnapshot = await getDocs(collection(db, "properties"));
    //       const propertiesList: PropertyWithId[] = querySnapshot.docs.map(doc => ({
    //         id: doc.id,
    //         ...doc.data()
    //       })) as PropertyWithId[];
          
    //       setProperties(propertiesList);

    //     } catch (error) {
    //       console.error('Error fetching data:', error);
    //     }
    //   };
  
    //   fetchProperties();
    // }, []);

    const handleInputChange = (index: number, event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = event.target;
      const newProperties = [...properties];
      newProperties[index] = { ...newProperties[index], [name]: value };
      setProperties(newProperties);
    };

    // const handleInputChange = (index: number, event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    //   const { name, value } = event.target;
    //   const newProperties = [...properties];
    //   newProperties[index] = { ...newProperties[index], [name]: value };
    //   setProperties(newProperties);
    // };

    const addToList = () => {
      const newerProperties = [...properties];
      const concatProperties:Property[] = newerProperties.concat(addedProperty);
      setProperties(concatProperties);
      // console.log(newerProperties);
    };

    // const addToList = async () => {
    //   try {
    //     const docRef = await addDoc(collection(db, "properties"), addedProperty[0]);
    //     setProperties([...properties, { id: docRef.id, ...addedProperty[0] }]);
    //   } catch (error) {
    //     console.error("Error adding document: ", error);
    //   }
    // };

   


    const deleteFromList = (index:number) => {
      const newerProperties = [...properties];
      newerProperties.splice(index, 1);
      setProperties(newerProperties);
    };

     // const deleteFromList = async (index: number) => {
    //   const propertyToDelete = properties[index];
    //   if (propertyToDelete.id) {
    //     try {
    //       await deleteDoc(doc(db, "properties", propertyToDelete.id));
    //       const newProperties = properties.filter((_, i) => i !== index);
    //       setProperties(newProperties);
    //     } catch (error) {
    //       console.error("Error deleting document: ", error);
    //     }
    //   }
    // };

    // 


    const saveChanges = () => {
      axios.post('/api/properties', properties)
        .then(response => console.log('Data saved:', response))
        .catch(error => console.error('Error saving data:', error));
    };


    // const saveChanges = async () => {
      //   try {
      //     const batch = writeBatch(db);
      //     properties.forEach(property => {
      //       if (property.id) {
      //         const docRef = doc(db, "properties", property.id);
      //         batch.update(docRef, property as Omit<PropertyWithId, 'id'>);
      //       }
      //     });
      //     await batch.commit();
      //     console.log("Data saved successfully");
      //   } catch (error) {
      //     console.error("Error saving data:", error);
      //   }
      // };

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

// components/ItemList.tsx
import { useState, useEffect, ChangeEvent, Key } from 'react';

import { storage } from '../../../../firebaseconfig';
import { addItem, getItems, updateItem, deleteItem, Item } from '../../../../firestoreService';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import axios from 'axios';
import {Property} from '../types/types';

export default function Crud () {


  const [items, setItems] = useState<Item[]>([]);
  const [newItem, setNewItem] = useState('');
  const [editingItem, setEditingItem] = useState<string | null>(null);
  const [editingText, setEditingText] = useState('');

  const [image, setImage] = useState<File | null>(null);
  const [url, setUrl] = useState<string>('');
  const [progress, setProgress] = useState<number>(0);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    if (image) {
      const storageRef = ref(storage, `images/${image.name}`);
      const uploadTask = uploadBytesResumable(storageRef, image);

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setProgress(progress);
        },
        (error) => {
          console.error('Upload failed:', error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setUrl(downloadURL);
          });
        }
      );
    }
}
      





  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    const items = await getItems();
    setItems(items);
  };

  const handleAddItem = async () => {
    await addItem({ text: newItem });
    setNewItem('');
    fetchItems();
  };

  const handleUpdateItem = async (id: string) => {
    await updateItem(id, { text: editingText });
    setEditingItem(null);
    setEditingText('');
    fetchItems();
  };

  const handleDeleteItem = async (id: string) => {
    await deleteItem(id);
    fetchItems();
  };

  //Data Editor Start
  //
  //
  //

 
  
  
  
    const [properties, setProperties] = useState<Property[]>([]);



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

      axios.get('http://localhost:5000/properties')
        .then(response => setProperties(response.data))
        .catch(error => console.error('Error fetching data:', error));
    }, []);

    const handleInputChange = (index: number, event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = event.target;
      const newProperties = [...properties];
      newProperties[index] = { ...newProperties[index], [name]: value };
      setProperties(newProperties);
    };

    const addToList = () => {
      const newerProperties = [...properties];
      const concatProperties:Property[] = newerProperties.concat(addedProperty);
      setProperties(concatProperties);
    };

    const deleteFromList = (index:number) => {
      const newerProperties = [...properties];
      newerProperties.splice(index, 1);
      setProperties(newerProperties);
    };

    const saveChanges = () => {
      axios.post('http://localhost:5000/properties', properties)
        .then(response => console.log('Data saved:', response))
        .catch(error => console.error('Error saving data:', error));
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
          <img src={property.url} alt={property.alt} style={{ width: '100px', height: '100px' }} />

          <button onClick={() => deleteFromList(index)}>Delete Item</button>
        </div>
      ))}
      

      <button onClick={addToList}>Add Item</button>
      <button onClick={saveChanges}>Save Changes</button>
    </div>

      <h1>CRUD App</h1>

      <div>
      <input type="file" onChange={handleChange} />
      <button onClick={handleUpload}>Upload</button>
      {progress > 0 && <p>Upload progress: {progress}%</p>}
      {url && <img src={url} alt="Uploaded image" />}
    </div>

      <input
        type="text"
        value={newItem}
        onChange={(e: ChangeEvent<HTMLInputElement>) => setNewItem(e.target.value)}
      />
      
      <button onClick={handleAddItem}>Add Item</button>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            {editingItem === item.id ? (
              <div>
                <input
                  type="text"
                  value={editingText}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setEditingText(e.target.value)}
                />
                <button onClick={() => handleUpdateItem(item.id!)}>Save</button>
                <button onClick={() => setEditingItem(null)}>Cancel</button>
              </div>
            ) : (
              <div>
                {item.text}
                <button onClick={() => { setEditingItem(item.id!); setEditingText(item.text); }}>Edit</button>
                <button onClick={() => handleDeleteItem(item.id!)}>Delete</button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};


// components/ItemList.tsx
import { useState, useEffect, ChangeEvent } from 'react';
import { storage } from '../../../../firebaseconfig';
import { addItem, getItems, updateItem, deleteItem, Item } from '../../../../firestoreService';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';

const Crud = () => {
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

  return (
    <div>
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

export default Crud;

// firestoreService.ts
import { db } from './firebaseconfig';
import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc } from 'firebase/firestore';

const collectionName = 'items'; // Change to your collection name

export interface Item {
  id?: string;
  text: string;
}

export const addItem = async (item: Item) => {
  try {
    const docRef = await addDoc(collection(db, collectionName), item);
    return docRef.id;
  } catch (e) {
    console.error('Error adding document: ', e);
  }
};

export const getItems = async (): Promise<Item[]> => {
  const querySnapshot = await getDocs(collection(db, collectionName));
  return querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id } as Item));
};

export const updateItem = async (id: string, updatedItem: Partial<Item>) => {
  const itemRef = doc(db, collectionName, id);
  try {
    await updateDoc(itemRef, updatedItem);
  } catch (e) {
    console.error('Error updating document: ', e);
  }
};

export const deleteItem = async (id: string) => {
  const itemRef = doc(db, collectionName, id);
  try {
    await deleteDoc(itemRef);
  } catch (e) {
    console.error('Error deleting document: ', e);
  }
};

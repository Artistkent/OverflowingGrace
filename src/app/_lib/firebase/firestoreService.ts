import { db } from './clientApp';
import { collection, addDoc, getDocs, updateDoc, doc, deleteDoc } from 'firebase/firestore';
import {PropertyWithId } from '../../_components/types/types';

// export interface Item {
//   id?: string;
//   name: string;
//   price: string;
//   description: string;
//   url: string;
//   alt: string;
// }

const addItem = async (item: PropertyWithId) => {
  const docRef = await addDoc(collection(db, "items"), item);
  return docRef.id;
};

const getItems = async () => {
  const querySnapshot = await getDocs(collection(db, "items"));
  const items = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as PropertyWithId[];
  return items;
};

const updateItem = async (id: string, item: Partial<PropertyWithId>) => {
  await updateDoc(doc(db, "items", id), item);
};

const deleteItem = async (id: string) => {
  await deleteDoc(doc(db, "items", id));
};

export { addItem, getItems, updateItem, deleteItem };

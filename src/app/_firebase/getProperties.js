// getProperties.js
import { ref, getDownloadURL } from "firebase/storage";
import { storage } from "./firebaseConfig";
import axios from "axios";

const getProperties = async () => {
  const propertiesRef = ref(storage, 'properties.json');
  try {
    const url = await getDownloadURL(propertiesRef);
    const response = await axios.get(url);
    console.log(response.data);
  } catch (error) {
    console.error("Error getting file:", error);
  }
};

getProperties();

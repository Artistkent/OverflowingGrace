import admin from 'firebase-admin';
import serviceAccount from '../../../../config/overflowing-grace-firebase-adminsdk-46q86-034d06c09f.json';

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://overflowing-grace-default-rtdb.europe-west1.firebasedatabase.app/"
  });
}

const firestore = admin.firestore();

export { firestore };

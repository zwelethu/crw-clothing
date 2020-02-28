import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: 'AIzaSyDZGbD68p3T2y51-louMt5DSuW0tFSU8T4',
  authDomain: 'crownclothingshop.firebaseapp.com',
  databaseURL: 'https://crownclothingshop.firebaseio.com',
  projectId: 'crownclothingshop',
  storageBucket: 'crownclothingshop.appspot.com',
  messagingSenderId: '670563453063',
  appId: '1:670563453063:web:158a67e03fefee89c51022',
  measurementId: 'G-6GYDR02LL8'
};
export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;
  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const snapShot = await userRef.get();
  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (err) {
      console.log('error creating user.', err.message);
    }
  }
  return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prpmpt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);
export default firebase;

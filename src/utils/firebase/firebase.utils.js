// Import the functions you need from the SDKs you need
import { classBody } from "@babel/types";
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import {
   getAuth,
   signInWithRedirect,
   signInWithPopup,
   GoogleAuthProvider,
   createUserWithEmailAndPassword,
   signInWithEmailAndPassword,
   signOut,
   onAuthStateChanged,
} from "firebase/auth";
import {
   getFirestore,
   doc, // retrieve documents inside firestore database
   getDoc, // get the document data
   setDoc, // set te document data
} from "firebase/firestore";
import { async } from "q";

// Your web app's Firebase configuration
const firebaseConfig = {
   apiKey: "AIzaSyASyW0wDPvIlRCgmzYq_ZzbVa3GSRpl59Q",
   authDomain: "crwn-db-ebf92.firebaseapp.com",
   projectId: "crwn-db-ebf92",
   storageBucket: "crwn-db-ebf92.appspot.com",
   messagingSenderId: "27037811868",
   appId: "1:27037811868:web:d540fac27c443d39985959",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
   prompt: "select_account",
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (
   userAuth,
   additionalInformation = {}
) => {
   if (!userAuth) return;

   const userDocRef = doc(db, "users", userAuth.uid);

   const userSpapshot = await getDoc(userDocRef);

   if (!userSpapshot.exists()) {
      const { displayName, email } = userAuth;
      const createdAt = new Date();

      try {
         await setDoc(userDocRef, {
            displayName,
            email,
            createdAt,
            ...additionalInformation, // Here
         });
      } catch (error) {
         console.log(error.code);
         if (error.code == "auth/wrong-password") {
            console.log("wrong");
            alert("incorrect password for email");
         }
         // console.log('error creating the user', error.message)
      }
   }

   return userDocRef;
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
   if (!email || !password) return;

   return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInUserWithEmailAndPassword = async (email, password) => {
   if (!email || !password) return;

   return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async () => await signOut(auth);

export const onAuthStateChangedListener = (callback) =>
   onAuthStateChanged(auth, callback);

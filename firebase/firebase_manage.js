import firebase from 'firebase/compat/app';
import { query, where, limit, getFirestore, collection, doc, addDoc, setDoc, getDocs, getDoc } from "firebase/firestore";


const addNewUser = async ( user) => { 
    const db = getFirestore(); 

    await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        email: user.email,
        created_date: new Date(),
        updated_date: new Date()
    }) 
}

export default {
    addNewUser,
}
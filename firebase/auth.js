import firebase from './config';

import { getAuth
    , signOut
    , onAuthStateChanged
    , signInWithEmailAndPassword
    , createUserWithEmailAndPassword  
} from "firebase/auth";

const registrerWithEmail = async (email, password) => {
    const auth = getAuth(); 
    console.log('auth en register', auth);
    return createUserWithEmailAndPassword(auth, email, password).then((userCredential) => { 
        const user = userCredential.user;  
        console.log('user en register', user);
        return { user }
    }).catch((error) => { 
        const errorCode = error.code;
        const errorMessage = error.message;  
        return { 
            error: errorCode + ': your error is' + errorMessage
        }
    })
}

// const signWithEmail = async (signInEmail, signInPassword) => { 
//     const auth = getAuth();
    
//     return signInWithEmailAndPassword(auth, signInEmail, signInPassword)
//     .then((userCredential) => {  
//         const user = userCredential.user; 
//         console.log('user en sign', user);
//         return { user }
//     }).catch((error) => {
//         const errorCode = error.code;
//         const errorMessage = error.message;
//         console.log('Error: ', errorCode + ': ' + errorMessage) 
//         return { 
//             error: errorCode + ': ' + errorMessage
//         }
//     })
// }

// const signOutUser = async () => {  
//     const auth = getAuth();
//     return signOut(auth).then(() => { 
//         return {
//             suscess: true
//         }
//       }).catch((error) => { 
//         return {
//           error
//         }
//       })
// }

const authState = async (userFnc) => {
    const auth = getAuth();
    onAuthStateChanged(auth, userFnc); 
    console.log('auth en estado del usuario', auth.currentUser?.email);
}

const getCurrentUser = () => { 
    const auth = getAuth();
    const user = auth.currentUser; 
    console.log('current user', user);
    return user 
 }

const userStateListener = (callback) => {return onAuthStateChanged(auth, callback);};
  
export default { 
    registrerWithEmail,
    // signWithEmail,
    //signOutUser,
    getCurrentUser,
    authState,
    userStateListener
}
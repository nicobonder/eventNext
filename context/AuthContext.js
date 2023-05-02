import { createContext, useContext, useEffect } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

import {auth} from '../firebase/config'
import { useState } from 'react';

const UserContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState({});
    const createUser = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password);
    }

    const signIn = (email, password) => {
      return signInWithEmailAndPassword(auth, email, password)
    }
  
    const logout = () => {
        return signOut(auth)
    }
  
    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
        console.log('AuthContextProvider.onAuthStateChanged(), user: ', currentUser);
        
        setUser(currentUser);
      });
      return () => {
        unsubscribe();
      };
    }, []);

    //ademas de pasar createUser, tenemos que pasar user
    return (
    <UserContext.Provider
      value={{
        createUser, user,
       signIn,
       logout,
        // getCurrentUser,
        // authState,
        // userStateListener,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

//UserAuth es el que contiene el contexto y es lo que tengo que importar en otros archivos 
export const UserAuth = () => {
  return useContext(UserContext);
};

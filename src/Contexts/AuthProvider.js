import React, { useEffect } from 'react';
import { useState } from 'react';
import { createContext } from 'react';
import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth'
import app from '../Firebase/Firebase.config';





const auth = getAuth(app)
export const AuthContext = createContext()

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState({})
    const [loding, setLoding] = useState(true)

    const provider = new GoogleAuthProvider()


    const googleSignIn = () => {
        setLoding(true)
        return signInWithPopup(auth, provider)
    }


    const createUserWithEmail = (email, password) => {
        setLoding(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }
    const login = (email, password) => {
        setLoding(true)
        return signInWithEmailAndPassword(auth, email, password)
    }
    const logOut = () => {
        signOut(auth)
    }


    const updateUserProfile = (profile) => {
        return updateProfile(auth.currentUser, profile)
    }

    useEffect(() => {
        const unsubcribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser)
            console.log("User found in effect", currentUser)
            setLoding(false)
        })

        return () => unsubcribe()
    }, [])

    const appInfo = { user, createUserWithEmail, login, loding, setLoding, logOut, googleSignIn, updateUserProfile }

    return (
        <AuthContext.Provider value={appInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
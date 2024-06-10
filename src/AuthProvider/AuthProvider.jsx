import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import PropTypes from 'prop-types'
import { auth } from "../firebase/firebase.init";
import axios from "axios";
import useAxiosCommon from "../Hooks/useAxiosCommon";


export const AuthContext = createContext(null);
const AuthProvider = ({ children }) => {
  const googleProvider = new GoogleAuthProvider();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  // const [reload, setReload] = useState(null);
  const axiosCommon = useAxiosCommon()

  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const updateUserProfile = (name, photo) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photo,
    });
  };

  const loginUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const googleLogin = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  const userLogout = () => {
    setLoading(true);
    return signOut(auth);
  };


  const saveUser = async user => {
    setLoading(true);
    const currentUser ={
      email : user?.email,
      role : 'student',
      status : 'pending',
      image : user?.photoURL,
      name : user?.displayName,
    }
    const {data} = await axios.put(`${import.meta.env.VITE_API_KEY}/user`,currentUser)
    return data
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        const userInfo = {email : currentUser.email}
        axiosCommon.post('/jwt' , userInfo)
        .then(res => {
          if(res.data.token){
            localStorage.setItem('access-token' , res.data.token)
          }
        })
        setUser(currentUser);
        saveUser(currentUser)
        console.log(currentUser);
      } else {
        localStorage.removeItem('access-token')
        setUser(null)
      }
      setLoading(false);
    });

    return () => {
      return unsubscribe();
    };
  }, [axiosCommon]);

  const authInfo = {
    createUser,
    user,
    setUser,
    loading,
    updateUserProfile,
    // setReload,
    loginUser,
    googleLogin,
    userLogout,
  };
  return <AuthContext.Provider value={authInfo}>
    {children}
  </AuthContext.Provider>;
};

AuthProvider.propTypes = {
    children: PropTypes.node,
  };

export default AuthProvider;

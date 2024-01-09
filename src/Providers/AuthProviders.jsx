import { createContext, useEffect, useState } from "react";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import app from "../firebase/firebase.config";

export const AuthContext = createContext(null);
const auth = getAuth(app);

const AuthProviders = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const googleProvider = new GoogleAuthProvider();

  const createUser = (email, password) => {
    setLoading(false);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const userlogin = (email, password) => {
    setLoading(false);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logout = () => {
    setLoading(false);
    return signOut(auth);
  };

  const updateUserProfile = (name, photo) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photo,
    });
  };

  const googleSignIn = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (loggedUser) => {
      setUser(loggedUser);

      // Store user information in local storage if the user is logged in
      if (loggedUser) {
        localStorage.setItem("userUid", loggedUser.uid);
        localStorage.setItem("userEmail", loggedUser.email);

        // Fetch userId from the backend based on the user's email
        try {
          const response = await fetch(
            `http://localhost:5000/providers/getId/${loggedUser.email}`
          );
          const data = await response.json();
          if (data.length > 0) {
            const userId = data[0]._id;
            const userImg = data[0].user_img // Assuming you have a single userId associated with the email
            localStorage.setItem("userID", userId);
            localStorage.setItem("userImg", userImg);
          }
        } catch (error) {
          console.error("Error fetching userId:", error);
        }
      } else {
        // Clear user information from local storage if the user is not logged in
        localStorage.removeItem("userUid");
        localStorage.removeItem("userEmail");
        localStorage.removeItem("userID");
        localStorage.removeItem("userImg"); // Remove userId when the user logs out
      }

      return () => {
        unsubscribe();
      };
    });
  }, []);

  // Retrieve user information from local storage
  const storedUserUid = localStorage.getItem("userUid");
  const storedUserEmail = localStorage.getItem("userEmail");
  const storedUserId = localStorage.getItem("userID");
  const storedUserImg = localStorage.getItem("userImg");  // Retrieve userId

  const authInfo = {
    user,
    createUser,
    userlogin,
    logout,
    loading,
    updateUserProfile,
    googleSignIn,
    storedUserUid,
    storedUserEmail,
    storedUserId,
    storedUserImg, // Include storedUserId in the context
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProviders;
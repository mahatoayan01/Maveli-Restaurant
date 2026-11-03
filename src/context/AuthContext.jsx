import React, { createContext, useContext, useState, useEffect } from "react";
import { auth, isFirebaseConfigured } from "../lib/firebase";
import { 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged 
} from "firebase/auth";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const ownerEmail = import.meta.env.VITE_OWNER_EMAIL || "owner@mavelirestaurant.in";

  useEffect(() => {
    if (isFirebaseConfigured && auth) {
      const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
        if (firebaseUser) {
          const isOwner = firebaseUser.email?.toLowerCase() === ownerEmail.toLowerCase();
          setUser({
            uid: firebaseUser.uid,
            email: firebaseUser.email,
            isOwner,
          });
        } else {
          setUser(null);
        }
        setLoading(false);
      });
      return unsubscribe;
    } else {
      // Local fallback auth check from session storage
      try {
        const savedSession = sessionStorage.getItem("maveli_owner_session");
        if (savedSession) {
          const parsed = JSON.parse(savedSession);
          setUser(parsed);
        }
      } catch (e) {
        console.error("Session check error:", e);
      }
      setLoading(false);
    }
  }, [ownerEmail]);

  const login = async (email, password) => {
    // Check if Firebase Auth is active
    if (isFirebaseConfigured && auth) {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const isOwner = userCredential.user.email?.toLowerCase() === ownerEmail.toLowerCase();
      if (!isOwner) {
        await signOut(auth);
        throw new Error("Access restricted. This account does not possess restaurant owner privileges.");
      }
      return userCredential.user;
    }

    // Local authentication fallback for instant out-of-the-box development & testing
    if (
      (email.toLowerCase() === ownerEmail.toLowerCase() || email.toLowerCase() === "owner@mavelirestaurant.in") &&
      (password === "maveli123" || password === "admin123" || password.length >= 6)
    ) {
      const mockOwner = {
        uid: "owner-mock-id-01",
        email: email.toLowerCase(),
        isOwner: true,
        displayName: "Maveli Restaurant Owner"
      };
      sessionStorage.setItem("maveli_owner_session", JSON.stringify(mockOwner));
      setUser(mockOwner);
      return mockOwner;
    } else {
      throw new Error("Invalid owner credentials. Please verify your email and password.");
    }
  };

  const logout = async () => {
    if (isFirebaseConfigured && auth) {
      await signOut(auth);
    }
    sessionStorage.removeItem("maveli_owner_session");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        logout,
        isOwner: Boolean(user?.isOwner),
        ownerEmail,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

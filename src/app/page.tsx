"use client"; // <--- VERY IMPORTANT: This tells Next.js this is a Client Component for interactivity

import { useState, useEffect } from "react"; // We'll need useState and useEffect hooks
import { Button } from "@/components/ui/button"; // Assuming this is your UI button component
import {
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  User,
} from "firebase/auth"; // Import signOut and onAuthStateChanged
import { auth, githubProvider, googleProvider } from "@/lib/firebase.config"; // Your Firebase config

export default function Home() {
  // State to hold the current authenticated user
  const [user, setUser] = useState<User | null>(null);
  // State to indicate if the authentication state is still loading
  const [loading, setLoading] = useState(true);

  // useEffect to listen for authentication state changes
  useEffect(() => {
    // onAuthStateChanged returns an unsubscribe function that we can call
    // when the component unmounts to clean up the listener.
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false); // Authentication state has been determined
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []); // Empty dependency array means this effect runs once on mount

  const signInWithGoogle = async () => {
    try {
      // signInWithPopup returns a Promise that resolves with a UserCredential
      // The user state will be updated by the onAuthStateChanged listener
      await signInWithPopup(auth, googleProvider);
      console.log("Signed in with Google successfully!");
    } catch (error) {
      console.error("Error signing in with Google:", error);
      // You can add more specific error handling here
      // e.g., if (error.code === 'auth/popup-closed-by-user') { ... }
    }
  };

  const signInWithGithub = async () => {
    try {
      // The user state will be updated by the onAuthStateChanged listener
      await signInWithPopup(auth, githubProvider);
      console.log("Signed in with GitHub successfully!");
    } catch (error) {
      console.error("Error signing in with GitHub:", error);
      // You can add more specific error handling here
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      console.log("User signed out successfully!");
      // The user state will be updated to null by the onAuthStateChanged listener
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  if (loading) {
    return <p>Loading authentication state...</p>;
  }

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h1>Firebase Authentication Example</h1>

      {user ? ( // If a user is logged in
        <div>
          <p>Welcome, {user.displayName || user.email}!</p>
          {user.photoURL && (
            <img
              src={user.photoURL}
              alt="User profile"
              style={{
                borderRadius: "50%",
                width: "50px",
                height: "50px",
                margin: "10px",
              }}
            />
          )}
          <Button onClick={handleSignOut}>Sign Out</Button>
        </div>
      ) : (
        // If no user is logged in
        <div>
          <p>Please sign in to continue.</p>
          <Button onClick={signInWithGoogle} style={{ marginRight: "10px" }}>
            Login with Google
          </Button>
          <Button onClick={signInWithGithub}>Login with Github</Button>
        </div>
      )}
    </div>
  );
}

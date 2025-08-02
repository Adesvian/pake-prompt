import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";
import { User } from "firebase/auth";
import { app } from "@/lib/firebase/config";

const db = getFirestore(app);

export const saveUserToFirestore = async (user: User) => {
  if (!user) return;

  const userRef = doc(db, "users", user.uid);
  const snapshot = await getDoc(userRef);

  if (!snapshot.exists()) {
    const providerId = user.providerData[0]?.providerId || "unknown";
    const newUser = {
      uid: user.uid,
      displayName: user.displayName || "Anonymous",
      email: user.email,
      photoURL: user.photoURL,
      provider: providerId,
      createdAt: new Date().toISOString(),
    };

    try {
      await setDoc(userRef, newUser);
      console.log("User saved to Firestore:", newUser);
    } catch (error) {
      console.error("Error saving user to Firestore:", error);
    }
  } else {
    console.log("User already exists in Firestore.");
  }
};

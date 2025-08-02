import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  collection,
  getDocs,
  DocumentReference,
} from "firebase/firestore";
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

export const fetchData = async (collectionName: string) => {
  try {
    const outputSnapshot = await getDocs(collection(db, collectionName));
    const results: any[] = [];

    for (const docSnap of outputSnapshot.docs) {
      const outputData = docSnap.data();

      let promptData = null;
      let userData = null;

      const promptRef = outputData.prompt_id as DocumentReference | null;

      if (promptRef) {
        const promptSnap = await getDoc(promptRef);
        if (promptSnap.exists()) {
          promptData = promptSnap.data();

          const userRef = promptData.created_by as DocumentReference | null;
          if (userRef) {
            const userSnap = await getDoc(userRef);
            if (userSnap.exists()) {
              const user = userSnap.data();
              userData = {
                displayName: user.displayName ?? "Unknown",
                photoURL: user.photoURL ?? null,
              };
            }
          }
          promptData = {
            id: promptSnap.id,
            ...promptData,
            created_by: userData,
          };
        }
      }

      results.push({
        id: docSnap.id,
        ...outputData,
        prompt_id: promptData,
      });
    }

    return results;
  } catch (err) {
    console.error("Error fetching output with prompt + user:", err);
    return [];
  }
};

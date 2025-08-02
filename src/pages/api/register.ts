import type { NextApiRequest, NextApiResponse } from "next";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";
import { app } from "@/lib/firebase/config";

const db = getFirestore(app);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { uid, displayName, email, photoURL, provider } = req.body;

  if (!uid || !email) {
    return res.status(400).json({ message: "Missing required user data" });
  }

  try {
    const userRef = doc(db, "users", uid);
    const snapshot = await getDoc(userRef);

    if (!snapshot.exists()) {
      const newUser = {
        uid,
        displayName: displayName || "Anonymous",
        email,
        photoURL,
        provider: provider || "unknown",
        createdAt: new Date().toISOString(),
      };

      await setDoc(userRef, newUser);
      return res.status(201).json({ message: "User created", user: newUser });
    } else {
      return res.status(200).json({ message: "User already exists" });
    }
  } catch (err) {
    console.error("🔥 Error saving user:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
}

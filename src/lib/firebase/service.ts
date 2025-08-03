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
import {
  OutputBase,
  OutputWithPrompt,
  PromptBase,
  PromptWithUser,
  UserBase,
} from "@/types/data";

const db = getFirestore(app);

export const createUser = async (user: User) => {
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
      return;
    } catch (error) {
      throw error;
    }
  } else {
    return;
  }
};

export const fetchData = async (
  collectionName: string
): Promise<OutputWithPrompt[]> => {
  try {
    // Step 1: Fetch all outputs
    const outputSnapshot = await getDocs(collection(db, collectionName));

    if (outputSnapshot.empty) {
      return [];
    }

    // Step 2: Collect all unique prompt and user references
    const promptRefsMap = new Map<string, DocumentReference>();
    const outputsData: (OutputBase & { id: string })[] = [];

    outputSnapshot.docs.forEach((docSnap) => {
      const outputData = docSnap.data() as OutputBase;
      const outputWithId = {
        id: docSnap.id,
        ...outputData,
      };

      outputsData.push(outputWithId);

      // Collect unique prompt references
      if (outputData.prompt_id) {
        promptRefsMap.set(outputData.prompt_id.path, outputData.prompt_id);
      }
    });

    // Step 3: Batch fetch all prompts
    const promptsMap = new Map<string, PromptBase & { id: string }>();
    const userRefsMap = new Map<string, DocumentReference>();

    const promptFetchPromises = Array.from(promptRefsMap.entries()).map(
      async ([promptPath, promptRef]) => {
        try {
          const promptSnap = await getDoc(promptRef);
          if (promptSnap.exists()) {
            const promptData = promptSnap.data() as PromptBase;
            const promptWithId = {
              id: promptSnap.id,
              ...promptData,
            };

            promptsMap.set(promptPath, promptWithId);

            // Collect unique user references
            if (promptData.created_by) {
              userRefsMap.set(
                promptData.created_by.path,
                promptData.created_by
              );
            }
          }
        } catch (error) {
          console.error(`Error fetching prompt ${promptPath}:`, error);
        }
      }
    );

    await Promise.all(promptFetchPromises);

    // Step 4: Batch fetch all users
    const usersMap = new Map<
      string,
      { displayName: string; photoURL: string | null }
    >();

    const userFetchPromises = Array.from(userRefsMap.entries()).map(
      async ([userPath, userRef]) => {
        try {
          const userSnap = await getDoc(userRef);
          if (userSnap.exists()) {
            const userData = userSnap.data() as UserBase;
            usersMap.set(userPath, {
              displayName: userData.displayName ?? "Unknown",
              photoURL: userData.photoURL ?? null,
            });
          }
        } catch (error) {
          console.error(`Error fetching user ${userPath}:`, error);
        }
      }
    );

    await Promise.all(userFetchPromises);

    // Step 5: Construct final results
    const results: OutputWithPrompt[] = outputsData.map((outputData) => {
      let promptWithUser: PromptWithUser | null = null;

      if (outputData.prompt_id) {
        const promptData = promptsMap.get(outputData.prompt_id.path);

        if (promptData) {
          const userData = usersMap.get(promptData.created_by.path);

          promptWithUser = {
            id: promptData.id,
            title: promptData.title,
            prompt: promptData.prompt,
            tags: promptData.tags,
            category: promptData.category,
            created_at: promptData.created_at,
            created_by: {
              displayName: userData?.displayName ?? "Unknown",
              photoURL: userData?.photoURL ?? null,
            },
          };
        }
      }

      return {
        id: outputData.id,
        ai_model: outputData.ai_model,
        result: outputData.result,
        type: outputData.type,
        prompt_id: promptWithUser,
        created_by: {
          displayName: "Unknown",
          photoURL: null,
        },
      };
    });

    return results;
  } catch (err) {
    console.error("Error fetching output with prompt + user:", err);
    return [];
  }
};

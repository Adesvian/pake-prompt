import { DocumentReference, Timestamp } from "firebase/firestore";

export interface UserBase {
  uid: string;
  displayName: string;
  email: string;
  photoURL: string;
  provider: string;
  createdAt: string;
}

export interface PromptBase {
  title: string;
  prompt: string;
  tags: string[];
  category: string;
  created_at: Timestamp;
  created_by: DocumentReference;
}

export interface OutputBase {
  prompt_id: DocumentReference;
  ai_model: string;
  result: string;
  type: string;
}

export interface PromptWithUser extends Omit<PromptBase, "created_by"> {
  id: string;
  created_by: {
    displayName: string;
    photoURL: string | null;
  };
}

export interface OutputWithPrompt extends Omit<OutputBase, "prompt_id"> {
  id: string;
  prompt_id: PromptWithUser | null;
  created_by: {
    displayName: string;
    photoURL: string | null;
  };
}

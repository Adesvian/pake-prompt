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
  desc: string;
  result: string;
  type: string;
}

export interface PromptWithUser extends Omit<PromptBase, "created_by"> {
  created_by: UserBase;
}

export interface OutputWithPrompt extends Omit<OutputBase, "prompt_id"> {
  prompt_id: PromptWithUser;
}

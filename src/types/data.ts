import { DocumentReference, Timestamp } from "firebase/firestore";

export interface PromptResult {
  id: string;
  ai_model: string;
  desc: string;
  prompt_id: DocumentReference;
  result: string;
  type: "text" | "image";
}

export interface Prompt {
  id: string;
  title: string;
  prompt: string;
  category: string;
  tags: string[];
  created_at: Timestamp;
  created_by: DocumentReference;
}

export interface PromptWithOutput {
  prompt: Prompt;
  output: PromptResult | null;
}

export interface Creator {
  username: string;
  avatarUrl?: string;
}

export interface PromptResultWithPrompt
  extends Omit<PromptResult, "prompt_id"> {
  prompt_id: string | null;
  prompt_data?: Prompt;
}

import { User } from "firebase/auth";

export interface AuthContextType {
  user: User | null;
  loading: boolean;
  logout: () => Promise<void>;
}

const firebaseErrorMessages: Record<string, string> = {
  "auth/invalid-credential": "Email or Password incorrect",
  "auth/invalid-login-credentials": "Email or Password incorrect",
  "auth/user-not-found": "Account not found, register first",
  "auth/wrong-password": "Password incorrect",
  "auth/network-request-failed": "Network error, check your connection",
};

export const getFirebaseErrorMessage = (errorCode: string): string => {
  return (
    firebaseErrorMessages[errorCode] || "Something went wrong, please try again"
  );
};

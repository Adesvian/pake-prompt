// types/auth.ts or utils/firebase.ts
import { User } from "firebase/auth";

export interface AuthContextType {
  user: User | null;
  loading: boolean;
  logout: () => Promise<void>;
}

// Expanded error messages dengan lebih banyak cases
const firebaseErrorMessages: Record<string, string> = {
  // Authentication Errors
  "auth/invalid-credential": "Email or Password incorrect",
  "auth/invalid-login-credentials": "Email or Password incorrect",
  "auth/user-not-found": "Account not found, register first",
  "auth/wrong-password": "Password incorrect",
  "auth/invalid-email": "Please enter a valid email address",
  "auth/user-disabled": "This account has been disabled",
  "auth/email-already-in-use": "An account with this email already exists",
  "auth/weak-password": "Password should be at least 6 characters long",
  "auth/operation-not-allowed": "This sign-in method is not enabled",

  // Network & Connection
  "auth/network-request-failed": "Network error, check your connection",
  "auth/timeout": "Request timed out, please try again",

  // Rate Limiting
  "auth/too-many-requests": "Too many failed attempts, please try again later",

  // Popup/OAuth specific (untuk signInWithPopup)
  "auth/popup-closed-by-user": "Sign-in was cancelled, please try again",
  "auth/popup-blocked": "Pop-up blocked, please allow pop-ups and try again",
  "auth/cancelled-popup-request": "Sign-in was cancelled, please try again",
  "auth/unauthorized-domain": "This domain is not authorized for sign-in",

  // Session/Token errors
  "auth/requires-recent-login": "Please log in again to complete this action",
  "auth/user-token-expired": "Your session has expired, please sign in again",
  "auth/invalid-user-token": "Your session has expired, please sign in again",
};

export const getFirebaseErrorMessage = (errorCode: string): string => {
  return (
    firebaseErrorMessages[errorCode] || "Something went wrong, please try again"
  );
};

// Enhanced version dengan better error handling
export const getFirebaseErrorMessageSafe = (error: unknown): string => {
  // Check if it's a Firebase error with code
  if (error && typeof error === "object" && "code" in error) {
    const firebaseError = error as { code: string };
    return getFirebaseErrorMessage(firebaseError.code);
  }

  // Check if it's a regular Error with message
  if (error instanceof Error) {
    return error.message;
  }

  // Check if it's a string
  if (typeof error === "string") {
    return error;
  }

  // Fallback
  return "Something went wrong, please try again";
};

// Usage dalam catch block yang lebih type-safe
export const handleAuthError = (error: unknown): string => {
  console.error("Auth error:", error); // For debugging
  return getFirebaseErrorMessageSafe(error);
};

// Optional: Type untuk Firebase Auth Error (jika ingin lebih strict)
export interface FirebaseAuthError {
  code: string;
  message: string;
  name: string;
}

// Helper function untuk type checking
export const isFirebaseAuthError = (
  error: unknown
): error is FirebaseAuthError => {
  return (
    error !== null &&
    typeof error === "object" &&
    "code" in error &&
    "message" in error &&
    typeof (error as FirebaseAuthError).code === "string"
  );
};

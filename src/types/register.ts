export interface FormData {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  cpassword: string;
}

export type ProviderType = "google" | "github";

export interface RegisterFormProps {
  onSubmit?: (data: FormData) => Promise<void> | void;
  onProviderLogin?: (provider: ProviderType) => Promise<void>;
}

export interface FormFieldsProps {
  formData: FormData;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface SocialLoginButtonsProps {
  onProviderLogin: (provider: ProviderType) => Promise<void>;
  loading: boolean;
}

export interface LabelInputContainerProps {
  children: React.ReactNode;
  className?: string;
}

// Validation types
export interface ValidationError {
  field: keyof FormData;
  message: string;
}

export interface FormValidation {
  isValid: boolean;
  errors: ValidationError[];
}

// Auth related types
export interface AuthUser {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
}

export interface AuthError {
  code: string;
  message: string;
}

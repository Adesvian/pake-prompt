"use client";

import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
import { toast } from "sonner";
import Image from "next/image";
import Link from "next/link";
import { auth, githubProvider, googleProvider } from "@/lib/firebase/config";
import { createUser } from "@/lib/firebase/service";
import {
  getFirebaseErrorMessage,
  isFirebaseAuthError,
} from "@/types/auth-context";
import { FormFields } from "./form-fields";
import { SocialLoginButtons } from "./social-button";

export function RegisterForm() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    cpassword: "",
  });

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }, []);

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      if (formData.password !== formData.cpassword) {
        setError("Passwords do not match");
        return;
      }

      if (formData.password.length < 6) {
        setError("Password must be at least 6 characters long");
        return;
      }

      setLoading(true);
      setError("");

      try {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          formData.email,
          formData.password
        );

        // Update displayName
        await updateProfile(userCredential.user, {
          displayName: `${formData.firstname} ${formData.lastname}`,
        });

        const userWithUpdatedName = {
          ...userCredential.user,
          displayName: `${formData.firstname} ${formData.lastname}`,
        };

        await createUser(userWithUpdatedName);

        toast.success("Account created successfully!");
        router.push("/");
      } catch (err: unknown) {
        if (isFirebaseAuthError(err)) {
          setError(getFirebaseErrorMessage(err.code));
        } else {
          setError("Something went wrong, please try again");
        }
      } finally {
        setLoading(false);
      }
    },
    [formData, router]
  );

  const handleProviderLogin = useCallback(
    async (provider: "google" | "github") => {
      setLoading(true);
      setError("");

      try {
        const selectedProvider =
          provider === "google" ? googleProvider : githubProvider;
        const result = await signInWithPopup(auth, selectedProvider);
        await createUser(result.user);

        toast.success(`Welcome ${result.user.displayName}`);
      } catch (err: unknown) {
        if (isFirebaseAuthError(err)) {
          const message = getFirebaseErrorMessage(err.code);
          setError(message);
        } else {
          setError("Something went wrong, please try again");
        }
      } finally {
        setLoading(false);
      }
    },
    [router]
  );

  return (
    <>
      <Link href="/" className="block">
        <Image
          src="/logo.png"
          alt="Logo"
          width={56}
          height={56}
          className="mx-auto mb-2"
          priority
        />
      </Link>
      <h2 className="text-xl font-bold text-neutral-800 dark:text-neutral-200 text-center">
        Welcome to PakePrompt
      </h2>
      <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-300 text-center">
        Login to aceternity if you can because we don&apos;t have a login flow
        yet
      </p>

      <form className="my-8" onSubmit={handleSubmit}>
        <FormFields formData={formData} handleChange={handleChange} />

        <button
          className="group/btn relative block h-10 w-full rounded-md bg-gradient-to-br from-black to-neutral-600 font-medium text-white shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:bg-zinc-800 dark:from-zinc-900 dark:to-zinc-900 dark:shadow-[0px_1px_0px_0px_#27272a_inset,0px_-1px_0px_0px_#27272a_inset] disabled:opacity-50"
          type="submit"
          disabled={loading}
        >
          {loading ? "Signing up..." : "Sign up →"}
          <BottomGradient />
        </button>

        <div className="my-8 h-[1px] w-full bg-gradient-to-r from-transparent via-neutral-300 to-transparent dark:via-neutral-700" />

        <SocialLoginButtons
          onProviderLogin={handleProviderLogin}
          loading={loading}
        />
      </form>

      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md p-3 mt-4">
          <p className="text-red-600 dark:text-red-400 text-sm text-center">
            {error}
          </p>
        </div>
      )}
    </>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="absolute inset-x-0 -bottom-px block h-px w-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-0 transition duration-500 group-hover/btn:opacity-100" />
      <span className="absolute inset-x-10 -bottom-px mx-auto block h-px w-1/2 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-0 blur-sm transition duration-500 group-hover/btn:opacity-100" />
    </>
  );
};

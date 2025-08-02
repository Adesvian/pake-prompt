"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebase/config";
import { ImageCarousel } from "@/components/register/image-carousel";
import { RegisterForm } from "@/components/register/register-form";

export default function RegisterPage() {
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        router.push("/");
      }
    });

    return () => unsubscribe();
  }, [router]);

  return (
    <div className="flex min-h-screen">
      {/* Left Side: Image Carousel */}
      <div className="w-3/5 p-10">
        <ImageCarousel />
      </div>

      {/* Right Side: Registration Form */}
      <div className="w-2/5 shadow-input mx-auto rounded-none bg-white p-4 md:rounded-2xl md:p-8 dark:bg-black">
        <RegisterForm />
      </div>
    </div>
  );
}

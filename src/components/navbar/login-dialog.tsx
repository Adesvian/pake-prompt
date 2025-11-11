"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Eye, EyeOff } from "lucide-react";
import Image from "next/image";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, googleProvider, githubProvider } from "@/lib/firebase/config";
import { createUser } from "@/lib/firebase/service";
import { toast } from "sonner";
import {
  getFirebaseErrorMessage,
  isFirebaseAuthError,
} from "@/types/auth-context";
import Link from "next/link";
import { useIsMobile } from "@/hooks/use-mobile";

export default function LoginDialog() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [open, setOpen] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const isMobile = useIsMobile();
  if (typeof window === "undefined") return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await signInWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      await createUser(res.user);

      toast.success(`Welcome back, ${res.user.email}!`);
      setOpen(false);
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
  };

  const handleProviderLogin = async (provider: "google" | "github") => {
    setLoading(true);
    setError("");

    try {
      const selectedProvider =
        provider === "google" ? googleProvider : githubProvider;
      const result = await signInWithPopup(auth, selectedProvider);
      await createUser(result.user);

      toast.success(`Welcome ${result.user.displayName}`);
      setOpen(false);
    } catch (err: unknown) {
      console.error("Login error:", err);
      if (isFirebaseAuthError(err)) {
        const message = getFirebaseErrorMessage(err.code);
        setError(message);
      } else {
        setError("Something went wrong, please try again");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant={`${isMobile ? "outline" : "default"}`}
          className="w-full text-center"
        >
          Login
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Sign in to start creating</DialogTitle>
            <DialogDescription>
              Every great creation starts with a simple idea. Explore and build
              with PakePrompt.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="grid gap-2 relative">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={handleChange}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-8 text-muted-foreground"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {error && <p className="text-sm text-red-500">{error}</p>}
          </div>

          <DialogFooter className="gap-2 pt-4">
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Logging in..." : "Let's Go"}
            </Button>
          </DialogFooter>
        </form>
        <Separator className="" />
        <div className="mt-4 flex flex-col gap-4">
          <Button
            type="button"
            variant="outline"
            className="w-full flex gap-2"
            onClick={() => handleProviderLogin("google")}
            disabled={loading}
          >
            <Image src="/google.svg" width={20} height={20} alt="google" />
            Login with Google
          </Button>
          <Button
            type="button"
            variant="outline"
            className="w-full flex gap-2"
            onClick={() => handleProviderLogin("github")}
            disabled={loading}
          >
            <Image src="/github.svg" width={20} height={20} alt="github" />
            Login with GitHub
          </Button>
        </div>
        <span className="flex gap-2 justify-center text-sm">
          Don&apos;t have an account?{" "}
          <Link href="/register" className="underline">
            Register
          </Link>
        </span>
      </DialogContent>
    </Dialog>
  );
}

"use client";

import { useCallback, useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff } from "lucide-react";
import { LabelInputContainer } from "./label-input-container";
import { FormFieldsProps } from "@/types/register";

export function FormFields({ formData, handleChange }: FormFieldsProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [showCPassword, setShowCPassword] = useState(false);

  const togglePasswordVisibility = useCallback(() => {
    setShowPassword((prev) => !prev);
  }, []);

  const toggleCPasswordVisibility = useCallback(() => {
    setShowCPassword((prev) => !prev);
  }, []);

  return (
    <>
      <div className="mb-4 flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-6">
        <LabelInputContainer>
          <Label htmlFor="firstname">First Name</Label>
          <Input
            id="firstname"
            name="firstname"
            type="text"
            value={formData.firstname}
            onChange={handleChange}
            autoComplete="given-name"
            required
          />
        </LabelInputContainer>
        <LabelInputContainer>
          <Label htmlFor="lastname">Last Name</Label>
          <Input
            id="lastname"
            name="lastname"
            type="text"
            value={formData.lastname}
            onChange={handleChange}
            autoComplete="family-name"
            required
          />
        </LabelInputContainer>
      </div>

      <LabelInputContainer className="mb-4">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          autoComplete="email"
          required
        />
      </LabelInputContainer>

      <LabelInputContainer className="mb-4 relative">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          name="password"
          type={showPassword ? "text" : "password"}
          value={formData.password}
          onChange={handleChange}
          autoComplete="new-password"
          minLength={6}
          required
        />
        <button
          type="button"
          onClick={togglePasswordVisibility}
          className="absolute right-3 top-8 text-muted-foreground hover:text-foreground transition-colors"
          aria-label={showPassword ? "Hide password" : "Show password"}
        >
          {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
        </button>
      </LabelInputContainer>

      <LabelInputContainer className="mb-4 relative">
        <Label htmlFor="cpassword">Confirmation Password</Label>
        <Input
          id="cpassword"
          name="cpassword"
          type={showCPassword ? "text" : "password"}
          value={formData.cpassword}
          onChange={handleChange}
          autoComplete="new-password"
          minLength={6}
          required
        />
        <button
          type="button"
          onClick={toggleCPasswordVisibility}
          className="absolute right-3 top-8 text-muted-foreground hover:text-foreground transition-colors"
          aria-label={
            showCPassword
              ? "Hide confirmation password"
              : "Show confirmation password"
          }
        >
          {showCPassword ? <EyeOff size={20} /> : <Eye size={20} />}
        </button>
      </LabelInputContainer>
    </>
  );
}

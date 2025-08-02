"use client";
import React, { useState } from "react";
import { Menu } from "@/components/ui/navbar-menu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import LoginDialog from "@/components/navbar/login-dialog";
import NavbarMenuItems from "@/components/navbar/nav-menu-items";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuthContext } from "@/context/auth-context";
import Link from "next/link";

export default function Header() {
  const [active, setActive] = useState<string | null>(null);
  const { user, loading, logout } = useAuthContext();

  if (loading) return null;

  return (
    <div className="relative w-full flex items-center justify-center">
      <div className={"fixed top-2 inset-x-0 max-w-6xl mx-auto z-50"}>
        <Menu setActive={setActive}>
          <div className="flex items-center gap-2">
            <Link href="/">
              <Image
                src="/logo.png"
                alt="Logo"
                width={0}
                height={0}
                sizes="100vw"
                className="w-12 h-auto"
              />
            </Link>
          </div>

          <div className="flex gap-16 items-center justify-center">
            <NavbarMenuItems active={active} setActive={setActive} />
          </div>

          <div className="flex items-center gap-x-2">
            {!user ? (
              <LoginDialog />
            ) : (
              <>
                <Button>New post</Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <div className="cursor-pointer">
                      <Avatar>
                        <AvatarImage
                          src={user.photoURL || "https://github.com/shadcn.png"}
                          alt={user.displayName || "User"}
                        />
                        <AvatarFallback>
                          {user.displayName?.slice(0, 2).toUpperCase() || "US"}
                        </AvatarFallback>
                      </Avatar>
                    </div>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end">
                    <DropdownMenuGroup>
                      <DropdownMenuItem>Profile</DropdownMenuItem>
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={logout}>
                      <span className="text-red-500 font-semibold">
                        Log out
                      </span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            )}
          </div>
        </Menu>
      </div>
    </div>
  );
}

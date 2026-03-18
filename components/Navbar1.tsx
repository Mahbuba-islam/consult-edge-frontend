"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "./ui/button";
import ModeToggle from "./mode-toggle";
import { Menu, X } from "lucide-react";
import { LogOutButton } from "./LogOutButton";
import { authClient } from "@/lib/auth-client";
import { NavbarSearch } from "./modules/homepage/NavbarSearch";
import { SessionResponse } from "@/src/types/user.types";

export function Navbar() {
  const [open, setOpen] = useState(false);
const [session, setSession] = useState<SessionResponse | null>(null);


  useEffect(() => {
  authClient.getSession().then((res) => {
    setSession(res.data || null);
  });
}, []);


  const mentorHubMenu = [
    { title: "Home", url: "/" },
    { title: "Find Tutors", url: "/tutors" },
    { title: "Become a Tutor", url: "/signup" },
    { title: "All Tutors", url: "/tutors" },
    { title: "About", url: "/about" },
  ];

  if (session) {
    mentorHubMenu.push({ title: "Dashboard", url: "/dashboard" });
  }

  return (
    <header className="w-full border-b bg-background">
      <div
        className="
          container mx-auto 
          flex flex-col gap-4 
          md:flex-col 
          lg:flex-row lg:items-center lg:justify-between 
          px-6 py-4
        "
      >
        {/* LOGO */}
        <div className="flex items-center justify-between lg:justify-start">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl font-extrabold tracking-tight bg-linear-to-r from-[#5624D0] to-[#b00ea5] bg-clip-text text-transparent">
              MentorHub
            </span>
          </Link>

          {/* Mobile Hamburger */}
          <button
            className="lg:hidden"
            onClick={() => setOpen(!open)}
          >
            {open ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>

        {/* SEARCHBAR */}
        <div className="w-full lg:w-auto">
          <NavbarSearch />
        </div>

        {/* DESKTOP MENU */}
        <nav className="hidden lg:flex items-center gap-6">
          {mentorHubMenu.map((item) => (
            <Link
              key={item.title}
              href={item.url}
              className="text-sm font-medium relative group"
            >
              <span className="group-hover:text-[#9a24d0] transition-colors duration-200">
                {item.title}
              </span>

              <span
                className="
                  absolute left-0 -bottom-1 h-0.5 w-0
                  bg-[#8e24d0] group-hover:w-full transition-all duration-300
                "
              ></span>
            </Link>
          ))}
        </nav>

        {/* DESKTOP RIGHT SIDE */}
        <div className="hidden lg:flex items-center gap-3">
          <ModeToggle />

          {!session && (
            <>
              <Button
                asChild
                variant="outline"
                size="sm"
                className="border border-violet-700"
              >
                <Link href="/login">Login</Link>
              </Button>
              <Button asChild size="sm" className="bg-violet-600">
                <Link href="/signup">Sign Up</Link>
              </Button>
            </>
          )}

          {session && <LogOutButton />}
        </div>
      </div>

      {/* MOBILE MENU */}
      {open && (
        <div className="lg:hidden border-t bg-background">
          <div className="flex flex-col gap-4 px-6 py-4">
            {mentorHubMenu.map((item) => (
              <Link
                key={item.title}
                href={item.url}
                className="text-base font-medium"
                onClick={() => setOpen(false)}
              >
                {item.title}
              </Link>
            ))}

            <div className="flex flex-col gap-3 pt-2">
              <ModeToggle />

              {!session && (
                <>
                  <Button asChild variant="outline" size="sm" className="w-full">
                    <Link href="/login">Login</Link>
                  </Button>
                  <Button asChild size="sm" className="w-full">
                    <Link href="/signup">Sign Up</Link>
                  </Button>
                </>
              )}

              {session && <LogOutButton />}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
"use client";

import Link from "next/link";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { Code2, Play } from "lucide-react";

export function Header() {
  return (
    <nav className="relative z-10 flex items-center justify-between px-6 lg:px-12 py-5 max-w-7xl mx-auto">
      <Link href="/" className="flex items-center gap-3 group">
        <div className="relative">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-600 flex items-center justify-center shadow-lg shadow-violet-500/25 group-hover:shadow-violet-500/40 transition-shadow">
            <Code2 className="w-5 h-5 text-white" />
          </div>
          <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center">
            <Play className="w-2 h-2 text-white fill-white" />
          </div>
        </div>
        <div className="flex flex-col">
          <span className="font-bold text-lg tracking-tight leading-none">
            SONNY
          </span>
          <span className="text-[10px] uppercase tracking-[0.2em] text-zinc-500">
            Academy
          </span>
        </div>
      </Link>

      <div className="hidden md:flex items-center gap-8 text-sm text-zinc-400">
        <Link
          href="#courses"
          className="hover:text-white transition-colors duration-200"
        >
          Courses
        </Link>
        <Link
          href="/pricing"
          className="hover:text-white transition-colors duration-200"
        >
          Pricing
        </Link>
        <Link
          href="#testimonials"
          className="hover:text-white transition-colors duration-200"
        >
          Reviews
        </Link>
      </div>

      <div className="flex items-center gap-3">
        <SignedOut>
          <SignInButton mode="modal">
            <Button
              variant="ghost"
              className="text-zinc-400 hover:text-white hover:bg-white/5"
            >
              Sign in
            </Button>
          </SignInButton>
          <Link href="/pricing">
            <Button className="bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 text-white border-0 shadow-lg shadow-violet-600/25">
              Start Learning
            </Button>
          </Link>
        </SignedOut>
        <SignedIn>
          <Link href="/dashboard">
            <Button
              variant="ghost"
              className="text-zinc-400 hover:text-white hover:bg-white/5"
            >
              Dashboard
            </Button>
          </Link>
          <UserButton
            appearance={{
              elements: {
                avatarBox: "w-9 h-9 ring-2 ring-violet-500/20",
              },
            }}
          />
        </SignedIn>
      </div>
    </nav>
  );
}

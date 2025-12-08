"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";

export function Header() {
  const pathname = usePathname();
  return (
    <header
      className={`${
        pathname === "/verification-page" ? "hidden" : "flex"
      }  items-center justify-between px-8 py-6 bg-white border-b border-gray-200`}
    >
      <Link href="/" className="text-2xl font-bold text-black">
        PulseWrite
      </Link>
      <nav className="flex items-center gap-6">
        <Link href="/login" className="text-black hover:text-gray-600">
          Login
        </Link>
        <Button className="bg-teal-700 hover:bg-teal-800 text-white rounded-full px-6">
          Get Started
        </Button>
      </nav>
    </header>
  );
}

"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import LoginModal from "./login-modal";
import GetStartedModal from "./get-started-modal";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import EmailSignUp from "./email-sign-up";

export function Header() {
  const [getStartedOpen, setGetStartedOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [emailSignUpOpen, setEmailSignUpOpen] = useState(false);
  const pathname = usePathname();
  return (
    <header
      className={`${
        pathname === "/verification-page" ? "hidden" : "flex"
      }  items-center justify-between px-4 lg:px-8 py-6 bg-white border-b border-gray-200`}
    >
      <Link href="/" className="text-xl lg:text-2xl font-bold text-black">
        PulseWrite
      </Link>
      <nav className="flex items-center gap-2 lg:gap-6">
        <LoginModal
          open={loginOpen}
          onOpenChange={(open) => setLoginOpen(open)}
          onSwitchToRegister={() => {
            setLoginOpen(false);
            setGetStartedOpen(true);
          }}
          onSwitchToEmailSignUp={() => {
            setGetStartedOpen(false);
            setEmailSignUpOpen(true);
          }}
        />
        <EmailSignUp
          open={emailSignUpOpen}
          onOpenChange={(open) => setEmailSignUpOpen(open)}
          onSwitchToLogin={() => {
            setEmailSignUpOpen(false);
            setLoginOpen(true);
          }}
          trigger={
            <Button className="text-black hover:text-gray-600 bg-transparent hover:bg-transparent shadow-none">
              Login
            </Button>
          }
        />
        <GetStartedModal
          open={getStartedOpen}
          onOpenChange={(open) => setGetStartedOpen(open)}
          onSwitchToSignIn={() => {
            setGetStartedOpen(false);
            setLoginOpen(true);
          }}
          onSwitchToEmailSignUp={() => {
            setGetStartedOpen(false);
            setEmailSignUpOpen(true);
          }}
          trigger={
            <Button className="bg-teal-700 hover:bg-teal-800 text-white rounded-full px-4 lg:px-6 text-xs lg:text-sm ">
              Get Started
            </Button>
          }
        />
      </nav>
    </header>
  );
}

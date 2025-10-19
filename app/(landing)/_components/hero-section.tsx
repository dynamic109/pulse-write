"use client";
import Image from "next/image";
import LoginModal from "./login-modal";
import GetStartedModal from "./get-started-modal";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  const [getStartedOpen, setGetStartedOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);

  return (
    <section className="flex flex-col-reverse lg:flex-row items-center justify-between min-h-screen px-4 lg:px-6 max-w-[1280px] w-full mx-auto">
      <div className="flex-1 max-w-[375px] w-full">
        <h1 className="text-5xl lg:text-6xl font-black text-[#000000] leading-tight flex">
          Read <span className="text-[#00747D] ml-2">Boldly.</span>
        </h1>

        <h1 className="text-5xl lg:text-6xl font-black text-[#000000] leading-tight mb-6 flex">
          Write <span className="text-[#00747D] ml-2">Freely.</span>
        </h1>

        <p className="text-lg text-[#000000] mb-6">
          PulseWrite is a platform where writers publish without limits and
          readers explore ideas that matter.
        </p>

        <GetStartedModal
          open={getStartedOpen}
          onOpenChange={(open) => setGetStartedOpen(open)}
          onSwitchToSignIn={() => {
            setGetStartedOpen(false);
            setLoginOpen(true);
          }}
          trigger={
            <Button
              size="lg"
              className="bg-[#00747D] hover:bg-[#00747D]/90 text-white px-8 py-3 h-fit cursor-pointer rounded-full text-base font-semibold tracking-wide"
            >
              Start Reading
            </Button>
          }
        />
        <LoginModal
          open={loginOpen}
          onOpenChange={(open) => setLoginOpen(open)}
          onSwitchToRegister={() => {
            setLoginOpen(false);
            setGetStartedOpen(true);
          }}
        />
      </div>

      <div className="flex">
        <Image
          src={"/Group 2.svg"}
          alt="Group of avatars"
          width={760}
          height={800}
          priority
        />
      </div>
    </section>
  );
}

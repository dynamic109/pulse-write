"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface VerificationSuccessProps {
  email: string;
}

export default function VerificationSuccess({
  email,
}: VerificationSuccessProps) {
  const router = useRouter();
  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/dashboard");
    }, 3000);
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 relative">
      {/* Top bar elements */}
      <div className="absolute top-6 left-6">
        <h1 className="text-2xl font-bold text-foreground">PulseWrite</h1>
      </div>

      <div className="absolute top-6 right-6">
        <div className="flex items-center gap-2 bg-teal-700 text-white px-4 py-2 rounded-full">
          <div className="w-8 h-8 bg-teal-700 rounded-full flex items-center justify-center font-bold text-sm">
            {email.charAt(0).toUpperCase()}
          </div>
          <span className="text-sm font-medium truncate max-w-[150px]">
            {email}
          </span>
        </div>
      </div>

      {/* Success Content */}
      <div className="w-full max-w-md text-center mt-12">
        {/* Success Image */}
        <div className="flex justify-center mb-8">
          <Image
            src="/Vector.svg"
            alt="Verification Successful"
            width={240}
            height={240}
            className="object-contain"
            priority
          />
        </div>

        <h2 className="text-4xl font-bold text-foreground mb-3">
          Verification successful
        </h2>
        <p className="text-base text-foreground/70">
          OTP Verified Successfully! Your Account Is Ready
        </p>
      </div>
    </div>
  );
}

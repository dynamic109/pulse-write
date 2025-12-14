"use client";

import type React from "react";
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Loader } from "lucide-react";
import { toast } from "sonner";
import { resendCode, verify } from "../../_actions";
import VerificationSuccess from "./verification-success";

export default function OTPVerification({ email }: { email: string }) {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [loading, setLoading] = useState(false);
  const [isVerified, setIsVerified] = useState(false);

  const handleInputChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);
    if (value && index < 3) inputRefs.current[index + 1]?.focus();
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = async () => {
    const code = otp.join("");
    try {
      if (email && code.length === 4) {
        setLoading(true);
        await verify(code, email);
        setIsVerified(true);
      }
    } catch (error: any) {
      const errorMsg = error?.message;
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    setOtp(["", "", "", ""]);
    inputRefs.current[0]?.focus();
    try {
      if (email) {
        setLoading(true);
        await resendCode(email);
        toast.success("Check your mail for verification code!");
      }
    } catch (error: any) {
      const errorMsg = error?.message;
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  const isComplete = otp.every((digit) => digit !== "");

  return (
    <>
      {isVerified ? (
        <VerificationSuccess email={email} />
      ) : (
        <div className="flex flex-col items-center justify-center min-h-screen px-4 relative">
          {/* Header (Top Left) */}
          <div className="absolute top-6 left-6">
            <h1 className="text-2xl font-bold text-foreground">PulseWrite</h1>
          </div>

          <div className="w-full max-w-md">
            {/* Main Content */}
            <div className="text-center">
              <h2 className="text-4xl font-bold text-foreground mb-4">
                Check your email
              </h2>
              <p className="text-base text-foreground/70 mb-8">
                Please enter the 4 digit verification code we sent to your{" "}
                <br />
                <span className="font-semibold">{email}</span>
              </p>

              {/* OTP Input Fields */}
              <div className="flex gap-3 justify-center mb-6">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    ref={(el) => {
                      inputRefs.current[index] = el;
                    }}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleInputChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    className={`w-16 h-16 text-center text-2xl font-semibold border-2 rounded-lg transition-colors ${
                      digit
                        ? "border-teal-700 bg-white text-foreground"
                        : "border-gray-300 bg-white text-foreground"
                    } focus:outline-none focus:border-teal-700`}
                  />
                ))}
              </div>

              {/* Resend Link */}
              <div className="mb-6">
                <p className="text-sm text-foreground/70">
                  Didn't get a code?{" "}
                  <Button
                    onClick={handleResend}
                    className="text-teal-700 font-semibold hover:underline bg-transparent shadow-none hover:bg-transparent px-0"
                  >
                    Resend
                  </Button>
                </p>
              </div>

              {/* Verify Button */}
              <div className="space-y-4">
                <Button
                  onClick={handleVerify}
                  disabled={!isComplete || loading}
                  className="bg-[#00747D] hover:bg-[#00747D]/90 text-white px-8 py-3 h-fit w-full cursor-pointer rounded-full text-base font-semibold tracking-wide"
                >
                  {loading && <Loader className="animate-spin" />}
                  Verify
                </Button>

                {/* Back Link */}
                <button className="flex items-center justify-center gap-2 text-foreground font-semibold hover:underline mx-auto">
                  <ArrowLeft size={18} />
                  Back
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

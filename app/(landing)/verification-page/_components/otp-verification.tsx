"use client"

import type React from "react"
import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

interface OTPVerificationProps {
  email: string
  onVerificationComplete: () => void
}

export default function OTPVerification({ email, onVerificationComplete }: OTPVerificationProps) {
  const [otp, setOtp] = useState(["", "", "", ""])
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])

  const handleInputChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return
    const newOtp = [...otp]
    newOtp[index] = value.slice(-1)
    setOtp(newOtp)
    if (value && index < 3) inputRefs.current[index + 1]?.focus()
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  const handleVerify = () => {
    const code = otp.join("")
    if (code.length === 4) {
      setTimeout(() => {
        onVerificationComplete()
      }, 500)
    }
  }

  const handleResend = () => {
    setOtp(["", "", "", ""])
    inputRefs.current[0]?.focus()
  }

  const isComplete = otp.every((digit) => digit !== "")

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 relative">
      {/* Header (Top Left) */}
      <div className="absolute top-6 left-6">
        <h1 className="text-2xl font-bold text-foreground">PulseWrite</h1>
      </div>

      <div className="w-full max-w-md">
        {/* Main Content */}
        <div className="text-center">
          <h2 className="text-4xl font-bold text-foreground mb-4">Check your email</h2>
          <p className="text-base text-foreground/70 mb-8">
            Please enter the 4 digit verification code we sent to your <br />
            <span className="font-semibold">{email}</span>
          </p>

          {/* OTP Input Fields */}
          <div className="flex gap-3 justify-center mb-6">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(el) => {
                  inputRefs.current[index] = el
                }}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleInputChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className={`w-16 h-16 text-center text-2xl font-semibold border-2 rounded-lg transition-colors ${
                  digit ? "border-teal-700 bg-white text-foreground" : "border-gray-300 bg-white text-foreground"
                } focus:outline-none focus:border-teal-700`}
              />
            ))}
          </div>

          {/* Resend Link */}
          <div className="mb-6">
            <p className="text-sm text-foreground/70">
              Didn't get a code?{" "}
              <button onClick={handleResend} className="text-teal-700 font-semibold hover:underline">
                Resend
              </button>
            </p>
          </div>

          {/* Verify Button */}
          <Button
            onClick={handleVerify}
            disabled={!isComplete}
            className="w-full bg-teal-700 hover:bg-teal-800 text-white font-semibold py-3 rounded-full mb-4 disabled:opacity-50 disabled:cursor-not-allowed"
          >
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
  )
}

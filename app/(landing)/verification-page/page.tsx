"use client"

import { useState } from "react"
import OTPVerification from "./_components/otp-verification"
import VerificationSuccess from "./_components/verification-success"

export default function Home() {
  const [isVerified, setIsVerified] = useState(false)
  const [userEmail, setUserEmail] = useState("banusotobi3@gmail.com")

  const handleVerificationComplete = () => {
    setIsVerified(true)
  }

  return (
    <main className="min-h-screen bg-white">
      {!isVerified ? (
        <OTPVerification email={userEmail} onVerificationComplete={handleVerificationComplete} />
      ) : (
        <VerificationSuccess email={userEmail} />
      )}
    </main>
  )
}

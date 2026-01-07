import OTPVerification from "./_components/otp-verification";
import { getUserEmail } from "@/lib/app-services/session";

export default async function Home() {
  const userEmail = await getUserEmail();
  return (
    <main className="min-h-screen bg-white">
      <OTPVerification email={userEmail ?? ""} />
    </main>
  );
}

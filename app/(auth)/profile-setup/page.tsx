import { getSession } from "@/lib/app-services/session";
import ProfileCreateForm from "./_components/profile-create-form";
import { redirect } from "next/navigation";

export default async function Page() {
  const token = await getSession();
  
  
  // Redirect to login if no token
  if (!token) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4 py-8">
      <ProfileCreateForm token={token} />
    </div>
  );
}
"use client";

import { Feed } from "../dashboard/_components/feed";
import { ProfileCard } from "./_components/profile-card";
import Sidebar from "../dashboard/_components/sidebar";

export default function page() {
  return (
    <main className="min-h-screen bg-white text-gray-900">
      <div className="flex flex-col md:flex-row max-w-[1200px] mx-auto">
        <div className="w-full md:w-[70%] flex flex-col">
          <ProfileCard />
          <Feed />
        </div>
        <div className="w-full md:w-[30%]">
          <Sidebar />
        </div>
      </div>
    </main>
  );
}

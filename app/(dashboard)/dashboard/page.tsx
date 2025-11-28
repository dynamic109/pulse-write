"use client";

import { Feed } from "./_components/feed";
import ProfileHeader from "./_components/profile-header";
import Sidebar from "./_components/sidebar";
import Tabs from "./_components/tabs";

export default function page() {
  return (
    <main className="min-h-screen bg-white text-gray-900">
      <div className="flex flex-col md:flex-row max-w-[1200px] mx-auto">
        <div className="w-full md:w-[70%] flex flex-col">
          <Tabs />
          <Feed />
        </div>
        <div className="w-full md:w-[30%]">
          <Sidebar />
        </div>
      </div>
    </main>
  );
}

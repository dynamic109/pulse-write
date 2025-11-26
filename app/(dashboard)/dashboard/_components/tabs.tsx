"use client"
import { useState } from "react";

const tabs = ["For You", "Following", "Trending"];

export default function Tabs() {
  const [activeTab, setActiveTab] = useState("For You");

  return (
    <div className="flex  p-5 gap-4 md:gap-[10rem]   items-left border-b mx-0  md:mx-4  border-[#198989]">
      {tabs.map((tab) => (
        <button 
          key={tab}
          onClick={() => setActiveTab(tab)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition
            ${activeTab === tab
              ? "bg-cyan-100 text-gray-700"
              : "text-gray-600 hover:bg-[#55b2b8]"}`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}

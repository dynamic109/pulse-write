"use client"; 

import { useState } from "react";
import Link from "next/link";

const interests = [
  "Essays", "Poems", "Gaming", "Rants", "Sports",
  "Letters", "Deep & Reflection", "Humorous", "Romantic",
  "Spiritual", "Self Growth", "Relationships", "Money",
  "Mental Health", "Culture", "Creativity", "Daily Updates",
  "Weekly Recaps", "Trending Posts", "Food & Drink", "Art",
  "Tech", "Anime & Comics", "Science & Education", "Comedy",
  "Fashion & Style", "Anonymous Writers", "Daily Life", "Travel",
  "Fitness & Health", "Music", "Auto & Vehicle", "Beauty & Style",
  "Sex & Intimacy", "Movies", "Life Hacks", "Motivation & Advice"
];

export default function PreferencesPage() {
  const [selected, setSelected] = useState<string[]>([]);

  const toggleInterest = (interest: string) => {
    setSelected(prev =>
      prev.includes(interest) ? prev.filter(i => i !== interest) : [...prev, interest]
    );
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="w-full max-w-3xl bg-white rounded-xl shadow-sm p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-xl font-semibold">Preference Setup</h2>
          <p className="text-sm text-gray-500">Choose your interest</p>
        </div>

        {/* Interests */}
        <div className="flex flex-wrap gap-3 justify-center">
          {interests.map((interest) => (
            <button
              key={interest}
              onClick={() => toggleInterest(interest)}
              className={`px-4 py-2 rounded-full border text-sm transition ${
                selected.includes(interest)
                  ? "bg-teal-900 text-white border-teal-600"
                  : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
              }`}
            >
              {interest}
            </button>
          ))}
        </div>

        {/* Navigation */}
        <div className="flex justify-between mt-10">
          <Link
            href="/profile-setup"
            className="px-6 py-2 bg-white border border-teal-600 text-teal-600 font-medium rounded-full hover:bg-teal-600 hover:text-white transition"
          >
            Back
          </Link>

          <Link
            href="/profile/next-step" 
            className="px-6 py-2 bg-white border border-teal-600 text-teal-600 font-medium rounded-full hover:bg-teal-600 hover:text-white transition"
          >
            Next
          </Link>
        </div>
      </div>
    </div>
  );
}

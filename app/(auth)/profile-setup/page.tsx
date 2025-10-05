"use client"; 

import Link from "next/link";
import { getNames } from "country-list";
import Image from "next/image";
import { useState } from "react";

export default function ProfileCreate() {
  const [form, setForm] = useState({
    fullName: "",
    username: "",
    dob: "",
    country: "",
    bio: "",
  });
  const [country, setCountry] = useState("");
  const countries = getNames(); 
  const [value, setValue] = useState("");



  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(form);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div >
        {/* Header */}
        <div className="flex flex-col items-center">
          {/* Profile avatar */}
          <div className="relative w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center">
            <svg
              className="w-10 h-10 text-gray-400"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                fillRule="evenodd"
                d="M12 12c2.21 0 4-1.79 4-4S14.21 4 12 4 8 5.79 8 8s1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4
                 v2h16v-2c0-2.66-5.33-4-8-4z"
              />
            </svg>
            <button className="absolute bottom-0 right-0 bg-teal-600 text-white p-1 rounded-full text-xs">
             <Image
                src="/camera_icon 1.svg"
                alt="Camera"
                width={20}
                height={20}
              /> 
           </button>
          </div>
          
          <h2 className="mt-4 text-xl font-semibold">Setup Your Profile</h2>
          <p className="text-sm text-gray-500">
            Upload your profile picture{" "}
            <span className="text-teal-600">SVG, PNG, JPG, GIF</span> (max. 5MB)
          </p>
        </div>

        <div className="max-w-2xl border-t-2 mt-4 bg-white-100 p-8">
          {/* Form */}
        <form onSubmit={handleSubmit} className="mt-2 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Full Name
              </label>
          <input
            type="text"
            name="fullName"
            value={form.fullName}
            onChange={handleChange}
            placeholder="Enter your full name"
            className={`mt-1 block w-full rounded-md border px-3 py-2 focus:ring-teal-500 sm:text-sm transition-all ${
              form.fullName
                ? "bg-teal-50 text-gray-900"
                : "border-gray-300 text-gray-700"
            } focus:border-teal-600 focus:ring-teal-500`}
          />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Preferred Username
              </label>
              <input
                type="text"
                name="username"
                value={form.username}
                onChange={handleChange}
                placeholder="Enter your desired username"
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-sm"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Date of Birth
              </label>
              <input
                type="date"
                name="dob"
                value={form.dob}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Country
              </label>
              <select
                  name="country"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  className={`block w-full rounded-md border px-3 py-2 shadow-sm focus:outline-none focus:ring-1 transition-all
                   ${
                   country
                      ? "border-teal-600 text-gray-900"
                      : "border-gray-300 text-gray-500"
                  }
                   focus:border-teal-600 focus:ring-teal-500
                  `}
      >
        <option value="" disabled>
          Select your country
        </option>

        {countries.map((name) => (
          <option key={name} value={name}>
            {name}
          </option>
        ))}
      </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Bio</label>
            <textarea
              name="bio"
              value={form.bio}
              onChange={handleChange}
              rows={4}
              placeholder="Tell us about yourself"
              className="mt-1 block w-full h-[200px] rounded-md border border-gray-700 px-3 py-2 shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-sm"
            />
          </div>

          <div className="flex justify-end">
            <Link href={"/prefrence"}>
            <button
              type="submit"
              className="px-6 py-2 bg-white border border-teal-900 text-teal-600 font-medium rounded-full hover:bg-teal-600 hover:text-white transition"
            >
              Next
            </button>
            </Link>
            
          </div>
        </form>
        </div>
        
      </div>
    </div>
  );
}

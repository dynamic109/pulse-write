"use client";
import React, { useState, useEffect, useRef } from "react";
import {Bell,Search,UserRoundPen,Settings,Send,LogOut,UserPlus,EyeOff,Ban,BellOff,Menu,X} from "lucide-react";

export default function ProfileHeader() {
  const [openDropdown, setOpenDropdown] = useState<
    "profile" | "notification" | null
  >(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Toggle dropdowns
  const toggleDropdown = (type: "profile" | "notification") => {
    setOpenDropdown(openDropdown === type ? null : type);
  };

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setMobileMenuOpen((prev) => !prev);
    setOpenDropdown(null);
  };

  // Close dropdowns & mobile menu on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="w-full border-b border-[#198989] bg-white z-[200] sticky top-0">
      <div className="flex items-center justify-between px-8 py-3">
        <div className="flex items-center gap-3">
        <h3 className="text-2xl font-bold text-black whitespace-nowrap">
          PulseWrite
        </h3>

        {/* Desktop Search Bar */}
        <div className="hidden md:block w-[350px] lg:w-[600px] relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search"
            className="pl-10 pr-4 py-2 w-full rounded-full border border-[#198989] focus:outline-none focus:ring-2 focus:ring-cyan-800"
          />
        </div>
        </div>

        {/* Right Section */}
         <button
            className="md:hidden text-[#198989] hover:text-cyan-900 focus:outline-none"
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        <div ref={dropdownRef} className="hidden md:flex items-center gap-4">

          {/* Notification Icon (Desktop & Mobile) */}
          <button
            onClick={() => toggleDropdown("notification")}
            aria-label="Notifications"
            className="relative text-[#198989]  rounded-full focus:outline-none hover:text-cyan-900 transition"
          >
            <Bell className="w-6 h-6" />
          </button>

          {/* Notification Dropdown */}
          {openDropdown === "notification" && (
            <div
              className="absolute right-0 top-12 w-56 bg-white rounded-xl shadow-lg border border-gray-100 z-50 transition-all duration-200 ease-in-out animate-fade-in"
              role="menu"
            >
              <ul className="flex flex-col text-sm text-gray-700">
                {[
                  { icon: <UserPlus className="w-4 h-4" />, label: "Follow" },
                  { icon: <EyeOff className="w-4 h-4" />, label: "Not Interested" },
                  { icon: <Ban className="w-4 h-4" />, label: "Report Post" },
                  { icon: <BellOff className="w-4 h-4" />, label: "Mute" },
                ].map((item, idx) => (
                  <button
                    key={idx}
                    type="button"
                    role="menuitem"
                    className={`w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center space-x-2 ${
                      idx !== 3 ? "border-b" : ""
                    }`}
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </button>
                ))}
              </ul>
            </div>
          )}

          {/* Profile Button */}
          <button
            onClick={() => toggleDropdown("profile")}
            className="flex items-center space-x-3 focus:outline-none"
          >
            <img
              src="/profileimg/prfimg.png"
              alt="Banuso Tobi profile"
              className="rounded-full w-9 h-9 object-cover"
            />
            <div className="hidden sm:block text-sm text-gray-700 text-left">
              <p className="font-medium">Banuso Tobi</p>
              <p className="text-gray-500 text-xs truncate max-w-[150px]">
                banusotobi3@gmail.com
              </p>
            </div>
          </button>

          {/* Profile Dropdown */}
          {openDropdown === "profile" && (
            <div
              className="absolute right-0 top-12 w-56 bg-white rounded-xl shadow-lg border border-gray-100 z-50 transition-all duration-200 ease-in-out animate-fade-in"
              role="menu"
            >
              <ul className="flex flex-col text-sm text-gray-700">
                {[
                  { icon: <UserRoundPen className="w-4 h-4" />, label: "Profile" },
                  { icon: <Settings className="w-4 h-4" />, label: "Settings" },
                  { icon: <Send className="w-4 h-4" />, label: "Contact Us" },
                ].map((item, idx) => (
                  <button
                    key={idx}
                    role="menuitem"
                    className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center space-x-2 border-b"
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </button>
                ))}
                <button
                  role="menuitem"
                  className="w-full text-left px-4 py-2 hover:bg-gray-100 text-red-500 flex items-center space-x-2"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Sign Out</span>
                </button>
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-gray-200 bg-white px-4 py-3 animate-fade-in">
          <div className="relative mb-3">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search"
              className="pl-10 pr-4 py-2 w-full rounded-full border border-[#198989] focus:outline-none focus:ring-2 focus:ring-cyan-800"
            />
          </div>

          <ul className="flex flex-col space-y-2 text-sm text-gray-700">
            <button className="flex items-center space-x-2 hover:bg-gray-100 px-3 py-2 rounded-md">
              <UserRoundPen className="w-4 h-4" />
              <span>Profile</span>
            </button>
            <button className="flex items-center space-x-2 hover:bg-gray-100 px-3 py-2 rounded-md">
              <Settings className="w-4 h-4" />
              <span>Settings</span>
            </button>
            <button className="flex items-center space-x-2 hover:bg-gray-100 px-3 py-2 rounded-md">
              <Send className="w-4 h-4" />
              <span>Contact Us</span>
            </button>
            <button className="flex items-center space-x-2 text-red-500 hover:bg-gray-100 px-3 py-2 rounded-md">
              <LogOut className="w-4 h-4" />
              <span>Sign Out</span>
            </button>
          </ul>
        </div>
      )}
    </header>
  );
}

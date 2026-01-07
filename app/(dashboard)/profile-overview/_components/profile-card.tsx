"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, CalendarDays, MapPin } from "lucide-react";

export function ProfileCard() {
  const [isFollowing, setIsFollowing] = useState(false);

  return (
    <div className="w-full mt-6 px-4">
      <div className="flex items-start justify-between">
        <div className="relative w-20 h-20 rounded-full overflow-hidden border-4 border-white shadow-lg flex-shrink-0">
          <Image
            src="/Ellipse 30.svg"
            alt="Victor's profile picture"
            fill
            className="object-cover"
            priority
          />
        </div>

        <div className="flex gap-3 mt-6 sm:mt-10 md:mt-12 px-4 sm:px-8 md:px-10">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full hover:bg-gray-200 dark:hover:bg-gray-800"
              >
                <MoreHorizontal className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end">
              <DropdownMenuItem>Report</DropdownMenuItem>
              <DropdownMenuItem>Block</DropdownMenuItem>
              <DropdownMenuItem>Mute</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button
            onClick={() => setIsFollowing(!isFollowing)}
            className={`rounded-full px-4 sm:px-6 text-sm sm:text-base font-semibold transition-all ${
              isFollowing
                ? "bg-gray-200 text-gray-900 hover:bg-gray-300"
                : "bg-teal-700 text-white hover:bg-teal-800"
            }`}
          >
            {isFollowing ? "Following" : "Follow"}
          </Button>
        </div>
      </div>

      <div className="mt-4 space-y-1 sm:space-y-2">
        <h1 className="text-xl sm:text-2xl font-bold text-foreground">Victor</h1>

        <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
          Charitoō | Frontend developer at LUXNET | Lead @Techiesgrowth | Another
          Day To Be 1% Better | Sponsored by God
        </p>

        <div className="flex flex-col sm:flex-row sm:flex-wrap items-start sm:items-center gap-3 sm:gap-6 text-sm text-muted-foreground mt-2">

          <div className="flex items-center gap-2">
            <MapPin size={16} className="text-muted-foreground" />
            <span>Lagos, Nigeria</span>
          </div>

          <div className="flex items-center gap-2">
            <CalendarDays size={16} className="text-muted-foreground" />
            <span>PulseWrite member since December 2024</span>
          </div>
        </div>
      </div>

      <div className="flex gap-6 text-sm mt-3">
        <button className="hover:underline group">
          <span className="font-bold text-foreground group-hover:text-teal-700">
            403
          </span>
          <span className="text-muted-foreground ml-1">Following</span>
        </button>

        <button className="hover:underline group">
          <span className="font-bold text-foreground group-hover:text-teal-700">
            273.9k
          </span>
          <span className="text-muted-foreground ml-1">Followers</span>
        </button>
      </div>

      <div className="px-10 mt-5 font-semibold hover:text-teal-700 cursor-pointer">
        <p>Post</p>
      </div>
      <div className="border-t mt-5 border-teal-700" />
    </div>
  );
}

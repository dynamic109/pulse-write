"use client"

import Link from "next/link"
import { Facebook, X } from "lucide-react"

export function Footer() {
  return (
    <footer className="flex items-center justify-between px-8 py-8 bg-white border-t border-gray-200 mt-16">
      <Link href="/" className="text-xl font-bold text-black">
        PulseWrite
      </Link>
      <nav className="flex items-center gap-8">
        <Link href="/about-us" className="text-black hover:text-gray-600">
          About Us
        </Link>
        <Link href="/contact" className="text-black hover:text-gray-600">
          Contact Us
        </Link>
        <Link href="/privacy" className="text-black hover:text-gray-600">
          Privacy Policy
        </Link>
      </nav>
      <div className="flex items-center gap-4">
        <Link href="https://facebook.com" target="_blank" rel="noopener noreferrer">
          <Facebook className="w-6 h-6 text-black hover:text-gray-600" />
        </Link>
        <Link href="https://twitter.com" target="_blank" rel="noopener noreferrer">
          <X className="w-6 h-6 text-black hover:text-gray-600" />
        </Link>
      </div>
    </footer>
  )
}

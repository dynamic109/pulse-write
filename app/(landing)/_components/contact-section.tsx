"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

export function ContactSection() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  return (
    <section className="max-w-[1280px] mx-auto w-full py-20 px-4 lg:px-6">
      <div className="max-w-[590px] mx-auto text-">
        <h2 className="text-4xl lg:text-[56px] font-bold text-[#000000] mb-6">
          Let's Talk
        </h2>

        <p className="text-lg text-[#000000] mb-12 max-w-md">
          Got a question, feedback, collaboration, idea? We'd to hear from you
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              required
              placeholder="Full Name"
              value={formData.fullName}
              onChange={(e) => handleInputChange("fullName", e.target.value)}
              className="px-4 py-2.5 lg:py-3.5 h-fit text-base border-2 border-[#A4A4A5] rounded-lg focus:border-[#00747D] focus-visible:ring-[0px] shadow-none"
            />
            <Input
              required
              type="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              className="px-4 py-2.5 lg:py-3.5 h-fit text-base border-2 border-[#A4A4A5] rounded-lg focus:border-[#00747D] focus-visible:ring-[0px] shadow-none"
            />
          </div>

          <Select
            required
            onValueChange={(value) => handleInputChange("subject", value)}
          >
            <SelectTrigger className="py-5.5 lg:py-6 h-fit px-4 text-base border-2 border-[#A4A4A5] rounded-lg focus:border-[#00747D] focus-visible:ring-[0px] shadow-none w-full">
              <SelectValue
                placeholder="Subject"
                className="data-[placeholder]:text-[#A4A4A5] text-[#A4A4A5]"
              />
            </SelectTrigger>
            <SelectContent className="bg-gray-50">
              <SelectItem value="general">General Inquiry</SelectItem>
              <SelectItem value="feedback">Feedback</SelectItem>
              <SelectItem value="collaboration">Collaboration</SelectItem>
              <SelectItem value="technical">Technical Support</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>

          <Textarea
            required
            placeholder="Message"
            value={formData.message}
            onChange={(e) => handleInputChange("message", e.target.value)}
            className="min-h-32 px-4 py-4 text-base border-2 border-[#A4A4A5] rounded-lg focus:border-[#00747D] focus-visible:ring-[0px] shadow-none resize-none"
            rows={6}
          />

          <Button
            type="submit"
            size="lg"
            className="bg-[#00747D] hover:bg-[#00747D]/90 text-white px-8 py-3 h-fit cursor-pointer rounded-full text-base font-semibold tracking-wide"
          >
            Send Message
          </Button>
        </form>
      </div>
    </section>
  );
}

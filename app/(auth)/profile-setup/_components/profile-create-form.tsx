"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getNames } from "country-list";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";  
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,   
  SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { X, Camera } from "lucide-react";

interface ProfileCreateFormProps {
  token: string;
}

interface FormData {
  fullName: string;
  username: string;
  dob: string;
  country: string;
  bio: string;
}

interface FormErrors {
  [key: string]: string;
}

export default function ProfileCreateForm({ token }: ProfileCreateFormProps) {
  const router = useRouter();
  const countries = getNames();

  const [form, setForm] = useState<FormData>({
    fullName: "",
    username: "",
    dob: "", 
    country: "",
    bio: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string>("");

  // Cleanup image preview URL on unmount or when image changes
  useEffect(() => {
    return () => {
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      setErrors({ ...errors, profilePicture: "Image must be less than 5MB" });
      return;
    }

    const validTypes = [
      "image/svg+xml",
      "image/png",
      "image/jpeg",
      "image/jpg",
      "image/gif",
    ];
    if (!validTypes.includes(file.type)) {
      setErrors({
        ...errors,
        profilePicture: "Please upload SVG, PNG, JPG, or GIF",
      });
      return;
    }

    // Revoke old preview URL
    if (imagePreview) {
      URL.revokeObjectURL(imagePreview);
    }

    setSelectedImage(file);
    setImagePreview(URL.createObjectURL(file));
    setErrors({ ...errors, profilePicture: "" });
  };

  const removeImage = () => {
    if (imagePreview) {
      URL.revokeObjectURL(imagePreview);
    }
    setSelectedImage(null);
    setImagePreview("");
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!form.fullName.trim()) {
      newErrors.fullName = "Full Name is required";
    } else if (form.fullName.trim().length < 2) {
      newErrors.fullName = "Full Name must be at least 2 characters";
    }

    if (!form.username.trim()) {
      newErrors.username = "Username is required";
    } else if (!/^[a-zA-Z0-9_]{3,20}$/.test(form.username)) {
      newErrors.username =
        "Username must be 3-20 characters (letters, numbers, underscore only)";
    }

    if (!form.dob) {
      newErrors.dob = "Date of Birth is required";
    } else {
      const age = new Date().getFullYear() - new Date(form.dob).getFullYear();
      if (age < 13) {
        newErrors.dob = "You must be at least 13 years old";
      } else if (age > 120) {
        newErrors.dob = "Please enter a valid date of birth";
      }
    }

    if (!form.country) {
      newErrors.country = "Country is required";
    }

    if (form.bio.length > 500) {
      newErrors.bio = "Bio must be less than 500 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    setSubmitError("");

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const formData = new FormData();
      formData.append("fullName", form.fullName.trim());
      formData.append("username", form.username.trim());
      formData.append("dob", form.dob);
      formData.append("country", form.country);
      formData.append("bio", form.bio.trim());

      if (selectedImage) {
        formData.append("profilePicture", selectedImage);
      }

      const response = await fetch(
        "https://pulse-write-backend.vercel.app/api/users/profile",
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.message || `Server error: ${response.status}`
        );
      }

      const data = await response.json();
      console.log("Profile created successfully:", data);

      router.push("/prefrence");
    } catch (error) {
      console.error("Profile creation error:", error);
      setSubmitError(
        error instanceof Error
          ? error.message
          : "Failed to create profile. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4 py-8">
      <div className="w-full max-w-2xl">

        {/* PROFILE IMAGE */}
        <div className="flex flex-col items-center">
          <div className="relative">
            {imagePreview && (
              <button
                type="button"
                onClick={removeImage}
                className="absolute -top-2 -right-4 -translate-x-1/2 bg-red-600 text-white p-1.5 rounded-full hover:bg-red-700 shadow-md z-10"
              >
                <X className="h-4 w-4" />
              </button>
            )}

            <Avatar className="w-24 h-24">
              <AvatarImage
                src={imagePreview || undefined}
                alt="Profile picture"
                className="object-cover"
              />

              <AvatarFallback className="bg-gray-100 text-gray-400">
                <svg
                  className="w-10 h-10"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    fillRule="evenodd"
                    d="M12 12c2.21 0 4-1.79 4-4S14.21 4 12 4 8 5.79 8 8s1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"
                  />
                </svg>
              </AvatarFallback>
            </Avatar>

            <input
              type="file"
              id="profilePic"
              className="hidden"
              onChange={handleImageChange}
            />

            <label
              htmlFor="profilePic"
              className="absolute bottom-0 right-0 bg-teal-600 text-white p-2 rounded-full cursor-pointer hover:bg-teal-700"
            >
              📷
            </label>
          </div>

          <h2 className="mt-4 text-2xl font-semibold text-gray-900">
            Setup Your Profile
          </h2>

          <p className="text-sm text-gray-500 text-center">
            Upload your profile picture{" "}
            <span className="text-teal-600 font-medium">SVG, PNG, JPG,</span>{" "}
            (max. 2MB)
          </p>

          {errors.profilePicture && (
            <p className="text-red-500 text-sm mt-1">{errors.profilePicture}</p>
          )}
        </div>

        {/* FORM */}
        <div className="mt-8 border-t pt-8">
          {submitError && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md mb-6">
              {submitError}
            </div>
          )}

          {/* NAME */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-7 mb-6">
            <div>
              <Label htmlFor="fullName">
                Full Name <span className="text-red-500">*</span>
              </Label>
              <Input
                id="fullName"
                name="fullName"
                value={form.fullName}
                onChange={handleChange}
                className={`mt-1 ${
                  errors.fullName
                    ? "border-red-500 focus-visible:ring-red-500"
                    : form.fullName
                    ? "border-teal-600 bg-teal-50 focus-visible:ring-teal-500"
                    : "border-gray-300 focus-visible:ring-teal-500"
                }`}
              />
              {errors.fullName && (
                <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>
              )}
            </div>

            <div>
              <Label htmlFor="username">
                Preferred Username <span className="text-red-500">*</span>
              </Label>
              <Input
                id="username"
                name="username"
                value={form.username}
                onChange={handleChange}
                className={`mt-1 ${
                  errors.username
                    ? "border-red-500 focus-visible:ring-red-500"
                    : form.username
                    ? "border-teal-600 bg-teal-50 focus-visible:ring-teal-500"
                    : "border-gray-300 focus-visible:ring-teal-500"
                }`}
              />
              {errors.username && (
                <p className="text-red-500 text-sm mt-1">{errors.username}</p>
              )}
            </div>
          </div>

          {/* DOB + COUNTRY */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-7 mb-6">
            <div>
              <Label htmlFor="dob">
                Date of Birth <span className="text-red-500">*</span>
              </Label>
              <Input
                type="date"
                id="dob"
                name="dob"
                value={form.dob}
                onChange={handleChange}
                max={new Date().toISOString().split("T")[0]}
                className={`mt-1 text ${
                  errors.dob
                    ? "border-red-500 focus-visible:ring-red-500"
                    : form.dob
                    ? "border-teal-600 bg-teal-50 focus-visible:ring-teal-500"
                    : "border-gray-300 focus-visible:ring-teal-500"
                }`}
              />
              {errors.dob && (
                <p className="text-red-500 text-sm mt-1">{errors.dob}</p>
              )}
            </div>

            <div>
              <Label>
                Country <span className="text-red-500">*</span>
              </Label>
              <Select
                value={form.country}
                onValueChange={(value) =>
                  handleChange({
                    target: { name: "country", value },
                  } as any)
                }
              >
                <SelectTrigger
                  className={`mt-1 ${
                    errors.country
                      ? "border-red-500 focus:ring-red-500"
                      : form.country
                      ? "border-teal-600 bg-teal-50 focus:ring-teal-500"
                      : "border-gray-300 text-gray-500 focus:ring-teal-500"
                  }`}
                >
                  <SelectValue placeholder="Select your country" />
                </SelectTrigger>

                <SelectContent>
                  {countries.map((c) => (
                    <SelectItem key={c} value={c}>
                      {c}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {errors.country && (
                <p className="text-red-500 text-sm mt-1">{errors.country}</p>
              )}
            </div>
          </div>

          {/* BIO */}
          <div className="mb-6">
            <Label htmlFor="bio">
              Bio{" "}
              <span className="text-gray-500 text-xs ml-2">
                ({form.bio.length}/500)
              </span>
            </Label>
            <Textarea
              id="bio"
              name="bio"
              rows={4}
              maxLength={500}
              value={form.bio}
              onChange={handleChange}
              className={`mt-1 resize-none ${
                errors.bio
                  ? "border-red-500 focus-visible:ring-red-500"
                  : form.bio
                  ? "border-teal-600 bg-teal-50 focus-visible:ring-teal-500"
                  : "border-gray-300 focus-visible:ring-teal-500"
              }`}
            />
            {errors.bio && (
              <p className="text-red-500 text-sm mt-1">{errors.bio}</p>
            )}
          </div>

          {/* SUBMIT */}
          <div className="flex justify-end pt-4">
            <Button
              variant="outline"
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="px-8 py-2.5 rounded-full border-teal-600 text-teal-600 hover:bg-teal-600 hover:text-white"
            >
              {isSubmitting ? "Submitting..." : "Next"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

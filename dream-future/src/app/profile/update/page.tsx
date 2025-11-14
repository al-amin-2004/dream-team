"use client";

import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import ProfilePageTitle from "../_components/ProfilePagesTitle";
import Input from "@/app/_components/ui/Input";
import { Button } from "@/app/_components/ui/Button";
import Image from "next/image";
import { Camera } from "lucide-react";
import { toast } from "sonner";
import { useUser } from "@/providers/UserContext";

interface formDataTypes {
  firstName: string;
  lastName: string;
  phone: string;
  blood: string;
  nationality: string;
  gender: string;
  address: string;
  dateOfBirth: string;
  profilePic: File | string | null;
}

const Settings = () => {
  const { user, refreshUser } = useUser();
  const [loading, setLoading] = useState<boolean>(false);
  const [formData, setFormData] = useState<formDataTypes>({
    firstName: "",
    lastName: "",
    phone: "",
    blood: "",
    nationality: "",
    gender: "",
    address: "",
    dateOfBirth: "",
    profilePic: null as File | null,
  });

  useEffect(() => {
    if (user) {
      setFormData({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        phone: user.phone || "",
        blood: user.blood || "",
        nationality: user.nationality || "",
        gender: user.gender || "",
        address: user.address || "",
        dateOfBirth: user.birthday || "",
        profilePic: user.avatar || null,
      });
    }
  }, [user]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, files } = e.target as HTMLInputElement;

    if (files) {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    let uploadedImageUrl =
      typeof formData.profilePic === "string" ? formData.profilePic : "";

    try {
      if (formData.profilePic && formData.profilePic instanceof File) {
        const imgForm = new FormData();
        imgForm.append("file", formData.profilePic);

        const res = await fetch("/api/cloudinaryUpload", {
          method: "POST",
          body: imgForm,
        });

        const uploadData = await res.json();

        if (uploadData.success) {
          uploadedImageUrl = uploadData.result.secure_url;
        }
      }

      const res = await fetch("/api/user/update", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          birthday: formData.dateOfBirth,
          avatar: uploadedImageUrl,
        }),
      });

      if (!res.ok) throw new Error("Failed to update User");

      refreshUser();
      toast.success("Profile updated successfully!");
    } catch (error) {
      console.error("Update Error:", error);
      toast.error("Failed to update User!");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="space-y-12">
      <ProfilePageTitle
        title="Settings"
        description="Showing your all histories with a clear view."
      />

      <div className="max-w-9/12 mx-auto">
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Profile Picture */}
          <div className="relative w-fit">
            <div className="size-42 mb-2 rounded-full overflow-hidden border-2 border-gray-300">
              {formData.profilePic ? (
                <Image
                  src={
                    typeof formData.profilePic === "string"
                      ? formData.profilePic
                      : URL.createObjectURL(formData.profilePic)
                  }
                  width={500}
                  height={500}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              ) : user?.avatar ? (
                <Image
                  src={user?.avatar}
                  width={500}
                  height={500}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div>No Image</div>
              )}
            </div>

            <label
              htmlFor="avatar-upload"
              className="absolute bottom-2 right-2 p-1.5 bg-[#797777] ring-4 ring-background text-primary rounded-full cursor-pointer"
            >
              <Camera className="size-5" />
            </label>
            <input
              type="file"
              id="avatar-upload"
              name="profilePic"
              accept="image/*"
              onChange={handleChange}
              className="hidden"
            />
          </div>

          {/* First & Last Name */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-200 mb-1">First Name</label>
              <Input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="block text-gray-200 mb-1">Last Name</label>
              <Input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Phone & Blood Group */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-200 mb-1">Phone Number</label>
              <Input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="block text-gray-200 mb-1">Blood Group</label>
              <select
                name="blood"
                value={formData.blood}
                onChange={handleChange}
                className="w-full p-2 border rounded-md bg-background"
              >
                <option value="">Select</option>
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
              </select>
            </div>
          </div>

          {/* Nationality & Gender */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block mb-1">Nationality</label>
              <Input
                type="text"
                name="nationality"
                value={formData.nationality}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="block text-gray-200 mb-1">Gender</label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="w-full p-2 bg-background border rounded-md"
              >
                <option value="">Select</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>

          {/* Address */}
          <div>
            <label className="block text-gray-200 mb-1">Address</label>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              rows={3}
              className="w-full p-2 border rounded-md "
            />
          </div>

          {/* Date of Birth */}
          <div>
            <label className="block text-gray-200 mb-1">Date of Birth</label>
            <Input
              type="date"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleChange}
            />
          </div>

          {/* Submit Button */}
          <Button type="submit" className="w-full rounded hover:translate-0">
            Update Profile
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Settings;

"use client";

import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import Image from "next/image";
import ProfilePageTitle from "../_components/ProfilePagesTitle";
import Input from "@/app/_components/ui/Input";
import { Button } from "@/app/_components/ui/Button";
import { Camera } from "lucide-react";
import { Loading1 } from "@/icons";
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
  birthday: string;
  profilePic: File | string | null;
  avatarId?: string;
}

const Settings = () => {
  const { user, refreshUser } = useUser();
  const [loading, setLoading] = useState<boolean>(false);
  const [initialData, setInitialData] = useState<formDataTypes | null>(null);
  const [isDisabled, setIsDisabled] = useState<boolean>(true);
  const [formData, setFormData] = useState<formDataTypes>({
    firstName: "",
    lastName: "",
    phone: "",
    blood: "",
    nationality: "",
    gender: "",
    address: "",
    birthday: "",
    profilePic: null as File | null,
    avatarId: "",
  });

  useEffect(() => {
    if (user) {
      const data = {
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        phone: user.phone || "",
        blood: user.blood || "",
        nationality: user.nationality || "",
        gender: user.gender || "",
        address: user.address || "",
        birthday: user.birthday || "",
        profilePic: user.avatar || null,
        avatarId: user.avatarId || "",
      };

      setFormData(data);
      setInitialData(data);
    }
  }, [user]);

  useEffect(() => {
    if (!initialData) return;

    const isChanged =
      formData.firstName !== initialData.firstName ||
      formData.lastName !== initialData.lastName ||
      formData.phone !== initialData.phone ||
      formData.blood !== initialData.blood ||
      formData.nationality !== initialData.nationality ||
      formData.gender !== initialData.gender ||
      formData.address !== initialData.address ||
      formData.birthday !== initialData.birthday ||
      formData.profilePic !== initialData.profilePic;

    setIsDisabled(!isChanged);
  }, [formData, initialData]);

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

    let uploadedPublicId = formData.avatarId || "";

    try {
      if (formData.profilePic && formData.profilePic instanceof File) {
        const imgForm = new FormData();
        imgForm.append("file", formData.profilePic);

        if (formData.avatarId) {
          imgForm.append("oldPublicId", formData.avatarId);
        }

        const res = await fetch("/api/cloudinaryUpload", {
          method: "POST",
          body: imgForm,
        });

        const uploadData = await res.json();

        if (uploadData.success) {
          uploadedImageUrl = uploadData.result.secure_url;
          uploadedPublicId = uploadData.result.public_id;
        }
      }

      const res = await fetch("/api/user/update", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          avatar: uploadedImageUrl,
          avatarId: uploadedPublicId,
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
    return (
      <div className="h-[calc(100vh-85px)] flex justify-center items-center">
        <Loading1 />
      </div>
    );
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
                  priority
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
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
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
              name="birthday"
              value={formData.birthday}
              onChange={handleChange}
            />
          </div>

          {/* Submit Button */}
          <Button
            disabled={isDisabled}
            type="submit"
            className="w-full rounded hover:translate-0"
          >
            Update Profile
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Settings;

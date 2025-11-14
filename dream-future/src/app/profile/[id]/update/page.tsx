"use client";

import { ChangeEvent, FormEvent, useState } from "react";
import ProfilePageTitle from "../_components/ProfilePagesTitle";
import Input from "@/app/_components/ui/Input";
import { Button } from "@/app/_components/ui/Button";
import Image from "next/image";

const Settings = () => {
  // await new Promise((r) => setTimeout(r, 3000));
  // throw new Error("lakjsdkaj f asf a")
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    bloodGroup: "",
    nationality: "",
    gender: "",
    address: "",
    dateOfBirth: "",
    profilePic: null as File | null,
  });

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

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log("Form Data:", formData);
    // এখানে তোমার API call বা update logic যাবে
  };
  return (
    <div className="space-y-12">
      <ProfilePageTitle
        title="Settings"
        description="Showing your all histories with a clear view."
      />

      <div className="max-w-10/12 mx-auto p-6 rounded-lg shadow-md">
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Profile Picture */}
          <div className="flex flex-col items-center">
            <div className="size-42 mb-2 rounded-full overflow-hidden border-2 border-gray-300">
              {formData.profilePic ? (
                <Image
                  src={URL.createObjectURL(formData.profilePic)}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-200 dark:bg-gray-600 text-gray-500">
                  No Image
                </div>
              )}
            </div>
            <input
              type="file"
              name="profilePic"
              accept="image/*"
              onChange={handleChange}
              className="text-sm text-gray-700 dark:text-gray-200"
            />
          </div>

          {/* First & Last Name */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 dark:text-gray-200 mb-1">
                First Name
              </label>
              <Input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="block text-gray-700 dark:text-gray-200 mb-1">
                Last Name
              </label>
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
              <label className="block text-gray-700 dark:text-gray-200 mb-1">
                Phone Number
              </label>
              <Input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="block text-gray-700 dark:text-gray-200 mb-1">
                Blood Group
              </label>
              <select
                name="bloodGroup"
                value={formData.bloodGroup}
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
              <label className="block text-gray-700 dark:text-gray-200 mb-1">
                Gender
              </label>
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
            <label className="block text-gray-700 dark:text-gray-200 mb-1">
              Address
            </label>
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
            <label className="block text-gray-700 dark:text-gray-200 mb-1">
              Date of Birth
            </label>
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

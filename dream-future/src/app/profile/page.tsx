"use client";

import Image from "next/image";
import { toast } from "sonner";
import ProfilePagesTitle from "./_components/ProfilePagesTitle";
import { useUser } from "@/providers/UserContext";
import UserDetailsList from "./_components/UserDetailsList";

const Profile = () => {
  const { user, loading } = useUser();

  if (loading)
    return <p className="text-center text-red-500 text-5xl">Loading...</p>;

  if (!user) {
    toast.error("No user data found!");
    return;
  }

  const {
    firstName,
    lastName,
    username,
    email,
    phone,
    avatar,
    gender,
    birthday,
    address,
    diposite,
    profit,
    blood,
    nationality,
  } = user;

  return (
    <div className="space-y-12">
      <ProfilePagesTitle
        title="Profile"
        description="View all your profile details here."
      />

      <div className="flex gap-8">
        <div className="flex-2 border-2 p-6 rounded-xl flex flex-col items-center">
          <h1 className="text-4xl font-semibold">{`${firstName} ${lastName}`}</h1>
          <p className="text-primary mb-5">{username}</p>
          <div className="size-99 border-18 rounded-full overflow-hidden flex justify-center items-center">
            {avatar ? (
              <Image
                src={avatar}
                width={500}
                height={500}
                priority
                alt="User Profile Page"
              />
            ) : (
              <span className="text-[10rem]">
                {firstName.slice(0, 1) + lastName?.slice(0, 1)}
              </span>
            )}
          </div>
        </div>

        {/* Top right side */}
        <div className="flex-3 flex flex-col gap-8 ">
          <div className="border-2 p-6 rounded-xl">
            <div className="flex justify-between py-3 border-b">
              <h1 className="text-xl font-semibold">Balance quiry</h1>
              <div className="size-4 text-green-500 relative">
                <span className="absolute inset-0 bg-current rounded-full opacity-50 animate-ping"></span>
                <span className="absolute inset-0.5 bg-current rounded-full"></span>
              </div>
            </div>

            <div className="w-full flex gap-4 mt-6">
              <div className="p-3 space-y-2.5 rounded-xl flex-1 bg-yellow-500/30">
                <h3 className="text-sm text-yellow-500">Total Diposite</h3>
                <p className="text-2xl font-bold">$ {diposite}.00</p>
              </div>
              <div className="p-3 space-y-2.5 rounded-xl flex-1 bg-green-500/20">
                <h3 className="text-sm text-green-500">Profit</h3>
                <p className="text-2xl font-bold">$ {profit}.00</p>
              </div>
              <div className="p-3 space-y-2.5 rounded-xl flex-1 bg-blue-500/20">
                <h3 className="text-sm text-blue-500">Total Balance</h3>
                <p className="text-2xl font-bold">$ {diposite + profit}.00</p>
              </div>
            </div>
          </div>

          <div className="border-2 p-6 rounded-xl flex-3">
            <h1 className="text-xl font-semibold py-3 border-b">
              Bio & others details
            </h1>

            <ul className="grid grid-cols-2 pt-3">
              <UserDetailsList label="Email" value={email} />
              <UserDetailsList label="Phone" value={phone} />
              <UserDetailsList label="Date of Birth" value={birthday} />
              <UserDetailsList label="Gender" value={gender} />
              <UserDetailsList label="Blood" value={blood} />
              <UserDetailsList label="Nationality" value={nationality} />
              <UserDetailsList
                label="Address"
                value={address}
                className="col-start-1 col-end-3"
              />
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;

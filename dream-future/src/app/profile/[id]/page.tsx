import Image from "next/image";
import ProfilePagesTitle from "./_components/ProfilePagesTitle";

const Profile = () => {
  return (
    <div className="space-y-12">
      <ProfilePagesTitle
        title="Profile"
        description="View all your profile details here."
      />

      <div className="flex gap-8">
        <div className="flex-2 border-2 p-6 rounded-xl flex flex-col items-center">
          <h1 className="text-4xl font-semibold">Srotosini Mahima</h1>
          <p className="text-primary mb-5">srotosini@2036</p>
          <Image
            src="/photo.jpg"
            width={500}
            height={500}
            alt="User Profile Page"
            className="size-99 border-18 rounded-full"
          />
        </div>

        <div className="border-2 p-6 rounded-xl flex-3">
          <div className="flex justify-between py-3 border-b">
            <h1 className="text-xl font-semibold">Bio & others details</h1>
            <span className="size-2.5 bg-green-500 rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;

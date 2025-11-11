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

        {/* Top right side */}
        <div className="flex-3 flex flex-col gap-8 ">
          <div className="border-2 p-6 rounded-xl">
            <div className="flex justify-between py-3 border-b">
              <h1 className="text-xl font-semibold">Balance quiry</h1>
              <span className="size-2.5 bg-green-500 rounded-full" />
            </div>

            <div className="w-full flex gap-4 mt-6">
              <div className="p-3 space-y-2.5 rounded-xl flex-1 bg-yellow-500/30">
                <h3 className="text-sm text-yellow-500">Total Diposite</h3>
                <p className="text-2xl font-bold">$ 1400</p>
              </div>
              <div className="p-3 space-y-2.5 rounded-xl flex-1 bg-green-500/20">
                <h3 className="text-sm text-green-500">Profit</h3>
                <p className="text-2xl font-bold">$ 400</p>
              </div>
              <div className="p-3 space-y-2.5 rounded-xl flex-1 bg-blue-500/20">
                <h3 className="text-sm text-blue-500">Total Balance</h3>
                <p className="text-2xl font-bold">$ 1800</p>
              </div>
            </div>
          </div>

          <div className="border-2 p-6 rounded-xl flex-3">
            <h1 className="text-xl font-semibold py-3 border-b">
              Bio & others details
            </h1>

            <div>
              <h1>Email: example00@gmail.com</h1>
              <h1>Phone: +880 1609 305655</h1>
              <h1>Phone: +880 1609 305655</h1>
              <h1>Nationality: Bangladeshi</h1>
              <h1>Blood: AB+</h1>
              <h1>Role: Member</h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;

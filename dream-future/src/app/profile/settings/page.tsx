import ProfilePageTitle from "@/app/_components/ui/PagesTitle";

const Settings = () => {
  // await new Promise((r) => setTimeout(r, 3000));
  // throw new Error("lakjsdkaj f asf a")
  return (
    <div className="space-y-12">
      {/* ================= PAGE TITLE COMPONENT ================= */}
      <ProfilePageTitle
        title="Settings"
        description="Showing your all histories with a clear view."
      />

      <h1 className="text-4xl text-primary font-medium text-center animate-pulse">
        Comming soon
      </h1>
    </div>
  );
};

export default Settings;

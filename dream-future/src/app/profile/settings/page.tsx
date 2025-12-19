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
    </div>
  );
};

export default Settings;

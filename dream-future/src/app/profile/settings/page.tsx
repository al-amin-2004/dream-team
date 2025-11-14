import ProfilePageTitle from "../_components/ProfilePagesTitle";

const Settings = () => {
  // await new Promise((r) => setTimeout(r, 3000));
  // throw new Error("lakjsdkaj f asf a")
  return (
    <div className="space-y-12">
      <ProfilePageTitle
        title="Settings"
        description="Showing your all histories with a clear view."
      />
    </div>
  );
};

export default Settings;

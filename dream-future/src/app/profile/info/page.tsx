import ProfilePageTitle from "@/app/_components/ui/PagesTitle";

const Info = () => {
  return (
    <div className="space-y-12">
      {/* ================= PAGE TITLE COMPONENT ================= */}
      <ProfilePageTitle
        title="Info"
        description="Showing your all histories with a clear view."
      />

      <h1 className="text-4xl text-primary font-medium text-center animate-pulse">
        Comming soon
      </h1>
    </div>
  );
};

export default Info;

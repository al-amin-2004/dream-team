import { FC } from "react";

type ProfilePagesTitleProps = {
  title: string;
  description?: string;
};

const ProfilePagesTitle: FC<ProfilePagesTitleProps> = ({
  title,
  description,
}) => {
  return (
    <div className="py-3.5 border-b-2 border-dashed">
      <div className="flex gap-2 items-center">
        <div className="w-2 rounded-full bg-primary h-10 mb-1" />
        <h1 className="text-5xl font-semibold mb-2.5">{title}</h1>
      </div>

      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  );
};

export default ProfilePagesTitle;

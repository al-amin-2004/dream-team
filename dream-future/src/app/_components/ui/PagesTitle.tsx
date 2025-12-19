import { FC, ReactNode } from "react";

type ProfilePagesTitleProps = {
  title: string;
  description?: string;
  children?: ReactNode;
};

const ProfilePagesTitle: FC<ProfilePagesTitleProps> = ({
  title,
  description,
  children,
}) => {
  return (
    <div className="py-2.5 md:py-3.5 border-b-2 border-dashed flex justify-between items-center">
      <div>
        <h1 className="text-3xl md:text-4xl font-bold mb-2.5 ps-3.5 relative before:absolute before:content-[''] before:w-2 before:h-10/12 before:top-4/7 before:left-0 before:bg-primary before:rounded-full before:-translate-y-1/2">
          {title}
        </h1>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
      <div>{children}</div>
    </div>
  );
};

export default ProfilePagesTitle;

import { FC, ReactNode } from "react";
import Image from "next/image";
import { DiamondIcon, KingIcon } from "@/icons";
import { cn } from "@/lib/utils";
import logo from "@/../public/logos/dream-future-logo-white.png";

interface StageProps {
  className?: string;
  children?: ReactNode;
}
interface StageItemProps {
  position: number;
  image?: string;
  name: string;
  totalStone: number;
}
const Stage: FC<StageProps> = ({ className, children }) => {
  return (
    <div className={cn("h-44 grid grid-cols-3 grid-rows-6", className)}>
      {children}
    </div>
  );
};

const StageItem: FC<StageItemProps> = ({
  position,
  image,
  name,
  totalStone,
}) => {
  return (
    <div
      className={cn("row-end-7 rounded-t-lg p-1 bg-gray-600/50", {
        "bg-gray-900/90": position === 1,
        "bg-gray-800/50": position === 2,
      })}
      style={{ gridRowStart: `${position}` }}
    >
      <div
        className={cn("flex flex-col items-center -translate-y-2/6 gap-2", {
          "gap-1": position === 3,
        })}
      >
        <div className="size-8/12 relative">
          <KingIcon
            className={`size-12 absolute bottom-full left-1/2 -translate-x-1/2 mb-1 ${
              position === 1 ? "block" : "hidden"
            }
            `}
          />

          <div
            className={cn(
              "w-16 mx-auto rounded-full overflow-hidden border-2",
              {
                "border-orange-400": position === 1,
                "border-sky-500 scale-90": position === 2,
                "border-green-500 scale-75": position === 3,
              }
            )}
          >
            <Image
              src={
                image
                  ? `https://drive.google.com/uc?export=view&id=${image}`
                  : logo
              }
              fill
              priority
              alt="leaderboard Image"
            />
          </div>
        </div>
        <h3 className="text-xs text-center font-medium">{name}</h3>
        <span
          className={cn(
            "flex gap-1 items-center font-medium bg-white/30 px-2 rounded-full text-green-400",
            {
              "text-orange-400": position === 1,
              "text-sky-400": position === 2,
            }
          )}
        >
          <DiamondIcon className="size-3.5" />
          {totalStone}
        </span>
        <h2
          className={cn("font-medium italic text-4xl", {
            "text-7xl": position === 1,
            "text-5xl": position === 2,
          })}
        >
          {position}
        </h2>
      </div>
    </div>
  );
};

export { Stage, StageItem };

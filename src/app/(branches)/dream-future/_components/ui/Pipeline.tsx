import { cn } from "@/lib/utils";
import { FC } from "react";

interface PipelineProps {
  className?: string;
  color?: string;
}

const Pipeline: FC<PipelineProps> = ({ className, color }) => {
  return (
    <div
      style={
        color
          ? {
              background: `linear-gradient(to left, transparent, ${color}, transparent)`,
            }
          : undefined
      }
      className={cn(
        "md:w-3/4 h-0.5 mx-auto",
        {
          "bg-linear-to-l from-transparent via-primary to-transparent": !color,
        },
        className
      )}
    />
  );
};

export default Pipeline;

import React, { MouseEventHandler, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ButtonTypes {
  className?: string;
  children: ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

export const Button: React.FC<ButtonTypes> = ({
  children,
  className,
  onClick,
  ...props
}) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "px-4 py-1.5 rounded-full text-sm font-semibold font-heading cursor-pointer text-text bg-primary hover:bg-[#E6AC00] hover:translate-x-0.5 transition-all duration-300 ease-in-out",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};

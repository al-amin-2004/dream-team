import React, { MouseEventHandler, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ButtonProps {
  className?: string;
  children: ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  className,
  onClick,
  ...props
}) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "text-sm font-semibold text-nowrap text-black bg-primary hover:bg-[#E6AC00] px-4 py-1.5 rounded-full items-center inline-flex hover:translate-x-0.5 transition-all duration-300 ease-in-out cursor-pointer",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};

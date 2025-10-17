import { IconSvgProps } from "@/types";
import { FC } from "react";

export const BarsIcon: FC<IconSvgProps> = (className) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlSpace="preserve"
      width={24}
      height={24}
      viewBox="0 0 1792 1792"
      {...className}
    >
      <path d="M1673.9 1363.2c0 52.3-42.4 94.3-94.3 94.3H212.7c-52.3 0-94.3-42.4-94.3-94.3 0-52.3 42.4-94.3 94.3-94.3h1366.8c52-.4 94.4 42 94.4 94.3M1673.9 895.6c0 52.3-42.4 94.3-94.3 94.3H659c-52.3 0-94.3-42.4-94.3-94.3 0-52.3 42.4-94.3 94.3-94.3h920.6c51.9-.5 94.3 41.9 94.3 94.3M1673.9 427.9c0 52.3-42.4 94.3-94.3 94.3H212.7c-52.3 0-94.3-42.4-94.3-94.3 0-52.3 42.4-94.3 94.3-94.3h1366.8c52-.4 94.4 42 94.4 94.3" />
    </svg>
  );
};

export const TimesIcon: FC<IconSvgProps> = (className) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      fill="none"
      viewBox="0 0 24 24"
      {...className}
    >
      <g stroke="" strokeLinecap="round" strokeWidth={2}>
        <path d="M6 18 18 6M18 18 6 6" />
      </g>
    </svg>
  );
};

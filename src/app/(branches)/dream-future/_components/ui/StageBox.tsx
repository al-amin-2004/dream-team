import { CSSProperties, FC } from "react";
import Image from "next/image";

interface StageBoxProps {
  position: number;
  name: string;
  image?: string;
}

type CSSVariables = CSSProperties & { "--size"?: string };

const getBoxSize = (position: number) => {
  switch (position) {
    case 1:
      return "21rem";
    case 2:
      return "17rem";
    case 3:
      return "15rem";
    default:
      return "10rem";
  }
};

const Box3D: FC<StageBoxProps> = ({ position, name, image }) => {
  const style: CSSVariables = {
    "--size": getBoxSize(position),
  };

  return (
    <div style={style}>
      <div
        className={`relative size-[var(--size)] -rotate-x-[15deg] transform-3d perspective-midrange`}
      >
        <div className="size-7/12 mx-auto bg-white/40 overflow-hidden rounded-lg -mb-3">
          <Image
            src={image ? image : "/logos/dream-future-logo-white.png"}
            width={500}
            height={500}
            alt="leaderboard Image"
            className="w-full"
          />
        </div>

        {/* top side  */}
        <div
          className="topside absolute size-full transform-3d bg-linear-to-b from-[#161A29] to-[transparent]"
          style={{
            transform: "rotateX(95deg) translateZ(calc(var(--size) * 0.45))",
          }}
        ></div>

        {/* Around side  */}
        <div className="size-full transform-3d">
          <div
            className="absolute top-0 left-0 size-full bg-linear-to-b from-[#161A29] via-[transparent] to-[transparent]"
            style={{ transform: "translateZ(calc(var(--size) * 0.48))" }}
          >
            <h1
              className={`text-center md:font-medium border-b border-slate-300 py-2 ${
                position === 1
                  ? "text-3xl"
                  : position === 2
                  ? "text-2xl"
                  : position === 3 && "text-lg"
              }`}
            >
              {name}
            </h1>

            <div className="flex justify-center items-center">
              {position === 1 ? (
                <Image
                  src="/leaderboard-1.png"
                  width={500}
                  height={500}
                  alt="leaderboard Number Image"
                  className="w-5/12 p-2"
                />
              ) : (
                <b className="text-7xl italic">
                  {position === 2 ? `${position}nd` : `${position}rd`}
                </b>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Box3D;

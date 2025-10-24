import Image from "next/image";
import { FC } from "react";

interface Box3DProps {
  position: number;
  name: string;
  img?: string;
}

const Box3D: FC<Box3DProps> = ({ position, name, img }) => {
  return (
    <div
      style={{
        "--size": `${
          position === 1
            ? "21rem"
            : position === 2
            ? "17rem"
            : position === 3
            ? "15rem"
            : "12rem"
        }`,
      }}
    >
      <div
        className={`relative size-[var(--size)] -rotate-x-[15deg] transform-3d perspective-midrange`}
      >
        <div className="size-7/12 mx-auto bg-white/40 overflow-hidden rounded-2xl -mb-3">
          <Image
            // src={`https://drive.google.com/uc?export=view&id=${img}`}
            src={""}
            width={500}
            height={500}
            alt="leaderboard Image"
            className="w-full"
          />
        </div>

        {/* top side  */}
        <div
          className="topside absolute size-full transform-3d  bg-linear-to-b from-[#fde04c] dark:from-[#161A29] to-[transparent]"
          style={{
            transform: "rotateX(95deg) translateZ(calc(var(--size) * 0.45))",
          }}
        ></div>

        {/* Around side  */}
        <div className="size-full transform-3d">
          <div
            className="absolute top-0 left-0 size-full bg-linear-to-b from-[#fde04c] dark:from-[#161A29] via-[transparent] to-[transparent]"
            style={{ transform: "translateZ(calc(var(--size) * 0.48))" }}
          >
            <h1
              className={`text-center text-text dark:text-dark-text md:font-medium border-b border-slate-300 py-2 ${
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
                  src="/images/leaderboard-1.png"
                  width={500}
                  height={500}
                  alt="leaderboard Number Image"
                  className="w-6/12 p-2"
                />
              ) : (
                <b className="text-7xl text-dark-text-secondary italic">
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

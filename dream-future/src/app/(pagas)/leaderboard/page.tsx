import Logo from "@/../public/logos/dream-future-logo-white.png";
import { Stage, StageItem } from "../../_components/ui/Stage";
import Pipeline from "../../_components/ui/Pipeline";
import Box3D from "../../_components/ui/StageBox";
import { DiamondIcon } from "@/icons";
import Image from "next/image";

const leaderboard = async () => {
  return (
    <>
      <div
        className="absolute -z-50 h-100 md:h-200 w-full top-0 -mt-5 md:-mt-10"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(251, 191, 36, 0.18), transparent 75%)",
        }}
      />

      <div className="container">
        <section>
          {/* Leaderboard Stage for Pc */}
          <div className="hidden lg:flex justify-center items-center gap-28 h-[calc(100vh-20rem)]">
            <Box3D position={2} name={"AL AMIN"} />
            <Box3D position={1} name={"MD MONIRUL ISLAM"} />
            <Box3D position={3} name={"ABRARUL HASAN SAJIB"} />
          </div>

          {/* Leaderboard Stage for Mobile */}
          <div className={"mt-30 block lg:hidden"}>
            <Stage>
              <StageItem position={2} name="Al amin" totalStone={203} />
              <StageItem position={1} name="Al amin" totalStone={203} />
              <StageItem position={3} name="Al amin" totalStone={203} />
            </Stage>
          </div>
        </section>

        <Pipeline className="my-10" />

        <table className="w-full">
          <caption className="caption-bottom my-5">
            Thank you all members 💖💖
          </caption>
          <thead>
            <tr className="[&>th]:py-3 [&>th]:px-1.5 [&>th]:last:text-right  text-left border-b-2 text-primary">
              <th className="w-10 md:w-30">Rank</th>
              <th>User Name</th>
              <th className="w-10 md:w-20">Stone</th>
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: 50 }).map((_, idx) => (
              <tr
                key={idx}
                className="[&>td]:first:rounded-tl-sm [&>td]:first:rounded-bl-sm [&>td]:last:rounded-tr-sm [&>td]:last:rounded-br-sm [&>td]:py-1.5 [&>td]:first:ps-2 [&>td]:last:pe-2 md:[&>td]:py-2 md:[&>td]:first:ps-3 md:[&>td]:last:pe-3 [&>td]:last:text-right even:bg-[#1d2130] text-sm md:text-base"
              >
                <td>{idx + 1}</td>
                <td>
                  <span className="inline-flex items-center gap-1.5 md:gap-3">
                    <Image
                      src={
                        false
                          ? `https://drive.google.com/uc?export=view&id=${""}`
                          : Logo
                      }
                      width={500}
                      height={500}
                      priority={false}
                      placeholder="blur"
                      blurDataURL=""
                      alt="profile Image"
                      className="size-7 md:size-9 rounded-full overflow-hidden"
                    />
                    <p>Al amin</p>
                  </span>
                </td>
                <td>
                  <span className="inline-flex items-center justify-center gap-1 px-2 rounded-full bg-gray-200/20">
                    <DiamondIcon className="size-4" />
                    <p>00</p>
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};
export default leaderboard;

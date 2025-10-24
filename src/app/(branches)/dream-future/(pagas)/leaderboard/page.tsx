import { DiamondIcon } from "@/icons";
import Image from "next/image";
import Box3D from "../../_components/ui/Box";

const leaderboard = async () => {
  return (
    <>
      <div
        className="absolute -z-50 h-[50rem] w-full top-0 -mt-5 md:-mt-10"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(251, 191, 36, 0.25), transparent 70%)",
        }}
      />

      <div className="container">
        <section>
          <div className="flex justify-center items-center gap-[7rem] h-[calc(100vh-20rem)]">
            <Box3D
              position={2}
              name={"AL AMIN"}
              img={"/logos/dream-future-logo-white.png"}
            />
            <Box3D
              position={1}
              name={"MD MONIRUL ISLAM"}
              img={"/logos/dream-future-logo-white.png"}
            />
            <Box3D
              position={3}
              name={"ABRARUL HASAN SAJIB"}
              img={"/logos/dream-future-logo-white.png"}
            />
          </div>
        </section>

        <table className="w-full">
          <thead>
            <tr className="border-b-2 text-primary">
              <th className="p-2.5 text-left w-30">Rank</th>
              <th className="p-2.5 text-left w-auto">User Name</th>
              <th className="p-2.5 text-right w-20">Stone</th>
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: 50 }).map((_, idx) => (
              <tr
                key={idx}
                className="even:bg-[#1d2130] [&>td]:first:rounded-tl-sm [&>td]:first:rounded-bl-sm [&>td]:last:rounded-tr-sm [&>td]:last:rounded-br-sm text-sm md:text-base rounded-2xl overflow-hidden"
              >
                <td className="p-2">{idx + 1}</td>
                <td className="p-2">
                  <span className="inline-flex items-center gap-3">
                    <Image
                      src={
                        false
                          ? `https://drive.google.com/uc?export=view&id=${""}`
                          : "/logos/dream-future-logo-white.png"
                      }
                      width={500}
                      height={500}
                      alt="profile Image"
                      className="size-7 md:size-9 rounded-full overflow-hidden"
                    />
                    <p>Al amin</p>
                  </span>
                </td>
                <td className="p-2 text-right">
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

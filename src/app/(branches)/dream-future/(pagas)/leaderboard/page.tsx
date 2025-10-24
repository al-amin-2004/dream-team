import { DiamondIcon } from "@/icons";

const leaderboard = async () => {
  return (
    <main className="px-2.5 md:px-0 mb-10">
      <div className="container">
        


        <table className="w-full">
          <thead>
            <tr className="border-b-2 text-primary">
              <th className="p-2.5 text-left w-20">Rank</th>
              <th className="p-2.5 text-left w-auto">Name</th>
              <th className="p-2.5 text-right w-20">Stone</th>
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: 50 }).map((_, idx) => (
              <tr
                key={idx}
                className="even:bg-white/20 [&>td]:first:rounded-tl-sm [&>td]:first:rounded-bl-sm [&>td]:last:rounded-tr-sm [&>td]:last:rounded-br-sm text-sm md:text-base rounded-2xl overflow-hidden"
              >
                <td className="p-2.5">{idx + 1}</td>
                <td className="p-2.5">Al amin</td>
                <td className="p-2.5 text-right">
                  <span className="inline-flex px-2 items-center justify-center gap-1 rounded-full bg-gray-200/20">
                    <DiamondIcon className="size-4" />
                    <p>00</p>
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
};
export default leaderboard;

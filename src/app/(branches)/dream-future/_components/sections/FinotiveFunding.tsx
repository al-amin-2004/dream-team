import { FC } from "react";
import { CountingNumber } from "@/components/ui/CountingNumber";

interface FinotiveFundingTypes {
  id: string;
  number: number;
  before?: string;
  after?: string;
  desc?: string;
}
const data: FinotiveFundingTypes[] = [
  {
    id: "1",
    number: 20,
    after: "a+",
    desc: "Active Member",
  },
  {
    id: "2",
    number: 150,
    after: "a+",
    desc: "Trusted By Company",
  },
  {
    id: "3",
    before: "$",
    number: 7000,
    after: "M+",
    desc: "Our Target",
  },
];

const FinotiveFunding: FC = () => {
  return (
    <div className="md:w-[75%] mx-auto flex flex-col md:flex-row justify-between items-center gap-6 px-4 pt- pb-10 md:py-10 font-heading">
      {data.map(({ id, before, number, after, desc }) => (
        <div
          key={id}
          className="w-full md:flex flex-wrap text-center items-center justify-center gap-2 border-primary border-2 md:border-0 rounded-lg px-5 py-1 md:p-0"
        >
          <h2 className="text-3xl md:text-5xl font-semibold md:font-bold text-text">
            <CountingNumber
              number={number}
              inView
              transition={{ duration: 3000 }}
              className={`after:content-['${after}'] before:content-['${before}']`}
            />
          </h2>
          <p className="font-medium text-xl md:text-2xl text-primary text-nowrap">
            {desc}
          </p>
        </div>
      ))}
    </div>
  );
};

export default FinotiveFunding;

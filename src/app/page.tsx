import Link from "next/link";
import { Button } from "./(branches)/dream-future/_components/ui/Button";

export default function Home() {
  const divitions = [
    { label: "Dream Future", link: "dream-future" },
    { label: "Dream Shop", link: "dream-shop" },
    { label: "Dream Foundation", link: "dream-foundation" },
  ];
  return (
    <div className="h-screen flex flex-col justify-center items-center gap-y-12">
      <h1 className="text-4xl sm:text-5xl md:text-6xl font-medium text-primary">
        Dream - Team
      </h1>

      <div className="flex gap-5">
        {divitions.map(({ label, link }, idx) => (
          <Link key={idx} href={link}>
            <Button variant={"outline"} className="text-white">{label}</Button>
          </Link>
        ))}
      </div>
    </div>
  );
}

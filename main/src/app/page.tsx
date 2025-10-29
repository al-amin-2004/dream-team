import Link from "next/link";

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
            <button className="text-white px-3 py-1.5 rounded-full ring ring-primary cursor-pointer">
              {label}
            </button>
          </Link>
        ))}
      </div>
    </div>
  );
}

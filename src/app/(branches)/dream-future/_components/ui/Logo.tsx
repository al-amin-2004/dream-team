import Image from "next/image";
import Link from "next/link";

export const Logo = () => {
  return (
    <Link href="/">
      <div className="flex items-center gap-2 cursor-pointer">
        <Image
          src="/logos/dream-future-logo-white.png"
          width={400}
          height={400}
          alt="Dream-Future Logo"
          className="w-12 md:w-14"
        />

        <h1 className="hidden md:block text-2xl font-bold">
          Dream <span className="text-primary">Future</span>
        </h1>
      </div>
    </Link>
  );
};

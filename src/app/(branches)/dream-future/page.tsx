import Hero from "./_components/sections/Hero";
import Header from "./_components/shared/Header";

export default function Page() {
  return (
    <>
      <div
        className="absolute w-full h-[60rem] -z-50 top-0"
        style={{
          backgroundImage: `radial-gradient(circle at 15% 30%, rgba(255, 191, 0, 0.06) 0, transparent 40%)`,
        }}
      />
      <Header />
      <Hero />
    </>
  );
}

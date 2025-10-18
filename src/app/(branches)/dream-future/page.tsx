import Hero from "./_components/sections/Hero";
import Header from "./_components/shared/Header";

export default function Page() {
  return (
    <>
      <Header />
      <Hero />
      <div className="h-screen flex justify-center items-center text-3xl sm:text-5xl md:text-6xl font-medium text-[#FFBF00]">
        Hello Dream future!
      </div>
    </>
  );
}

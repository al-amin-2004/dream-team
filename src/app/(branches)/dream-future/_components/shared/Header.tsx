"use client";

import { useState } from "react";
import Link from "next/link";
import { Logo } from "../ui/Logo";
import { Button } from "../ui/Button";

const Navlist = [
  { link: "leaderboard", label: "Leaderboard" },
  { link: "about", label: "About us" },
  { link: "contact", label: "Contact us" },
];

const Header = () => {
  const [navOpen, setNavOpen] = useState(false);
  return (
    <header className="sticky top-0 mt-5 md:mt-10 z-50">
      <div className="relative w-11/12 md:w-10/12 mx-auto p-0.5 px-2 md:p-3 rounded-md backdrop-blur-md bg-slate-300/10 flex justify-between items-center">
        <Logo />

        <div>
          <Button className="hidden md:flex items-center gap-0.5">
            My Profile
          </Button>

          <ul
            className={`absolute md:static w-full md:w-auto top-full left-0 p-1 rounded-b-md bg-red-400 md:bg-transparent md:flex items-center gap-5 transition-all duration-300`}
          >
            {Navlist.map((list) => (
              <li key={list.link} onClick={() => setNavOpen(false)}>
                <Link
                  href={`/dream-future/${list.link}`}
                  className="block px-2 py-1 text-[15px] text-white hover:text-[#FFBF00] hover:bg-[#FFBF00]/10 rounded-sm transition-all duration-300 cursor-pointer"
                >
                  {list.label}
                </Link>
              </li>
            ))}
          </ul>

          <div
            className="md:hidden hover:bg-white/10 rounded-full p-1.5 cursor-pointer"
            onClick={() => setNavOpen(!navOpen)}
          >
            {navOpen ? "X" : "Y"}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

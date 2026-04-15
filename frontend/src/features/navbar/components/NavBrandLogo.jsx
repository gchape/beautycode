import { Link } from "react-router";

export const NavBrandLogo = () => (
  <Link to="/" className="flex flex-col items-center leading-none group">
    <span
      className="font-script text-2xl md:text-3xl italic text-taupe-700
                     group-hover:text-taupe-900 transition-colors duration-200"
    >
      BeautyCode
    </span>
    <span className="font-label text-[10px] tracking-[0.3em] uppercase text-taupe-400 hidden md:block">
      სილამაზის კოდი
    </span>
  </Link>
);

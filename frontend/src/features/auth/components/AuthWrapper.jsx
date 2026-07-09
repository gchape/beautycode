import { Link } from "react-router";
import { AuthTestimonial } from "./AuthTestimonial";

export const AuthWrapper = ({ children, imageSrc }) => (
  <div className="min-h-screen flex bg-[#fdf6f2]">
    {/* Left panel */}
    <div className="hidden lg:flex lg:w-[46%] relative overflow-hidden">
      {imageSrc && (
        <img
          src={imageSrc}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
        />
      )}
      <div className="absolute inset-0 bg-[#c08060]/50" />

      <div className="relative z-10 flex flex-col justify-end px-12 py-14 w-full">
        <h1 className="font-script text-5xl italic text-white leading-none">
          BeautyCode
        </h1>
        <p className="mt-2 text-xs tracking-[0.3em] uppercase text-white/60">
          სილამაზის კოდი
        </p>

        <AuthTestimonial
          fullname="ნინო გ."
          review="BeautyCode-მა სრულიად შეცვალა ჩემი ყოველდღიური მოვლის რუტინა. ხარისხი გამორჩეულია."
        />
      </div>
    </div>

    {/* Right panel */}
    <div className="flex-1 flex flex-col items-center justify-center px-6 py-12 sm:px-12 lg:px-16">
      <Link to="/" className="lg:hidden block text-center mb-10">
        <span className="font-script text-4xl italic text-taupe-700">
          BeautyCode
        </span>
      </Link>
      <div className="w-full max-w-md">{children}</div>
    </div>
  </div>
);

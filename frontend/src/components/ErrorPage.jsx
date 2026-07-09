import { Link } from "react-router";

export const ErrorPage = () => (
  <div className="min-h-screen flex flex-col items-center justify-center gap-8 px-6 bg-base-200">
    <div className="flex flex-col items-center gap-1">
      <span className="font-script text-2xl italic text-taupe-700">
        BeautyCode
      </span>
      <span className="font-label text-[10px] tracking-[0.22em] uppercase text-taupe-400">
        სილამაზის კოდი
      </span>
    </div>

    <div className="badge badge-outline badge-lg font-label tracking-[0.22em] uppercase text-taupe-400">
      500
    </div>

    <div className="text-taupe-400">
      <svg
        width="56"
        height="56"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      >
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="8" x2="12" y2="12" />
        <circle cx="12" cy="16" r="0.5" fill="currentColor" />
      </svg>
    </div>

    <div className="flex flex-col items-center gap-3 text-center">
      <h1 className="font-headline text-3xl italic font-light text-taupe-800 leading-snug">
        რაღაც შეფერხება
        <br />
        მოხდა
      </h1>
      <p className="font-body text-sm text-taupe-500 leading-relaxed max-w-xs">
        დაფიქსირდა შეცდომა. გთხოვთ, სცადოთ გვერდის განახლება ან დაბრუნდეთ მთავარ
        გვერდზე.
      </p>
    </div>

    <div className="flex flex-col items-center gap-3 mt-2">
      <Link
        to="/"
        className="btn btn-outline btn-sm rounded-full font-label uppercase tracking-[0.2em]"
      >
        მთავარი გვერდი
      </Link>
    </div>
  </div>
);

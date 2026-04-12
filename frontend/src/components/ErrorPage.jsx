import { Link } from "react-router";

export const ErrorPage = () => (
  <div className="min-h-screen flex flex-col items-center justify-center gap-8 px-6 bg-pink-50">
    <div className="flex flex-col items-center gap-1">
      <span className="font-script text-2xl italic text-taupe-700">
        BeautyCode
      </span>
      <span className="font-label text-[10px] tracking-[0.22em] uppercase text-taupe-400">
        სილამაზის კოდი
      </span>
    </div>

    <div className="flex items-center gap-3">
      <div className="w-10 h-px bg-taupe-300" />
      <span className="font-label text-[10px] tracking-[0.22em] uppercase text-taupe-400">
        500
      </span>
      <div className="w-10 h-px bg-taupe-300" />
    </div>

    <div className="w-16 h-16 rounded-full border border-taupe-300 flex items-center justify-center text-taupe-400">
      <svg
        width="28"
        height="28"
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
        className="font-label text-xs uppercase tracking-[0.2em] px-8 py-3
                   rounded-full border border-taupe-400 text-taupe-700
                   hover:bg-pink-100 transition-colors duration-200"
      >
        მთავარი გვერდი
      </Link>
      <button
        onClick={() => window.location.reload()}
        className="font-label text-[10px] uppercase tracking-[0.18em]
                   text-taupe-400 hover:text-taupe-600 underline underline-offset-4
                   transition-colors duration-150 cursor-pointer"
      >
        გვერდის განახლება
      </button>
    </div>
  </div>
);

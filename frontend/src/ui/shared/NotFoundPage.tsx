import { Link } from "react-router";

export const NotFoundPage = () => (
  <div className="min-h-screen flex flex-col items-center justify-center gap-8 px-6 bg-base-200">
    <div className="flex flex-col items-center gap-1">
      <span className="font-script text-2xl italic text-taupe-700">
        BeautyCode
      </span>
      <span className="font-label text-[10px] tracking-[0.22em] uppercase text-taupe-400">
        სილამაზის კოდი
      </span>
    </div>

    <div className="rounded-full border border-taupe-300 px-4 py-1 font-label text-xs tracking-[0.22em] uppercase text-taupe-400">
      404
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
        <circle cx="11" cy="11" r="7" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
      </svg>
    </div>

    <div className="flex flex-col items-center gap-3 text-center">
      <h1 className="font-headline text-3xl italic font-light text-taupe-800 leading-snug">
        გვერდი
        <br />
        ვერ მოიძებნა
      </h1>
      <p className="font-body text-sm text-taupe-500 leading-relaxed max-w-xs">
        სამწუხაროდ, თქვენ მიერ მოძებნილი გვერდი არ არსებობს ან გადატანილია.
      </p>
    </div>

    <div className="flex flex-col items-center gap-3 mt-2">
      <Link
        to="/"
        className="rounded-full border border-taupe-300 px-4 py-2 font-label text-xs uppercase tracking-[0.2em] text-taupe-600 no-underline hover:bg-taupe-50"
      >
        მთავარი გვერდი
      </Link>
    </div>
  </div>
);

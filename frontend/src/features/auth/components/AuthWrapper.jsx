import { Link } from "react-router";

export const AuthWrapper = ({ children }) => (
  <div className="min-h-screen bg-pink-50 flex flex-col justify-center items-center px-6">
    <div className="w-full max-w-sm flex flex-col gap-6">
      <Link to="/" className="text-center mb-4">
        <h1 className="font-script text-5xl italic text-taupe-700 leading-snug">
          BeautyCode
        </h1>
        <p className="mt-1 text-xs tracking-widest uppercase text-taupe-500 font-medium">
          სილამაზის კოდი
        </p>
      </Link>
      {children}
    </div>
  </div>
);

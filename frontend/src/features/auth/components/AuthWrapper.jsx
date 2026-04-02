import { useNavigate } from "react-router";

export const AuthWrapper = ({ children }) => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-pink-50 flex flex-col justify-center items-center px-6">
      <div className="w-full max-w-sm flex flex-col gap-6">
        <button
          onClick={() => navigate("/")}
          className="text-center cursor-pointer mb-2"
        >
          <h1 className="font-script text-5xl italic text-taupe-700">
            BeautyCode
          </h1>
          <p className="mt-1.5 text-xs tracking-[0.22em] uppercase text-taupe-500">
            სილამაზის კოდი
          </p>
        </button>
        {children}
      </div>
    </div>
  );
};

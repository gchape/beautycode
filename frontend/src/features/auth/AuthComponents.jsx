import { useNavigate } from "react-router";

export const AuthLayout = ({ children }) => (
  <div className="min-h-screen bg-pink-50 flex flex-col justify-center items-center px-6">
    <div className="w-full max-w-sm flex flex-col gap-6">{children}</div>
  </div>
);

export const AuthLogo = () => {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => navigate("/")}
      className="text-center cursor-pointer mb-2"
    >
      <h1 className="font-script text-5xl italic text-taupe-700">BeautyCode</h1>
      <p className="mt-1.5 text-xs tracking-[0.22em] uppercase text-taupe-500">
        სილამაზის კოდი
      </p>
    </button>
  );
};

export const AuthInput = ({ label, type, placeholder, value, onChange }) => (
  <div>
    <label className="block text-xs tracking-[0.16em] uppercase text-taupe-700 mb-2">
      {label}
    </label>
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="w-full bg-transparent py-2 text-base tracking-wide text-taupe-800
                 border-b border-taupe-400 outline-none focus:border-taupe-700
                 transition-colors duration-200 placeholder:text-taupe-300"
    />
  </div>
);

export const AuthButton = ({ children }) => (
  <button
    type="submit"
    className="w-full py-3 text-sm tracking-[0.22em] font-bold uppercase text-taupe-700
               border border-taupe-500 rounded-full hover:bg-pink-100
               transition-colors duration-200 cursor-pointer mt-2"
  >
    {children}
  </button>
);

export const AuthLink = ({ label, linkText, onClick }) => (
  <p className="text-center text-sm tracking-[0.04em] text-taupe-500">
    {label}{" "}
    <button
      onClick={onClick}
      className="text-taupe-700 underline underline-offset-4 hover:text-taupe-900 transition-colors duration-150 cursor-pointer"
    >
      {linkText}
    </button>
  </p>
);

import { Link } from "react-router";

export const AuthError = ({ message }) =>
  message ? (
    <p role="alert" className="text-center text-sm text-red-400">
      {message}
    </p>
  ) : null;

export const AuthField = ({ label, name, type, placeholder, disabled }) => (
  <div>
    <label className="block text-xs tracking-[0.16em] uppercase text-taupe-700 mb-2">
      {label}
    </label>
    <input
      name={name}
      type={type}
      placeholder={placeholder}
      disabled={disabled}
      className="w-full bg-transparent py-2 text-md tracking-wide text-taupe-800
                 border-b border-taupe-400 outline-none focus:border-taupe-700
                 transition-colors duration-200 placeholder:text-taupe-300
                 disabled:opacity-50"
    />
  </div>
);

export const AuthSubmit = ({ label, loadingLabel, isSubmitting }) => (
  <button
    type="submit"
    disabled={isSubmitting}
    className="w-full py-3 text-sm tracking-[0.22em] font-bold uppercase text-taupe-700
               border border-taupe-500 rounded-full hover:bg-pink-100
               transition-colors duration-200 cursor-pointer mt-2
               disabled:opacity-50 disabled:cursor-not-allowed"
  >
    {isSubmitting ? loadingLabel : label}
  </button>
);

export const AuthFooter = ({ label, linkText, to, isSubmitting }) => (
  <p className="text-center text-sm tracking-[0.04em] text-taupe-500">
    {label}{" "}
    <Link
      to={to}
      aria-disabled={isSubmitting}
      className="text-taupe-700 underline underline-offset-4 hover:text-taupe-900
                 transition-colors duration-150"
    >
      {linkText}
    </Link>
  </p>
);

export const AuthWrapper = ({ children }) => (
  <div className="min-h-screen bg-pink-50 flex flex-col justify-center items-center px-6">
    <div className="w-full max-w-sm flex flex-col gap-6">
      <Link to="/" className="text-center mb-2">
        <h1 className="font-script text-5xl italic text-taupe-700">
          BeautyCode
        </h1>
        <p className="mt-1.5 text-xs tracking-[0.22em] uppercase text-taupe-500">
          სილამაზის კოდი
        </p>
      </Link>
      {children}
    </div>
  </div>
);

import { Link } from "react-router";

export const AuthFooter = ({ label, linkText, to, isSubmitting }) => (
  <p className="text-center text-sm tracking-tight text-taupe-500 mt-4">
    {label}{" "}
    <Link
      to={to}
      aria-disabled={isSubmitting}
      className="text-taupe-700 font-semibold underline underline-offset-4 hover:text-taupe-900
                 transition-colors duration-150"
    >
      {linkText}
    </Link>
  </p>
);

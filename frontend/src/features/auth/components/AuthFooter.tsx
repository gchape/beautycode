import { Link } from "react-router";

interface AuthFooterProps {
  label: string;
  linkText: string;
  to: string;
  isSubmitting: boolean;
}

export const AuthFooter = ({
  label,
  linkText,
  to,
  isSubmitting,
}: AuthFooterProps) => (
  <p className="mt-5 text-center text-sm text-taupe-400">
    {label}{" "}
    <Link
      to={isSubmitting ? "#" : to}
      onClick={(e) => isSubmitting && e.preventDefault()}
      aria-disabled={isSubmitting}
      className="font-semibold text-taupe-700 hover:text-pink-500 underline-offset-2 hover:underline"
    >
      {linkText}
    </Link>
  </p>
);

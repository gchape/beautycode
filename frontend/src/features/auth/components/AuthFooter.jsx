import { useNavigate } from "react-router";

export const AuthFooter = ({ label, linkText, to, isSubmitting }) => {
  const navigate = useNavigate();
  return (
    <p className="text-center text-sm tracking-[0.04em] text-taupe-500">
      {label}{" "}
      <button
        onClick={() => navigate(to)}
        disabled={isSubmitting}
        className="text-taupe-700 underline underline-offset-4 hover:text-taupe-900
                   transition-colors duration-150 cursor-pointer
                   disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {linkText}
      </button>
    </p>
  );
};

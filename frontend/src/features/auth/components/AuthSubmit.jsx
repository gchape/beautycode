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

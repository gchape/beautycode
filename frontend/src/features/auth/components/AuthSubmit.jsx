export const AuthSubmit = ({ label, loadingLabel, isSubmitting }) => (
  <button
    type="submit"
    disabled={isSubmitting}
    className="w-full h-11 rounded-lg bg-[#c97352] text-sm font-medium tracking-wide text-white
               hover:bg-[#b8633f]
               disabled:opacity-50 disabled:cursor-not-allowed"
  >
    {isSubmitting ? (
      <span className="flex items-center justify-center gap-2">
        <span className="inline-block w-3.5 h-3.5 rounded-full border-2 border-white/40 border-t-white animate-spin" />
        {loadingLabel}
      </span>
    ) : (
      label
    )}
  </button>
);

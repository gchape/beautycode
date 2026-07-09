export const SectionTitle = ({ children }) => (
  <div className="flex items-center gap-4 mb-6">
    <div className="w-6 h-px bg-taupe-400" />
    <span className="text-[10px] tracking-[0.22em] uppercase text-taupe-700 font-semibold">
      {children}
    </span>
    <div className="flex-1 h-px bg-taupe-400" />
  </div>
);

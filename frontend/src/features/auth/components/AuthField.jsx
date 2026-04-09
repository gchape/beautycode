export const AuthField = ({ label, name, type, placeholder, disabled }) => (
  <div className="flex flex-col gap-1">
    <label className="block text-xs tracking-wide uppercase text-taupe-700 font-semibold">
      {label}
    </label>
    <input
      name={name}
      type={type}
      placeholder={placeholder}
      disabled={disabled}
      className="w-full bg-transparent py-2 text-base text-taupe-800
                 border-b border-taupe-400 outline-none focus:border-taupe-700
                 transition-colors duration-200 placeholder:text-taupe-400
                 disabled:opacity-50"
    />
  </div>
);

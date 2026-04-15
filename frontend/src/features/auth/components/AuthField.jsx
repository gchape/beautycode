export const AuthField = ({
  label,
  name,
  type,
  placeholder,
  disabled,
  autoComplete,
}) => (
  <div className="flex flex-col gap-1.5">
    <label
      htmlFor={name}
      className="text-xs font-medium uppercase tracking-widest text-taupe-500"
    >
      {label}
    </label>
    <input
      required
      id={name}
      name={name}
      type={type}
      placeholder={placeholder}
      disabled={disabled}
      autoComplete={autoComplete}
      className="h-11 w-full rounded-lg border border-taupe-200 bg-white px-3 text-sm text-taupe-800 outline-none
                 placeholder:text-taupe-300
                 focus:border-pink-400 focus:ring-1 focus:ring-pink-300
                 disabled:opacity-50 disabled:cursor-not-allowed"
    />
  </div>
);

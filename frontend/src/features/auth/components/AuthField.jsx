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
      className="w-full bg-transparent py-2 text-base tracking-wide text-taupe-800
                 border-b border-taupe-400 outline-none focus:border-taupe-700
                 transition-colors duration-200 placeholder:text-taupe-300
                 disabled:opacity-50"
    />
  </div>
);

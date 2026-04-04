export const ProfileAccountField = ({
  label,
  value,
  readOnly = false,
  onChange,
  type,
  name,
}) => (
  <div>
    <label className="block text-xs tracking-[0.16em] uppercase text-taupe-600 mb-2">
      {label}
    </label>
    <input
      readOnly={readOnly}
      name={name}
      type={type}
      value={value}
      onChange={onChange ?? (() => {})}
      className="w-full bg-transparent py-2 text-base font-medium tracking-wide text-taupe-800 border-b border-taupe-300 outline-none focus:border-taupe-600 transition-colors duration-200"
    />
  </div>
);

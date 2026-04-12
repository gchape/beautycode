export const ProfileAccountField = ({ label, name, type, value }) => (
  <div>
    <label className="block text-[10px] tracking-[0.2em] uppercase text-taupe-400 mb-1">
      {label}
    </label>
    <input
      name={name}
      type={type}
      value={value}
      readOnly={true}
      onChange={() => {}}
      className="w-full bg-transparent py-2 text-sm tracking-wide text-taupe-800
                 border-b border-taupe-200 outline-none focus:border-taupe-600
                 transition-colors duration-200 read-only:cursor-default"
    />
  </div>
);

export const ProfileAccountField = ({ label, name, type, value }) => (
  <div>
    <label className="block text-xs tracking-[0.16em] uppercase text-taupe-600 mb-2">
      {label}
    </label>
    <input
      name={name}
      type={type}
      value={value}
      readOnly={true}
      onChange={() => {}} // suppress React warning for controlled readOnly inputs
      className="w-full bg-transparent py-2 text-base font-medium tracking-wide text-taupe-800
                 border-b border-taupe-300 outline-none focus:border-taupe-600
                 transition-colors duration-200 read-only:cursor-default"
    />
  </div>
);

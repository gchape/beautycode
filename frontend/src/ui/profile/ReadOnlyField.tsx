import type { HTMLInputTypeAttribute } from "react";

interface ReadOnlyFieldProps {
  label: string;
  name: string;
  type: HTMLInputTypeAttribute;
  value: string;
}

export const ReadOnlyField = ({ label, name, type, value }: ReadOnlyFieldProps) => (
  <div>
    <label
      htmlFor={name}
      className="block text-[10px] tracking-[0.2em] uppercase text-taupe-400 mb-1.5"
    >
      {label}
    </label>
    <input
      id={name}
      name={name}
      type={type}
      value={value}
      readOnly
      onChange={() => {}}
      className="w-full rounded-lg border border-taupe-200 bg-transparent px-3 h-10 text-sm text-taupe-800 cursor-default"
    />
  </div>
);

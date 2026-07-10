import type { HTMLInputTypeAttribute } from "react";

interface ProfileAccountFieldProps {
  label: string;
  name: string;
  type: HTMLInputTypeAttribute;
  value: string;
}

export const ProfileAccountField = ({
  label,
  name,
  type,
  value,
}: ProfileAccountFieldProps) => (
  <fieldset className="fieldset">
    <legend className="fieldset-legend text-[10px] tracking-[0.2em] uppercase text-taupe-400">
      {label}
    </legend>
    <input
      name={name}
      type={type}
      value={value}
      readOnly
      onChange={() => {}}
      className="input input-bordered w-full bg-transparent text-sm text-taupe-800
                 border-taupe-200 focus:border-taupe-600 read-only:cursor-default"
    />
  </fieldset>
);

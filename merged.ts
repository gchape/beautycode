// ==== ./frontend/eslint.config.js ====
import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{js,jsx}'],
    extends: [
      js.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    rules: {
      'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]' }],
    },
  },
])


// ==== ./frontend/react-router.config.js ====
export default {
  future: {
    v8_middleware: true,
  },
};


// ==== ./frontend/src/components/ErrorPage.tsx ====
import { Link } from "react-router";

export const ErrorPage = () => (
  <div className="min-h-screen flex flex-col items-center justify-center gap-8 px-6 bg-base-200">
    <div className="flex flex-col items-center gap-1">
      <span className="font-script text-2xl italic text-taupe-700">
        BeautyCode
      </span>
      <span className="font-label text-[10px] tracking-[0.22em] uppercase text-taupe-400">
        სილამაზის კოდი
      </span>
    </div>

    <div className="badge badge-outline badge-lg font-label tracking-[0.22em] uppercase text-taupe-400">
      500
    </div>

    <div className="text-taupe-400">
      <svg
        width="56"
        height="56"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      >
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="8" x2="12" y2="12" />
        <circle cx="12" cy="16" r="0.5" fill="currentColor" />
      </svg>
    </div>

    <div className="flex flex-col items-center gap-3 text-center">
      <h1 className="font-headline text-3xl italic font-light text-taupe-800 leading-snug">
        რაღაც შეფერხება
        <br />
        მოხდა
      </h1>
      <p className="font-body text-sm text-taupe-500 leading-relaxed max-w-xs">
        დაფიქსირდა შეცდომა. გთხოვთ, სცადოთ გვერდის განახლება ან დაბრუნდეთ მთავარ
        გვერდზე.
      </p>
    </div>

    <div className="flex flex-col items-center gap-3 mt-2">
      <Link
        to="/"
        className="btn btn-outline btn-sm rounded-full font-label uppercase tracking-[0.2em]"
      >
        მთავარი გვერდი
      </Link>
    </div>
  </div>
);


// ==== ./frontend/src/components/icons/icons.tsx ====
interface IconProps {
  size?: number;
}

export const ArrowRightIcon = ({ size = 16 }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M16.3153 16.6681C15.9247 17.0587 15.9247 17.6918 16.3153 18.0824C16.7058 18.4729 17.339 18.4729 17.7295 18.0824L22.3951 13.4168C23.1761 12.6357 23.1761 11.3694 22.3951 10.5883L17.7266 5.9199C17.3361 5.52938 16.703 5.52938 16.3124 5.91991C15.9219 6.31043 15.9219 6.9436 16.3124 7.33412L19.9785 11.0002L2 11.0002C1.44772 11.0002 1 11.4479 1 12.0002C1 12.5524 1.44772 13.0002 2 13.0002L19.9832 13.0002L16.3153 16.6681Z"
      fill="currentColor"
    />
  </svg>
);

export const MenuIcon = ({ size = 24 }: IconProps) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    width={size}
    height={size}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M5 12H20"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <path
      d="M5 17H20"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <path
      d="M5 7H20"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

export const CloseIcon = ({ size = 24 }: IconProps) => (
  <svg
    viewBox="0 0 512 512"
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
  >
    <g>
      <g fill="currentColor" transform="translate(91.520000, 91.520000)">
        <polygon points="328.96 30.2933333 298.666667 1.42108547e-14 164.48 134.4 30.2933333 1.42108547e-14 1.42108547e-14 30.2933333 134.4 164.48 1.42108547e-14 298.666667 30.2933333 328.96 164.48 194.56 298.666667 328.96 328.96 298.666667 194.56 164.48" />
      </g>
    </g>
  </svg>
);

export const TrashIcon = ({ size = 24 }: IconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 96 960 960"
    fill="currentColor"
  >
    <path d="M280 896q-33 0-56.5-23.5T200 816V336h-40v-80h200v-40h240v40h200v80h-40v480q0 33-23.5 56.5T680 896H280Zm400-560H280v480h400V336ZM360 736h80V416h-80v320Zm160 0h80V416h-80v320Z" />
  </svg>
);

export const EmailIcon = ({ size = 24 }: IconProps) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    width={size}
    height={size}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M4 7L10.94 11.3375C11.5885 11.7428 12.4115 11.7428 13.06 11.3375L20 7M5 18H19C20.1046 18 21 17.1046 21 16V8C21 6.89543 20.1046 6 19 6H5C3.89543 6 3 6.89543 3 8V16C3 17.1046 3.89543 18 5 18Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const FacebookIcon = ({ size = 24 }: IconProps) => (
  <svg
    viewBox="0 0 192 192"
    width={size}
    height={size}
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
  >
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeWidth="12"
      d="M96 170c40.869 0 74-33.131 74-74 0-40.87-33.131-74-74-74-40.87 0-74 33.13-74 74 0 40.869 33.13 74 74 74Zm0 0v-62m30-48h-10c-11.046 0-20 8.954-20 20v28m0 0H74m22 0h22"
    />
  </svg>
);

export const LocationIcon = ({ size = 24 }: IconProps) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    width={size}
    height={size}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12 21C15.5 17.4 19 14.1764 19 10.2C19 6.22355 15.866 3 12 3C8.13401 3 5 6.22355 5 10.2C5 14.1764 8.5 17.4 12 21Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M12 12C13.1046 12 14 11.1046 14 10C14 8.89543 13.1046 8 12 8C10.8954 8 10 8.89543 10 10C10 11.1046 10.8954 12 12 12Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const PhoneIcon = ({ size = 24 }: IconProps) => (
  <svg
    viewBox="0 -0.5 25 25"
    fill="none"
    width={size}
    height={size}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M6.24033 8.16795C6.99433 7.37295 7.26133 7.14995 7.58233 7.04695C7.80482 6.98843 8.03822 6.98499 8.26233 7.03695C8.55733 7.12295 8.63433 7.18795 9.60233 8.15095C10.4523 8.99695 10.5363 9.08895 10.6183 9.25095C10.7769 9.54253 10.8024 9.88825 10.6883 10.1999C10.6043 10.4349 10.4803 10.5909 9.96533 11.1089L9.62933 11.4459C9.54093 11.5356 9.51997 11.6719 9.57733 11.7839C10.3232 13.0565 11.3812 14.1179 12.6513 14.8679C12.7978 14.9465 12.9783 14.921 13.0973 14.8049L13.4203 14.4869C13.6199 14.2821 13.8313 14.0891 14.0533 13.9089C14.4015 13.6935 14.8362 13.6727 15.2033 13.8539C15.3823 13.9379 15.4423 13.9929 16.3193 14.8669C17.2193 15.7669 17.2483 15.7959 17.3493 16.0029C17.5379 16.3458 17.536 16.7618 17.3443 17.1029C17.2443 17.2949 17.1883 17.3649 16.6803 17.8839C16.3733 18.1979 16.0803 18.4839 16.0383 18.5259C15.6188 18.8727 15.081 19.043 14.5383 19.0009C13.5455 18.9101 12.5847 18.6029 11.7233 18.1009C9.81416 17.0894 8.18898 15.6155 6.99633 13.8139C6.73552 13.4373 6.50353 13.0415 6.30233 12.6299C5.76624 11.7109 5.48909 10.6638 5.50033 9.59995C5.54065 9.04147 5.8081 8.52391 6.24033 8.16795Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M14.8417 4.29409C14.4518 4.15416 14.0224 4.35677 13.8824 4.74664C13.7425 5.1365 13.9451 5.56598 14.335 5.70591L14.8417 4.29409ZM18.7868 10.0832C18.9333 10.4707 19.3661 10.666 19.7536 10.5195C20.141 10.373 20.3364 9.94021 20.1899 9.55276L18.7868 10.0832ZM13.6536 6.52142C13.2495 6.43018 12.848 6.68374 12.7568 7.08778C12.6655 7.49182 12.9191 7.89333 13.3231 7.98458L13.6536 6.52142ZM16.5696 11.1774C16.6676 11.5799 17.0733 11.8267 17.4757 11.7287C17.8782 11.6307 18.125 11.2251 18.0271 10.8226L16.5696 11.1774ZM14.335 5.70591C16.3882 6.44286 18.0153 8.04271 18.7868 10.0832L20.1899 9.55276C19.2631 7.10139 17.3084 5.17942 14.8417 4.29409L14.335 5.70591ZM13.3231 7.98458C14.9238 8.34607 16.1815 9.58301 16.5696 11.1774L18.0271 10.8226C17.5042 8.67475 15.8098 7.0084 13.6536 6.52142L13.3231 7.98458Z"
      fill="currentColor"
    />
  </svg>
);

export const BagIcon = ({ size = 24 }: IconProps) => (
  <svg
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 32 32"
    width={size}
    height={size}
    fill="currentColor"
  >
    <path d="M1.683,32h28.635c0.442,0,0.86-0.194,1.146-0.531c0.286-0.338,0.407-0.782,0.334-1.218l-3.538-21 C28.137,8.526,27.515,8,26.779,8H22V6c0-3.309-2.691-6-6-6s-6,2.691-6,6v2H5.221C4.485,8,3.863,8.526,3.741,9.251l-3.538,21 c-0.073,0.436,0.048,0.88,0.334,1.218C0.823,31.806,1.24,32,1.683,32z M11,6c0-2.757,2.243-5,5-5s5,2.243,5,5v2H11V6z M4.728,9.417 C4.768,9.175,4.976,9,5.221,9H10v4c0,0.276,0.224,0.5,0.5,0.5S11,13.276,11,13V9h10v4c0,0.276,0.224,0.5,0.5,0.5S22,13.276,22,13V9 h4.779c0.245,0,0.453,0.175,0.493,0.417l3.538,21c0.025,0.147-0.015,0.292-0.111,0.406S30.467,31,30.317,31H1.683 c-0.149,0-0.285-0.063-0.382-0.177s-0.136-0.258-0.111-0.406L4.728,9.417z" />
  </svg>
);

export const CartIcon = ({ size = 24 }: IconProps) => (
  <svg
    viewBox="-0.5 0 25 25"
    fill="none"
    width={size}
    height={size}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M18.5996 21.57C19.7042 21.57 20.5996 20.6746 20.5996 19.57C20.5996 18.4654 19.7042 17.57 18.5996 17.57C17.495 17.57 16.5996 18.4654 16.5996 19.57C16.5996 20.6746 17.495 21.57 18.5996 21.57Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M8.59961 21.57C9.70418 21.57 10.5996 20.6746 10.5996 19.57C10.5996 18.4654 9.70418 17.57 8.59961 17.57C7.49504 17.57 6.59961 18.4654 6.59961 19.57C6.59961 20.6746 7.49504 21.57 8.59961 21.57Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M2 3.55997C2 3.55997 6.64 3.49997 6 7.55997L5.31006 11.62C5.20774 12.1068 5.21778 12.6105 5.33954 13.0929C5.46129 13.5752 5.69152 14.0234 6.01263 14.4034C6.33375 14.7833 6.73733 15.0849 7.19263 15.2854C7.64793 15.4858 8.14294 15.5797 8.64001 15.56H16.64C17.7479 15.5271 18.8119 15.1196 19.6583 14.404C20.5046 13.6884 21.0834 12.7069 21.3 11.62L21.9901 7.50998C22.0993 7.0177 22.0939 6.50689 21.9744 6.017C21.8548 5.52712 21.6242 5.07126 21.3005 4.68467C20.9767 4.29807 20.5684 3.99107 20.1071 3.78739C19.6458 3.58371 19.1438 3.48881 18.64 3.50998H9.94"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const BadgeCheckIcon = ({ size = 16 }: IconProps) => (
  <svg
    viewBox="0 0 24 24"
    width={size}
    height={size}
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
  >
    <path
      stroke="currentColor"
      strokeWidth="2"
      d="M20,15 C19,16 21.25,18.75 20,20 C18.75,21.25 16,19 15,20 C14,21 13.5,23 12,23 C10.5,23 10,21 9,20 C8,19 5.25,21.25 4,20 C2.75,18.75 5,16 4,15 C3,14 1,13.5 1,12 C1,10.5 3,10 4,9 C5,8 2.75,5.25 4,4 C5.25,2.75 8,5 9,4 C10,3 10.5,1 12,1 C13.5,1 14,3 15,4 C16,5 18.75,2.75 20,4 C21.25,5.25 19,8 20,9 C21,10 23,10.5 23,12 C23,13.5 21,14 20,15 Z M7,12 L10,15 L17,8"
    />
  </svg>
);


// ==== ./frontend/src/components/icons/index.ts ====
export {
  ArrowRightIcon,
  BadgeCheckIcon,
  BagIcon,
  CartIcon,
  CloseIcon,
  EmailIcon,
  FacebookIcon,
  LocationIcon,
  MenuIcon,
  PhoneIcon,
  TrashIcon,
} from "./icons";


// ==== ./frontend/src/components/SectionTitle.tsx ====
import type { ReactNode } from "react";

interface SectionTitleProps {
  children: ReactNode;
}

export const SectionTitle = ({ children }: SectionTitleProps) => (
  <div className="flex items-center gap-4 mb-6">
    <div className="w-6 h-px bg-taupe-400" />
    <span className="text-[10px] tracking-[0.22em] uppercase text-taupe-700 font-semibold">
      {children}
    </span>
    <div className="flex-1 h-px bg-taupe-400" />
  </div>
);


// ==== ./frontend/src/constants/index.ts ====
export const NAV_LINKS = ["მთავარი", "ჩვენს შესახებ", "ბლოგი"];

export const NAV_ITEMS = [
  { label: "მთავარი", to: "/" },
  { label: "კატალოგი", to: "/products" },
  { label: "კალათა", to: "/cart" },
  { label: "პროფილი", to: "/profile" },
];

export const CATEGORIES = [
  { label: "ყველა", value: "all" },
  { label: "ეპილატორი", value: "epilator" },
  { label: "სახის მოვლა", value: "facial-cleanser" },
  { label: "თმის მოვლა", value: "hair-dryer" },
];


// ==== ./frontend/src/features/auth/actions/loginAction.ts ====
import { redirect, type ActionFunctionArgs } from "react-router";
import { api } from "src/services/api";

export const loginAction = ({ request }: ActionFunctionArgs) => {
  return request
    .formData()
    .then(
      (formData) =>
        Object.fromEntries(formData.entries()) as Record<string, string>,
    )
    .then((data) =>
      api.postForm("/login", {
        email: data.email,
        password: data.password,
        ...(data["remember-me"] && { "remember-me": "on" }),
      }),
    )
    .then((response) => {
      if (response.ok) return redirect("/");
      if (response.status === 401)
        return { error: "არასწორი მონაცემები, სცადეთ თავიდან" };
      return { error: "დაფიქსირდა შეცდომა, სცადეთ მოგვიანებით" };
    })
    .catch(() => ({ error: "ქსელის შეცდომა, გთხოვთ სცადოთ მოგვიანებით" }));
};


// ==== ./frontend/src/features/auth/actions/logoutAction.ts ====
import { redirect } from "react-router";
import { api } from "src/services/api";

export const logoutAction = async () => {
  try {
    await api.post("/logout", undefined);
    return redirect("/login");
  } catch {
    return redirect("/login");
  }
};


// ==== ./frontend/src/features/auth/actions/registerAction.ts ====
import { redirect, type ActionFunctionArgs } from "react-router";
import { api } from "src/services/api";

export const registerAction = ({ request }: ActionFunctionArgs) => {
  return request
    .formData()
    .then((formData) => Object.fromEntries(formData.entries()))
    .then((entries) => api.post("/users/register", entries))
    .then((response) => {
      if (response.status === 409) {
        return { error: "ელ-ფოსტა უკვე გამოყენებულია" };
      }

      if (!response.ok) {
        return { error: "დაფიქსირდა შეცდომა, სცადეთ მოგვიანებით" };
      }

      return redirect("/login");
    })
    .catch(() => ({
      error: "ქსელის შეცდომა, გთხოვთ სცადოთ მოგვიანებით",
    }));
};


// ==== ./frontend/src/features/auth/components/AuthError.tsx ====
interface AuthErrorProps {
  message?: string;
}

export const AuthError = ({ message }: AuthErrorProps) =>
  message ? (
    <div
      role="alert"
      className="flex items-start gap-2 rounded-lg border border-rose-200 bg-rose-50 px-3 py-2.5 text-sm text-rose-600"
    >
      <svg
        className="mt-0.5 w-4 h-4 shrink-0"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="8" x2="12" y2="12" />
        <circle cx="12" cy="16" r="0.5" fill="currentColor" />
      </svg>
      <span>{message}</span>
    </div>
  ) : null;


// ==== ./frontend/src/features/auth/components/AuthField.tsx ====
interface AuthFieldProps {
  label: string;
  name: string;
  type: string;
  placeholder?: string;
  disabled?: boolean;
  autoComplete?: string;
}

export const AuthField = ({
  label,
  name,
  type,
  placeholder,
  disabled,
  autoComplete,
}: AuthFieldProps) => (
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


// ==== ./frontend/src/features/auth/components/AuthFooter.tsx ====
import { Link } from "react-router";

interface AuthFooterProps {
  label: string;
  linkText: string;
  to: string;
  isSubmitting: boolean;
}

export const AuthFooter = ({
  label,
  linkText,
  to,
  isSubmitting,
}: AuthFooterProps) => (
  <p className="mt-5 text-center text-sm text-taupe-400">
    {label}{" "}
    <Link
      to={isSubmitting ? "#" : to}
      onClick={(e) => isSubmitting && e.preventDefault()}
      aria-disabled={isSubmitting}
      className="font-semibold text-taupe-700 hover:text-pink-500 underline-offset-2 hover:underline"
    >
      {linkText}
    </Link>
  </p>
);


// ==== ./frontend/src/features/auth/components/AuthSubmit.tsx ====
interface AuthSubmitProps {
  label: string;
  loadingLabel: string;
  isSubmitting: boolean;
}

export const AuthSubmit = ({
  label,
  loadingLabel,
  isSubmitting,
}: AuthSubmitProps) => (
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


// ==== ./frontend/src/features/auth/components/AuthTerms.tsx ====
export const AuthTerms = () => (
  <p className="text-xs text-taupe-400 leading-relaxed">
    რეგისტრაციით ეთანხმებით ჩვენს{" "}
    <a href="/terms-of-service" className="underline hover:text-pink-500">
      მომსახურების პირობებს
    </a>{" "}
    და{" "}
    <a href="/privacy-policy" className="underline hover:text-pink-500">
      კონფიდენციალურობის პოლიტიკას
    </a>
    .
  </p>
);


// ==== ./frontend/src/features/auth/components/AuthTestimonial.tsx ====
interface AuthTestimonialProps {
  fullname: string;
  review: string;
}

export const AuthTestimonial = ({ fullname, review }: AuthTestimonialProps) => (
  <div className="mt-8 border-t border-white/20 pt-6 max-w-xs">
    <cite className="text-sm text-white/75 leading-relaxed italic">
      {review}
    </cite>
    <p className="mt-3 text-[10px] tracking-widest uppercase text-white/45">
      — {fullname}
    </p>
  </div>
);


// ==== ./frontend/src/features/auth/components/AuthWrapper.tsx ====
import type { ReactNode } from "react";
import { Link } from "react-router";
import { AuthTestimonial } from "./AuthTestimonial";

interface AuthWrapperProps {
  children: ReactNode;
  imageSrc?: string;
}

export const AuthWrapper = ({ children, imageSrc }: AuthWrapperProps) => (
  <div className="min-h-screen flex bg-[#fdf6f2]">
    {/* Left panel */}
    <div className="hidden lg:flex lg:w-[46%] relative overflow-hidden">
      {imageSrc && (
        <img
          src={imageSrc}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
        />
      )}
      <div className="absolute inset-0 bg-[#c08060]/50" />

      <div className="relative z-10 flex flex-col justify-end px-12 py-14 w-full">
        <h1 className="font-script text-5xl italic text-white leading-none">
          BeautyCode
        </h1>
        <p className="mt-2 text-xs tracking-[0.3em] uppercase text-white/60">
          სილამაზის კოდი
        </p>

        <AuthTestimonial
          fullname="ნინო გ."
          review="BeautyCode-მა სრულიად შეცვალა ჩემი ყოველდღიური მოვლის რუტინა. ხარისხი გამორჩეულია."
        />
      </div>
    </div>

    {/* Right panel */}
    <div className="flex-1 flex flex-col items-center justify-center px-6 py-12 sm:px-12 lg:px-16">
      <Link to="/" className="lg:hidden block text-center mb-10">
        <span className="font-script text-4xl italic text-taupe-700">
          BeautyCode
        </span>
      </Link>
      <div className="w-full max-w-md">{children}</div>
    </div>
  </div>
);


// ==== ./frontend/src/features/auth/components/Login.tsx ====
import { useFormFetcher } from "src/hooks/useFormFetcher";
import LoginWebp from "../../../assets/images/auth/login.webp";
import { AuthError } from "./AuthError";
import { AuthField } from "./AuthField";
import { AuthFooter } from "./AuthFooter";
import { AuthSubmit } from "./AuthSubmit";
import { AuthWrapper } from "./AuthWrapper";

interface LoginActionData {
  error?: string;
}

const Login = () => {
  const { fetcher, isLoading } = useFormFetcher<LoginActionData>();

  return (
    <AuthWrapper imageSrc={LoginWebp}>
      <div className="mb-8">
        <h2 className="font-headline text-3xl italic leading-tight text-taupe-800">
          მოგესალმებით
        </h2>
        <p className="mt-1 font-body text-sm text-taupe-400">
          შედით თქვენს ანგარიშზე
        </p>
      </div>

      <fetcher.Form method="post" className="flex flex-col gap-4">
        <AuthError message={fetcher.data?.error} />

        <AuthField
          label="ელ-ფოსტა"
          name="email"
          type="email"
          placeholder="example@mail.com"
          autoComplete="email"
          disabled={isLoading}
        />

        <AuthField
          label="პაროლი"
          name="password"
          type="password"
          placeholder="••••••••"
          autoComplete="current-password"
          disabled={isLoading}
        />

        <div className="flex items-center justify-between pt-1 pl-0.5">
          <label className="flex items-center gap-2 text-xs uppercase tracking-widest text-taupe-500">
            <input
              type="checkbox"
              name="remember-me"
              value="on"
              disabled={isLoading}
            />
            დამახსოვრება
          </label>
        </div>

        <AuthSubmit
          label="შესვლა"
          loadingLabel="შესვლა..."
          isSubmitting={isLoading}
        />
      </fetcher.Form>

      <div className="my-6 flex items-center gap-4">
        <div className="h-px flex-1 bg-taupe-200" />
        <span className="text-[10px] uppercase tracking-widest text-taupe-400">
          ან
        </span>
        <div className="h-px flex-1 bg-taupe-200" />
      </div>

      <AuthFooter
        label="ანგარიში არ გაქვს?"
        linkText="რეგისტრაცია"
        to="/register"
        isSubmitting={isLoading}
      />
    </AuthWrapper>
  );
};

export default Login;


// ==== ./frontend/src/features/auth/components/Register.tsx ====
import { useFormFetcher } from "src/hooks/useFormFetcher";
import RegisterWebp from "../../../assets/images/auth/register.webp";
import { AuthError } from "./AuthError";
import { AuthField } from "./AuthField";
import { AuthFooter } from "./AuthFooter";
import { AuthSubmit } from "./AuthSubmit";
import { AuthTerms } from "./AuthTerms";
import { AuthWrapper } from "./AuthWrapper";

interface RegisterActionData {
  error?: string;
}

const Register = () => {
  const { fetcher, isLoading } = useFormFetcher<RegisterActionData>();

  return (
    <AuthWrapper imageSrc={RegisterWebp}>
      <div className="mb-8">
        <h2 className="font-headline text-3xl italic text-taupe-800 leading-tight">
          ანგარიშის შექმნა
        </h2>
      </div>

      <fetcher.Form method="post" className="flex flex-col gap-4">
        <AuthError message={fetcher.data?.error} />

        <div className="grid grid-cols-2 gap-3">
          <AuthField
            label="სახელი"
            name="firstName"
            type="text"
            placeholder="მარიამი"
            autoComplete="given-name"
            disabled={isLoading}
          />
          <AuthField
            label="გვარი"
            name="lastName"
            type="text"
            placeholder="გელაშვილი"
            autoComplete="family-name"
            disabled={isLoading}
          />
        </div>

        <AuthField
          label="ელ-ფოსტა"
          name="email"
          type="email"
          placeholder="mariam@example.com"
          autoComplete="email"
          disabled={isLoading}
        />

        <AuthField
          label="ტელეფონი"
          name="phone"
          type="tel"
          placeholder="(+995) 599-000-000"
          autoComplete="tel"
          disabled={isLoading}
        />

        <div className="grid grid-cols-2 gap-3">
          <AuthField
            label="პაროლი"
            name="password"
            type="password"
            placeholder="••••••••"
            autoComplete="new-password"
            disabled={isLoading}
          />
          <AuthField
            label="გაიმეორე"
            name="confirmPassword"
            type="password"
            placeholder="••••••••"
            autoComplete="new-password"
            disabled={isLoading}
          />
        </div>

        <AuthTerms />

        <div className="pt-1">
          <AuthSubmit
            label="რეგისტრაცია"
            loadingLabel="დაელოდეთ..."
            isSubmitting={isLoading}
          />
        </div>
      </fetcher.Form>

      <AuthFooter
        label="უკვე გაქვს ანგარიში?"
        linkText="შესვლა"
        to="/login"
        isSubmitting={isLoading}
      />
    </AuthWrapper>
  );
};

export default Register;


// ==== ./frontend/src/features/auth/index.ts ====
export { loginAction } from "./actions/loginAction";
export { logoutAction } from "./actions/logoutAction";
export { registerAction } from "./actions/registerAction";

export { default as Login } from "./components/Login";
export { default as Register } from "./components/Register";


// ==== ./frontend/src/features/cart/cartContext.ts ====
import { createContext, useContext, type Dispatch } from "react";
import type { CartAction, CartItem } from "src/types";

export const CartStateContext = createContext<CartItem[]>([]);

export const CartActionsContext = createContext<Dispatch<CartAction> | null>(
  null,
);

export const useCart = () => {
  const context = useContext(CartStateContext);
  if (!context) throw new Error("useCart must be used within CartProvider");
  return context;
};

export const useCartDispatch = () => {
  const context = useContext(CartActionsContext);
  if (!context)
    throw new Error("useCartDispatch must be used within CartProvider");
  return context;
};


// ==== ./frontend/src/features/cart/CartProvider.tsx ====
import { useReducer, type ReactNode } from "react";
import type { CartAction, CartItem } from "src/types";
import { CartActionsContext, CartStateContext } from "./cartContext";

const cartReducer = (state: CartItem[], payload: CartAction): CartItem[] => {
  const { action, item } = payload;
  switch (action) {
    case "ADD": {
      const exists = state.find((i) => i.id === item.id);
      if (exists) {
        return state.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i,
        );
      }
      return [...state, { ...item, quantity: 1 }];
    }
    case "INCREASE":
      return state.map((i) =>
        i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i,
      );
    case "DECREASE":
      return state.map((i) =>
        i.id === item.id && i.quantity > 1
          ? { ...i, quantity: i.quantity - 1 }
          : i,
      );
    case "REMOVE":
      return state.filter((i) => i.id !== item.id);
    default:
      return state;
  }
};

interface CartProviderProps {
  children: ReactNode;
}

const CartProvider = ({ children }: CartProviderProps) => {
  const [cart, dispatch] = useReducer(cartReducer, []);

  return (
    <CartStateContext.Provider value={cart}>
      <CartActionsContext.Provider value={dispatch}>
        {children}
      </CartActionsContext.Provider>
    </CartStateContext.Provider>
  );
};

export default CartProvider;


// ==== ./frontend/src/features/cart/components/CartHeader.tsx ====
export const CartHeader = () => (
  <header className="mb-12">
    <h2 className="text-2xl md:text-4xl font-headline font-bold text-taupe-600 tracking-tight mb-2">
      კალათა
    </h2>
    <p className="font-label text-sm uppercase tracking-widest text-taupe-500">
      თქვენი შერჩეული პროდუქცია
    </p>
  </header>
);


// ==== ./frontend/src/features/cart/components/CartItem.tsx ====
import { Trash2 } from "lucide-react";
import type { CartItem as CartItemType } from "src/types";
import { useCartDispatch } from "../cartContext";
import { CartQuantityControl } from "./CartQuantityControl";

interface CartItemProps {
  item: CartItemType;
}

export const CartItem = ({ item }: CartItemProps) => {
  const dispatch = useCartDispatch();
  const lineTotal = item.newPrice * item.quantity;

  return (
    <div className="flex gap-4 py-4 border-b border-taupe-100 last:border-0">
      <figure className="w-20 h-20 shrink-0 rounded-xl overflow-hidden bg-pink-50 border border-pink-100">
        <img
          src={item.imgUrl}
          alt={item.title}
          className="w-full h-full object-contain p-2"
        />
      </figure>

      <div className="flex flex-col justify-between flex-1 min-w-0">
        <div className="flex justify-between items-start gap-3">
          <div className="min-w-0">
            <span className="font-label text-[10px] uppercase tracking-widest text-pink-400 block">
              {item.badge}
            </span>
            <h3 className="font-headline text-sm md:text-base text-taupe-800 leading-snug truncate">
              {item.title}
            </h3>
          </div>
          <button
            onClick={() => dispatch({ item, action: "REMOVE" })}
            aria-label={`${item.title} კალათიდან წაშლა`}
            className="btn btn-ghost btn-xs btn-circle text-taupe-300 hover:text-error hover:bg-error/10 shrink-0"
          >
            <Trash2 size={15} />
          </button>
        </div>

        <div className="flex items-center justify-between mt-2">
          <CartQuantityControl item={item} />
          <div className="text-right">
            <span className="font-headline text-sm md:text-base font-semibold text-taupe-700">
              {lineTotal.toFixed(0)} ₾
            </span>
            {item.oldPrice != null && (
              <span className="block font-label text-xs text-taupe-400 line-through">
                {(item.oldPrice * item.quantity).toFixed(0)} ₾
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};


// ==== ./frontend/src/features/cart/components/CartQuantityControl.tsx ====
import type { CartItem } from "src/types";
import { useCartDispatch } from "../cartContext";

interface CartQuantityControlProps {
  item: CartItem;
}

export const CartQuantityControl = ({ item }: CartQuantityControlProps) => {
  const dispatch = useCartDispatch();

  return (
    <div className="join rounded-full bg-pink-100 border border-pink-200">
      <button
        onClick={() => dispatch({ item, action: "DECREASE" })}
        disabled={item.quantity === 1}
        aria-label="რაოდენობის შემცირება"
        className="join-item btn btn-ghost btn-xs w-7 rounded-full text-taupe-600
                   disabled:opacity-30 disabled:cursor-not-allowed hover:bg-pink-200
                   transition-colors duration-150"
      >
        −
      </button>
      <span
        className="join-item flex items-center justify-center w-7 text-center
                   font-bold text-xs text-taupe-700"
        aria-live="polite"
      >
        {item.quantity}
      </span>
      <button
        onClick={() => dispatch({ item, action: "INCREASE" })}
        aria-label="რაოდენობის გაზრდა"
        className="join-item btn btn-ghost btn-xs w-7 rounded-full text-taupe-600
                   hover:bg-pink-200 transition-colors duration-150"
      >
        +
      </button>
    </div>
  );
};


// ==== ./frontend/src/features/cart/components/CartSummaryRow.tsx ====
interface CartSummaryRowProps {
  label: string;
  value: string;
}

export const CartSummaryRow = ({ label, value }: CartSummaryRowProps) => (
  <div className="flex justify-between items-center text-sm">
    <span className="font-label uppercase tracking-widest">{label}</span>
    <span>{value}</span>
  </div>
);


// ==== ./frontend/src/features/cart/components/CartSummary.tsx ====
import { ArrowRight, BadgeCheck } from "lucide-react";
import { CartSummaryRow } from "./CartSummaryRow";

interface CartSummaryProps {
  total: number;
}

export const CartSummary = ({ total }: CartSummaryProps) => (
  <div className="card rounded-2xl bg-base-200 shadow-sm sticky top-20">
    <div className="card-body gap-4">
      <h3 className="card-title text-taupe-700 font-headline font-normal text-xl">
        შეკვეთის დეტალები
      </h3>

      <div className="space-y-3 text-taupe-500">
        <CartSummaryRow label="ჯამი" value={`${total.toFixed(0)} ₾`} />
        <CartSummaryRow label="მიტანა" value="უფასო" />
      </div>

      <div className="divider my-0" />

      <div className="flex justify-between items-end">
        <span className="font-label text-xs uppercase tracking-widest text-taupe-500">
          სულ
        </span>
        <span className="text-2xl font-headline text-taupe-700">
          {total.toFixed(0)} ₾
        </span>
      </div>

      <button className="btn btn-accent w-full rounded-full font-label uppercase tracking-widest text-sm mt-1">
        გადახდა
        <ArrowRight size={16} />
      </button>

      <div
        role="alert"
        className="alert bg-pink-50 border border-pink-200 rounded-xl py-3 px-4 mt-1"
      >
        <BadgeCheck size={18} />
        <p className="text-[11px] font-label text-taupe-500 uppercase tracking-tight leading-relaxed">
          უსაფრთხო გადახდა გარანტირებულია პარტნიორი ბანკების მიერ
        </p>
      </div>
    </div>
  </div>
);


// ==== ./frontend/src/features/cart/components/Cart.tsx ====
import { useCart } from "../cartContext";
import { CartHeader } from "./CartHeader";
import { CartItem } from "./CartItem";
import { CartSummary } from "./CartSummary";
import { EmptyCart } from "./EmptyCart";

const Cart = () => {
  const cart = useCart();

  const total = cart.reduce(
    (acc, item) => acc + item.quantity * item.newPrice,
    0,
  );

  return (
    <main className="max-w-7xl mx-auto px-6 pt-6 pb-16 md:pb-32">
      <CartHeader />
      {cart.length === 0 ? (
        <EmptyCart />
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
          <div className="lg:col-span-8 rounded-2xl bg-base-200 shadow-sm px-4 md:px-6">
            {cart.map((item) => (
              <CartItem key={item.id} item={item} />
            ))}
          </div>
          <div className="lg:col-span-4">
            <CartSummary total={total} />
          </div>
        </div>
      )}
    </main>
  );
};

export default Cart;


// ==== ./frontend/src/features/cart/components/EmptyCart.tsx ====
import { ShoppingBag } from "lucide-react";
import { Link } from "react-router";

export const EmptyCart = () => (
  <div className="flex flex-col items-center justify-center py-32 gap-6">
    <div className="w-20 h-20 rounded-full bg-pink-100 flex items-center justify-center text-pink-400">
      <ShoppingBag size={36} />
    </div>
    <div className="text-center">
      <p className="font-headline text-2xl text-taupe-700 mb-1">
        კალათა ცარიელია
      </p>
      <p className="font-body text-sm text-taupe-400">
        დაამატეთ სასურველი პროდუქტები
      </p>
    </div>
    <Link
      to="/products"
      className="btn btn-accent btn-sm rounded-full font-label uppercase tracking-widest"
    >
      პროდუქტების ნახვა
    </Link>
  </div>
);


// ==== ./frontend/src/features/cart/index.ts ====
export {
  CartActionsContext,
  CartStateContext,
  useCart,
  useCartDispatch,
} from "./cartContext";

export { default as CartProvider } from "./CartProvider";

export { default as Cart } from "./components/Cart";


// ==== ./frontend/src/features/chat/CrispChat.tsx ====
import { useEffect } from "react";

declare global {
  interface Window {
    $crisp?: unknown[];
    CRISP_WEBSITE_ID?: string;
  }
}

const CrispChat = () => {
  useEffect(() => {
    const timer = setTimeout(() => {
      window.$crisp = [];
      window.CRISP_WEBSITE_ID = import.meta.env.VITE_CRISP_WEBSITE_ID;

      const s = document.createElement("script");
      s.src = "https://client.crisp.chat/l.js";
      s.async = true;
      document.head.appendChild(s);
    }, 3000); // load after 3s

    return () => {
      clearTimeout(timer);
      document
        .querySelectorAll('script[src="https://client.crisp.chat/l.js"]')
        .forEach((s) => s.remove());
      delete window.$crisp;
      delete window.CRISP_WEBSITE_ID;
    };
  }, []);

  return null;
};

export default CrispChat;


// ==== ./frontend/src/features/footer/components/FooterBrand.tsx ====
import { ArrowRightIcon } from "src/components/icons";
import { useFormFetcher } from "src/hooks/useFormFetcher";

interface SubscribeActionData {
  success?: boolean;
}

export const FooterBrand = () => {
  const { fetcher, isLoading, data } = useFormFetcher<SubscribeActionData>();

  return (
    <div className="md:col-span-2">
      <header>
        <p className="text-2xl md:text-3xl font-script italic text-taupe-600 mb-4">
          BeautyCode
        </p>
        <p className="max-w-sm text-taupe-500 mb-6 leading-relaxed">
          გამოიწერეთ ჩვენი სიახლეები და მიიღეთ ექსკლუზიური შეთავაზებები პირდაპირ
          თქვენს ფოსტაზე.
        </p>
      </header>
      {data?.success ? (
        <p className="text-sm text-taupe-500 tracking-wide">
          ✓ გმადლობთ! მალე დაგიკავშირდებით.
        </p>
      ) : (
        <fetcher.Form
          method="post"
          action="/subscribe"
          className="join max-w-md border-b border-base-300 focus-within:border-taupe-600 transition-colors"
        >
          <input
            type="email"
            name="email"
            placeholder="ელ-ფოსტა"
            disabled={isLoading}
            className="input join-item bg-transparent border-none focus:outline-0 px-0 py-3
                       text-sm text-taupe-500 placeholder:text-taupe-400 disabled:opacity-50 grow"
          />
          <button
            type="submit"
            aria-label="გამოწერა"
            disabled={isLoading}
            className="btn btn-ghost join-item text-taupe-600
                       hover:bg-transparent disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ArrowRightIcon />
          </button>
        </fetcher.Form>
      )}
    </div>
  );
};


// ==== ./frontend/src/features/footer/components/FooterContacts.tsx ====
import { Mail, MapPin, Phone } from "lucide-react";
import type { ReactNode } from "react";
import { FacebookIcon } from "src/components/icons";

interface ContactLink {
  href: string;
  icon: ReactNode;
  label: string;
}

const CONTACT_LINKS: ContactLink[] = [
  {
    href: "https://www.facebook.com/Beatlovegeorgia",
    icon: <FacebookIcon />,
    label: "Beatlovegeorgia",
  },
  {
    href: "https://wa.me/995574074833",
    icon: <Phone size={24} />,
    label: "(+995) 574-074-833",
  },
  {
    href: "mailto:13beauty.code@gmail.com",
    icon: <Mail size={24} />,
    label: "13beauty.code@gmail.com",
  },
];

export const FooterContacts = () => (
  <div>
    <h5 className="text-xs uppercase tracking-[0.2em] text-taupe-600 mb-4">
      კონტაქტი
    </h5>
    <ul className="flex flex-col gap-3 text-taupe-500 text-sm">
      {CONTACT_LINKS.map(({ href, icon, label }) => (
        <li key={href}>
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="link link-hover flex items-center gap-2 no-underline"
          >
            <span>{icon}</span>
            <span>{label}</span>
          </a>
        </li>
      ))}
      <li className="flex items-center gap-2">
        <MapPin size={24} />
        თბილისი, საქართველო
      </li>
    </ul>
  </div>
);


// ==== ./frontend/src/features/footer/components/FooterNavigation.tsx ====
import { Link } from "react-router";
import { NAV_ITEMS } from "src/constants";

export const FooterNavigation = () => (
  <div>
    <h5 className="text-xs uppercase tracking-[0.2em] text-taupe-600 mb-4">
      ნავიგაცია
    </h5>
    <ul className="flex flex-col p-0 gap-2.5 list-none">
      {NAV_ITEMS.map((item) => (
        <li key={item.label}>
          <Link
            to={item.to}
            className="text-taupe-500 hover:text-taupe-700 transition-colors duration-200"
          >
            {item.label}
          </Link>
        </li>
      ))}
    </ul>
  </div>
);


// ==== ./frontend/src/features/footer/components/Footer.tsx ====
import { Link } from "react-router";
import { FooterBrand } from "./FooterBrand";
import { FooterContacts } from "./FooterContacts";
import { FooterNavigation } from "./FooterNavigation";

const Footer = () => (
  <footer className="pt-12 pb-8 md:pt-20 md:pb-16">
    <div className="max-w-7xl mx-auto px-6">
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-12 mb-10 md:mb-20">
        <FooterBrand />
        <FooterNavigation />
        <FooterContacts />
      </div>
      <div className="pt-8 border-t border-taupe-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
        <p className="font-body text-sm tracking-wide text-taupe-400">
          საავტორო უფლება © 2026 BeautyCode.
        </p>
        <Link
          to="/terms-and-conditions"
          className="font-body text-sm tracking-wide text-taupe-400 hover:text-taupe-500 transition-colors duration-200 no-underline"
        >
          წესები და პირობები
        </Link>
      </div>
    </div>
  </footer>
);

export default Footer;


// ==== ./frontend/src/features/footer/index.ts ====
export { default as Footer } from "./components/Footer";


// ==== ./frontend/src/features/home/components/BrandEthos.tsx ====
const BrandEthos = () => (
  <section className="py-12 md:py-20 bg-pink-50 relative overflow-hidden">
    <div className="max-w-4xl mx-auto px-6">
      <div className="flex items-center justify-center gap-4 mb-10">
        <div className="flex-1 h-px bg-pink-200" />
        <span className="font-label text-[10px] tracking-[0.25em] uppercase text-taupe-500 shrink-0">
          ჩვენი მისია
        </span>
        <div className="flex-1 h-px bg-pink-200" />
      </div>

      <h2
        className="text-2xl md:text-5xl mb-12 md:mb-20 font-light italic leading-[1.2]
                     text-taupe-600 text-center max-w-2xl mx-auto"
      >
        დავეხმაროთ ქალებს აღმოაჩინონ თავიანთი{" "}
        <em className="not-italic text-pink-400">ბუნებრივი სილამაზე</em> —
        თანამედროვე ტექნოლოგიების დახმარებით.
      </h2>

      <div className="grid md:grid-cols-[1fr_1px_1fr] gap-x-12 items-start">
        <blockquote>
          <p className="text-base italic font-light tracking-tight leading-relaxed text-taupe-600">
            <span className="font-script text-xl text-taupe-700 not-italic">
              BeautyCode
            </span>{" "}
            — არ არის მხოლოდ ბრენდი, ეს არის თავის მოვლის რიტუალი, რომელიც
            ხელმისაწვდომს ხდის პროფესიონალურ მომსახურებას თქვენს სახლში.
          </p>
        </blockquote>

        <div className="hidden md:block bg-linear-to-b from-transparent via-pink-200 to-transparent self-stretch" />

        <div className="pt-8 md:pt-0 flex flex-col gap-5">
          <span className="font-label text-[10px] tracking-[0.2em] uppercase text-taupe-500">
            ხარისხი
          </span>
          <p className="text-sm font-medium tracking-wide leading-relaxed text-taupe-700">
            ჩვენ გთავაზობთ მხოლოდ უმაღლესი ხარისხის, სერტიფიცირებულ
            მოწყობილობებს, რომლებიც შექმნილია თქვენი უსაფრთხოებისა და კომფორტის
            გათვალისწინებით.
          </p>
          <div className="flex gap-2 flex-wrap">
            {["სერტიფიცირებული", "უსაფრთხო"].map((b) => (
              <span
                key={b}
                className="badge badge-outline border-pink-300 text-pink-500
                           font-label text-[10px] tracking-widest uppercase px-3"
              >
                {b}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default BrandEthos;


// ==== ./frontend/src/features/home/components/HeroSkeleton.tsx ====
export const HeroSkeleton = () => (
  <section
    aria-label="იტვირთება..."
    aria-busy="true"
    className="relative min-h-[580px] flex flex-col md:flex-row items-center overflow-hidden pt-4 md:pt-8"
  >
    <div className="w-full md:w-1/2 px-8 md:px-20 py-12 md:py-0 flex flex-col gap-6">
      <div className="skeleton h-5 w-20 rounded-full" />
      <div className="flex flex-col gap-3">
        <div className="skeleton h-10 w-4/5 rounded-lg" />
        <div className="skeleton h-10 w-3/5 rounded-lg" />
        <div className="skeleton h-10 w-2/5 rounded-lg" />
      </div>
      <div className="flex items-baseline gap-3">
        <div className="skeleton h-8 w-28 rounded-lg" />
        <div className="skeleton h-5 w-16 rounded-lg" />
      </div>
      <div className="skeleton h-11 w-36 rounded-full" />
    </div>

    <div className="w-full md:w-1/2 h-[300px] sm:h-[400px] md:h-[640px] rounded-l-[4rem] md:rounded-l-[8rem] skeleton" />
  </section>
);


// ==== ./frontend/src/features/home/components/Hero.tsx ====
import { useCartDispatch } from "src/features/cart";
import { useProducts } from "src/hooks/useProducts";
import { HeroSkeleton } from "./HeroSkeleton";

const Hero = () => {
  const dispatch = useCartDispatch();
  const { data: products = [], isLoading } = useProducts();

  if (isLoading) return <HeroSkeleton />;

  const item = products.find((p) => p.badge === "Premium");
  if (!item) return null;

  return (
    <section className="relative min-h-[580px] flex flex-col md:flex-row items-center overflow-hidden pt-4 md:pt-8">
      {/* Text side */}
      <div className="w-full md:w-1/2 px-8 md:px-20 z-10 py-12 md:py-0 flex flex-col gap-6">
        <div>
          <span className="badge badge-outline border-pink-300 text-pink-500 font-label tracking-widest uppercase text-[10px] mb-3">
            {item.badge}
          </span>
          <h2 className="font-headline text-3xl sm:text-4xl md:text-5xl leading-tight text-taupe-800 max-w-md mt-2">
            {item.title}
          </h2>
        </div>

        <div className="flex items-baseline gap-3">
          <span className="text-2xl md:text-3xl font-headline text-taupe-700">
            {item.newPrice} GEL
          </span>
          {item.oldPrice != null && (
            <span className="text-base text-taupe-400 line-through font-label">
              {item.oldPrice} GEL
            </span>
          )}
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => dispatch({ item, action: "ADD" })}
            className="btn btn-accent rounded-full font-label uppercase tracking-widest text-sm px-8"
          >
            ყიდვა
          </button>
          <span className="font-label text-[10px] uppercase tracking-widest text-taupe-400">
            უფასო მიტანა
          </span>
        </div>
      </div>

      {/* Image side */}
      <div
        className="w-full md:w-1/2 h-[300px] sm:h-[400px] md:h-[640px]
                      rounded-l-[4rem] md:rounded-l-[8rem] overflow-hidden
                      bg-linear-to-br from-pink-100 to-pink-200 shadow-xl"
      >
        <img
          loading="eager"
          fetchPriority="high"
          alt={item.title}
          src={item.imgUrl}
          className="w-full h-full object-contain p-8 md:p-12
                     transition-transform duration-700 ease-out hover:scale-105"
        />
      </div>
    </section>
  );
};

export default Hero;


// ==== ./frontend/src/features/home/components/Home.tsx ====
import { Outlet } from "react-router";
import { Footer } from "src/features/footer";
import { Navbar } from "src/features/navbar";
import CrispChat from "../../chat/CrispChat";

const Home = () => (
  <div className="min-h-screen">
    <Navbar />
    <CrispChat />
    <Outlet />
    <Footer />
  </div>
);

export default Home;


// ==== ./frontend/src/features/home/index.ts ====
export { default as BrandEthos } from "./components/BrandEthos";
export { default as Hero } from "./components/Hero";
export { default as Home } from "./components/Home";


// ==== ./frontend/src/features/legal/components/TermsAndConditions.tsx ====
import type { ReactNode } from "react";

export default function TermsAndConditions() {
  return (
    <div className="max-w-3xl mx-auto px-5 py-10">
      <h1 className="font-headline text-4xl text-taupe-800 mb-6 pb-3 border-b border-taupe-200">
        წესები და პირობები
      </h1>

      <div className="bg-base-200 rounded-xl p-5 mb-8 text-sm text-taupe-600 space-y-1 font-body">
        <p>
          <span className="font-semibold text-taupe-700">
            მოვაჭრის დასახელება:
          </span>{" "}
          შპს Tech Beauty ტექ ბიუთი
        </p>
        <p>
          <span className="font-semibold text-taupe-700">
            საიდენტიფიკაციო კოდი:
          </span>{" "}
          412794196
        </p>
        <p>
          <span className="font-semibold text-taupe-700">
            იურიდიული მისამართი:
          </span>{" "}
          ქ. ქუთაისი ნინოშვილის 10-ე შესახვევი N2
        </p>
        <p>
          <span className="font-semibold text-taupe-700">ელ-ფოსტა:</span>{" "}
          <a
            href="mailto:13beautycode@gmail.com"
            className="text-accent hover:underline"
          >
            13beautycode@gmail.com
          </a>
        </p>
        <p>
          <span className="font-semibold text-taupe-700">
            ტელეფონის ნომერი:
          </span>{" "}
          574 07 48 33
        </p>
      </div>

      <Section title="მოვაჭრის ვალდებულებები">
        <Li>
          მოვაჭრე ვალდებულია მომხმარებელს გადასცეს ხელშეკრულებით
          გათვალისწინებული პირობების შესაბამისი საქონელი.
        </Li>
        <Li>
          საქონელი ხელშეკრულებით გათვალისწინებული პირობების შესაბამის საქონლად
          მიიჩნევა, თუ იგი შეესაბამება მოვაჭრის მიერ მომხმარებლისთვის მიწოდებულ
          აღწერას და მას აქვს იგივე თვისებები, რომლებიც მოვაჭრის მიერ
          მომხმარებლისთვის წარდგენილ საქონლის ნიმუშს ჰქონდა.
        </Li>
        <Li>
          მოვაჭრის მიერ მომხმარებლისთვის მიწოდებული აღწერის არარსებობის
          შემთხვევაში საქონელი ხელშეკრულებით გათვალისწინებული პირობების
          შესაბამის საქონლად მიიჩნევა, თუ იგი გამოსადეგია იმ მიზნისთვის, რომლის
          თაობაზედაც მომხმარებელმა მოვაჭრეს ხელშეკრულების დადების დროს აცნობა და
          რომელსაც მოვაჭრე დაეთანხმა.
        </Li>
      </Section>

      <Section title="კანონისმიერი გარანტია">
        <Li>
          თუ საქონელი ნაკლის მქონე აღმოჩნდა, მომხმარებელს უფლება აქვს, მოვაჭრეს
          მოსთხოვოს ნაკლის აღმოფხვრა (საქონლის უსასყიდლოდ შეკეთება ან შეცვლა,
          ფასის შემცირება) ან გავიდეს ხელშეკრულებიდან.
        </Li>
        <Li>
          საქონლის შეკეთება და შეცვლა მომხმარებლის პირველი რიგის უფლებებია.
          მომხმარებელს უფლება აქვს, მოვაჭრეს მოსთხოვოს საქონლის უსასყიდლოდ
          შეკეთება ან შეცვლა, გარდა იმ შემთხვევისა, როდესაც ეს, საქონლის
          ბუნებიდან გამომდინარე, შეუძლებელია ან არათანაზომიერ ან შეუსაბამოდ დიდ
          ხარჯს მოითხოვს.
        </Li>
        <Li>
          საქონელი შეკეთებული ან შეცვლილი უნდა იქნეს გონივრულ ვადაში (შეცვლა —
          ნაკლის აღმოჩენიდან არაუგვიანეს <strong>10 კალენდარული დღის</strong>{" "}
          ვადაში, ხოლო სტანდარტული შეკეთება — ნაკლის აღმოჩენიდან არაუგვიანეს{" "}
          <strong>30 კალენდარული დღის</strong> ვადაში), ისე, რომ მომხმარებელს არ
          შეექმნას მნიშვნელოვანი შეფერხება.
        </Li>
        <Li>
          საქონლის უსასყიდლოდ შეკეთება ან შეცვლა გულისხმობს მოვაჭრის მიერ ყველა
          ხარჯის (მათ შორის, ფოსტის, სამუშაო ძალისა და მასალების ხარჯების)
          გაწევას, რომლებიც საჭიროა საქონლის ხელშეკრულებით გათვალისწინებულ
          პირობებთან შესაბამისობის უზრუნველსაყოფად.
        </Li>
        <Li>
          მომხმარებელს უფლება აქვს, მოითხოვოს საქონლის ფასის შემცირება ან უარი
          თქვას ხელშეკრულებაზე, თუ არსებობს ერთ-ერთი შემდეგი პირობა:
          <ul className="mt-2 space-y-1 pl-5 border-l-2 border-taupe-200">
            <SubLi>საქონლის შეკეთება ან შეცვლა შეუძლებელია</SubLi>
            <SubLi>
              მოვაჭრემ საქონელი გონივრულ ვადაში არ შეაკეთა ან არ შეცვალა და
              მომხმარებელმა ხელშეკრულების შესრულებისადმი ინტერესი დაკარგა
            </SubLi>
            <SubLi>
              მოვაჭრის მიერ საქონლის შეკეთება ან შეცვლა მომხმარებელს
              მნიშვნელოვან შეფერხებას შეუქმნის
            </SubLi>
          </ul>
        </Li>
        <Li>
          მომხმარებელს უფლება აქვს, ხელშეკრულებიდან გასვლის შემთხვევაში
          მოითხოვოს ხელშეკრულების შეუსრულებლობით მიყენებული ზიანის ანაზღაურება
          საქართველოს კანონმდებლობით დადგენილი წესით.
        </Li>
        <Li>
          მომხმარებელს <strong>არ აქვს</strong> უფლება, უარი თქვას
          ხელშეკრულებაზე, თუ საქონლის ნაკლი უმნიშვნელოა.
        </Li>
        <Li>
          მომხმარებელს უფლება აქვს, ისარგებლოს ზემოხსენებული უფლებებით, თუ
          საქონლის ნაკლი საქონლის მისთვის გადაცემიდან <strong>2 წლის</strong>{" "}
          განმავლობაში აღმოჩნდა.
        </Li>
        <Li>
          თუ მომხმარებელმა საქონლის ნაკლი საქონლის მფლობელობაში მიღებიდან{" "}
          <strong>6 თვის</strong> განმავლობაში აღმოაჩინა, საწინააღმდეგოს
          დამტკიცებამდე იგულისხმება, რომ ნაკლი არსებობდა საქონლის მიწოდებისას.
          ამ შემთხვევაში მტკიცების ტვირთი მოვაჭრეს ეკისრება. 6 თვის შემდეგ
          აღმოჩენის შემთხვევაში მტკიცების ტვირთი მომხმარებელს ეკისრება.
        </Li>
      </Section>

      <Section title="შეკვეთის მიღება">
        <Li>
          მომხმარებელს ნივთის შეძენა შეუძლია თანხის გადარიცხვით საბანკო
          ანგარიშზე. ასევე, შესაძლებელია ნივთის ღირებულების კურიერთან ნაღდი
          ანგარიშსწორების გზით გადახდა.
        </Li>
        <Li>
          მოვაჭრე, საბანკო ანგარიშზე თანხის ჩარიცხვის მომენტიდან,{" "}
          <strong>არაუმეტეს 2 დღის</strong> განმავლობაში, ვალდებულია უზრუნველყოს
          მომხმარებლის შეკვეთის დამუშავება. მიწოდების ვადა არ უნდა აღემატებოდეს
          შეკვეთის დამუშავებიდან <strong>10 დღეს</strong>.
        </Li>
        <Li>
          შეკვეთა დასრულებულად ითვლება ნივთის მომხმარებლისთვის ჩაბარებისთანავე.
        </Li>
        <Li>
          მომხმარებლისთვის ნივთის მიწოდების შეუძლებლობის შემთხვევაში შეკვეთა
          გაუქმდება და კლიენტს დაუბრუნდება მის მიერ გადახდილი თანხა.
        </Li>
        <Li>
          მომხმარებელი ვალდებულია, შეკვეთის მიღებისას მოახდინოს მისი შემოწმება
          და ხელმოწერით დაადასტუროს, რომ ნივთს არ აქვს ვიზუალური ნაკლი.
        </Li>
        <Li>
          მოვაჭრე ვალდებულია მოთხოვნის შემთხვევაში გადასცეს დამკვეთს შეკვეთასთან
          დაკავშირებული ყველა საბუთი.
        </Li>
      </Section>

      <Section title="მიწოდების საფასური">
        <div className="grid grid-cols-3 gap-3 mt-1">
          {[
            { label: "თბილისი", price: "0 ₾" },
            { label: "რეგიონები", price: "0 ₾" },
            { label: "სოფელი", price: "0 ₾" },
          ].map(({ label, price }) => (
            <div key={label} className="bg-base-200 rounded-lg p-4 text-center">
              <p className="font-label text-xs text-taupe-500 uppercase tracking-wider mb-1">
                {label}
              </p>
              <p className="font-headline text-2xl text-accent">{price}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section title="უპირობოდ დაბრუნების პოლიტიკა">
        <Li>
          მომხმარებელს უფლება აქვს, ყოველგვარი საფუძვლის მითითების გარეშე თქვას
          უარი დისტანციურ ხელშეკრულებაზე <strong>14 კალენდარული დღის</strong>{" "}
          განმავლობაში.
        </Li>
        <Li>
          ეს ვადა აითვლება:
          <ul className="mt-2 space-y-1 pl-5 border-l-2 border-taupe-200">
            <SubLi>
              მომსახურების ხელშეკრულების შემთხვევაში — ხელშეკრულების დადებიდან
            </SubLi>
            <SubLi>
              საქონლის ნასყიდობის ხელშეკრულების შემთხვევაში — საქონლის
              მფლობელობაში მიღებიდან
            </SubLi>
            <SubLi>
              ნაწილ-ნაწილ შეკვეთის შემთხვევაში — ბოლო ნივთის მფლობელობაში
              მიღებიდან
            </SubLi>
            <SubLi>
              რეგულარული მიწოდების შემთხვევაში — ნივთის პირველად მიღებიდან
            </SubLi>
          </ul>
        </Li>
      </Section>

      <Section title="დაბრუნების პირობები">
        <Li>
          ნივთის უპირობოდ დაბრუნებისთვის მომხმარებელი ვალდებულია მოიწეროს
          ფეისბუქ გვერდზე მესენჯერის საშუალებით ან გადმოგზავნოს მოთხოვნა
          ელ-ფოსტაზე:{" "}
          <a
            href="mailto:13beautycode@gmail.com"
            className="text-accent hover:underline"
          >
            13beautycode@gmail.com
          </a>
        </Li>
        <Li>
          ხელშეკრულებაზე უარის თქმის შემთხვევაში მომხმარებელი ვალდებულია:
          <ul className="mt-2 space-y-1 pl-5 border-l-2 border-taupe-200">
            <SubLi>
              დაუბრუნოს საქონელი{" "}
              <strong>არაუგვიანეს 7 კალენდარული დღისა</strong> შეტყობინების
              გაგზავნის შემდეგ
            </SubLi>
            <SubLi>
              გასწიოს საქონლის დაბრუნებასთან დაკავშირებული პირდაპირი ხარჯი
            </SubLi>
          </ul>
        </Li>
        <Li>
          თუ ნივთის მახასიათებლები არ შეესაბამება საიტზე მითითებულ მონაცემებს,
          ნივთს გააჩნია თავდაპირველი ნაკლი ან ნივთი დაზიანებულია ტრანსპორტირების
          შედეგად, პროდუქციის უკან დაბრუნებას უზრუნველყოფს მოვაჭრე თავისი
          რესურსით.
        </Li>
        <Li>
          მომხმარებელი ვალდებულია სრულად დააბრუნოს ნივთი ყველა თანდართულ
          დოკუმენტთან ერთად.
        </Li>
        <Li>
          მოვაჭრე ვალდებულია შეტყობინების მიღებიდან{" "}
          <strong>14 კალენდარული დღის</strong> განმავლობაში დაუბრუნოს
          მომხმარებელს გადახდილი თანხა. მოვაჭრეს უფლება აქვს, უარი თქვას თანხის
          დაბრუნებაზე მანამ, სანამ საქონელს არ დაიბრუნებს ან გაგზავნის
          დამადასტურებელ დოკუმენტს არ მიიღებს.
        </Li>
        <Li>
          თანხის ანაზღაურება მოხდება გადახდის იმავე საშუალებებით, გარდა იმ
          შემთხვევისა, როდესაც მომხმარებელი გადახდის სხვა საშუალების
          გამოყენებაზე თანხმობას განაცხადებს.
        </Li>
        <Li>
          მომხმარებლის მიერ დისტანციურ ხელშეკრულებაზე უარის თქმა ავტომატურად
          იწვევს დაკავშირებული ხელშეკრულებიდან გასვლას და პირვანდელი
          მდგომარეობის აღდგენას.
        </Li>
        <Li>
          ხელშეკრულებაზე უარის თქმის შედეგად ქარწყლდება მხარეების მიერ ნაკისრი
          ვალდებულებები, ხოლო ის, რაც მხარეებმა მიიღეს, მათ უბრუნდებათ.
        </Li>
      </Section>

      <Section title="ხელშეკრულებაზე უარის თქმის გამონაკლისები">
        <p className="text-sm text-taupe-600 mb-3">
          ხელშეკრულებით გათვალისწინებულია, რომ მიწოდებული საქონლის ან
          მომსახურების ფასი დამოკიდებულია ფინანსურ ბაზარზე არსებულ ცვლილებაზე,
          რომელსაც მოვაჭრე ვერ აკონტროლებს.
        </p>
        <Li>
          მიწოდებული საქონელი ან მომსახურება მომხმარებლის ინდივიდუალური შეკვეთით
          არის დამზადებული
        </Li>
        <Li>
          მიწოდებული საქონელი მალფუჭებადია ან მას მოკლე ვარგისობის ვადა აქვს
        </Li>
        <Li>
          მომხმარებელს მიეწოდა ჰერმეტულად დაცული საქონელი, მისი ჰერმეტულობა
          მიწოდების შემდეგ დაირღვა და საქონლის დაბრუნება შეუძლებელია
          ჯანმრთელობის ან ჰიგიენური ნორმების დაცვის გამო
        </Li>
        <Li>
          მიწოდებული საქონელი მიწოდების დროს, მისი მახასიათებლებიდან
          გამომდინარე, განუყოფლად შეერწყა სხვა საქონელს
        </Li>
        <Li>
          ხელშეკრულება დაიდო უძრავი ქონების, საქონლის გადაზიდვის, სატრანსპორტო
          საშუალების ქირავნობის, კვების ან დასვენებასთან დაკავშირებულ
          მომსახურებაზე და მასში მითითებულია ხელშეკრულების შესრულების
          განსაზღვრული თარიღი
        </Li>
        <Li>
          ხელშეკრულებით გათვალისწინებულია სპორტული ან კულტურული ღონისძიების
          ბილეთის მიწოდება, გარდა იმ შემთხვევისა, როდესაც ხელშეკრულებით
          განსაზღვრულია ბილეთის დაბრუნების შესაძლებლობა
        </Li>
        <Li>
          მომხმარებელს <strong>არ აქვს</strong> უფლება, უარი თქვას იმ საქონელზე
          ან მომსახურებაზე, რომლის ფასი <strong>30 ლარს</strong> არ აღემატება
        </Li>
      </Section>

      <Section title="ფორს-მაჟორი">
        <Li>
          არც ერთი მხარე არ აგებს პასუხს ნაკისრი ვალდებულების
          შეუსრულებლობისთვის, თუ შეუსრულებლობა გამოწვეულია სტიქიური და
          ტექნოლოგიური კატასტროფებით, ხანძრით, საომარი მოქმედებით, სამთავრობო
          გადაწყვეტილებებით და ეს მოვლენები დაიწყო ან განვითარდა შეკვეთის
          შეძენის შემდეგ.
        </Li>
        <Li>
          ასეთ შემთხვევაში შესრულების ვადა გაგრძელდება დაუძლეველი ძალის
          გარემოების მოქმედების ხანგრძლივობის შესაბამისად.
        </Li>
        <Li>
          მხარე, რომელსაც წამოეჭრა დაუძლეველი ძალის გარემოება, ვალდებულია ასეთი
          გარემოების, მისი შესაძლო ხანგრძლივობისა და შეწყვეტის შესახებ
          შეატყობინოს მეორე მხარეს.
        </Li>
        <Li>
          შეტყობინებაში ასახული ფაქტები დადასტურებული უნდა იყოს შესაბამისი
          რეგიონის სავაჭრო, სამრეწველო, ან სხვა კომპეტენტური ორგანოს მიერ.
        </Li>
        <Li>
          არშეტყობინება ან დაგვიანებით შეტყობინება უფლებას ართმევს მხარეს,
          გამოიყენოს დაუძლეველი ძალის მოვლენები პასუხისმგებლობისგან
          განთავისუფლების საფუძვლად.
        </Li>
      </Section>
    </div>
  );
}

interface SectionProps {
  title: string;
  children: ReactNode;
}

function Section({ title, children }: SectionProps) {
  return (
    <section className="mb-8">
      <h2 className="font-headline text-2xl text-taupe-800 mb-4 pb-2 border-b border-taupe-200">
        {title}
      </h2>
      <ul className="space-y-3">{children}</ul>
    </section>
  );
}

interface LiProps {
  children: ReactNode;
}

function Li({ children }: LiProps) {
  return (
    <li className="flex gap-3 text-sm text-taupe-700 leading-relaxed">
      <span className="mt-1.5 shrink-0 w-1.5 h-1.5 rounded-full bg-accent" />
      <span>{children}</span>
    </li>
  );
}

function SubLi({ children }: LiProps) {
  return (
    <li className="flex gap-2 text-sm text-taupe-600 leading-relaxed">
      <span className="mt-2 shrink-0 w-1 h-1 rounded-full bg-taupe-400" />
      <span>{children}</span>
    </li>
  );
}


// ==== ./frontend/src/features/legal/index.ts ====
export { default as TermsAndConditions } from "./components/TermsAndConditions";


// ==== ./frontend/src/features/navbar/components/Navbar.tsx ====
import { useState, useEffect } from "react";
import { cn } from "src/lib/cn";
import { NavBrandLogo } from "./NavBrandLogo";
import { NavBurger } from "./NavBurger";
import { NavCartButton } from "./NavCartButton";
import { NavMenu } from "./NavMenu";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [scrolled, setScrolled] = useState<boolean>(false);

  const toggle = () => setIsOpen((prev) => !prev);
  const close = () => setIsOpen(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-50 transition-all duration-300",
          scrolled
            ? "bg-base-100/90 backdrop-blur-md shadow-sm border-b border-pink-200"
            : "bg-base-100 border-b border-transparent",
        )}
      >
        <div className="navbar max-w-7xl mx-auto px-4 md:px-6 min-h-16">
          <div className="navbar-start">
            <NavBurger isOpen={isOpen} onClick={toggle} />
          </div>
          <div className="navbar-center">
            <NavBrandLogo />
          </div>
          <div className="navbar-end gap-1">
            <NavCartButton />
          </div>
        </div>
      </header>

      <div
        onClick={close}
        className={cn(
          "fixed inset-0 z-40 bg-taupe-900/20 backdrop-blur-sm transition-opacity duration-300",
          isOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none",
        )}
      />

      <nav
        aria-label="მთავარი ნავიგაცია"
        inert={!isOpen ? true : undefined}
        className={cn(
          "fixed top-16 left-0 right-0 z-40 bg-base-100 border-b border-pink-200 transition-all duration-300 ease-out overflow-hidden",
          isOpen ? "max-h-96 opacity-100 shadow-lg" : "max-h-0 opacity-0",
        )}
      >
        <NavMenu onClose={close} />
      </nav>
    </>
  );
};

export default Navbar;


// ==== ./frontend/src/features/navbar/components/NavBrandLogo.tsx ====
import { Link } from "react-router";

export const NavBrandLogo = () => (
  <Link to="/" className="flex flex-col items-center leading-none group">
    <span
      className="font-script text-2xl md:text-3xl italic text-taupe-700
                     group-hover:text-taupe-900 transition-colors duration-200"
    >
      BeautyCode
    </span>
    <span className="font-label text-[10px] tracking-[0.3em] uppercase text-taupe-400 hidden md:block">
      სილამაზის კოდი
    </span>
  </Link>
);


// ==== ./frontend/src/features/navbar/components/NavBurger.tsx ====
import { cn } from "src/lib/cn";

interface NavBurgerProps {
  isOpen: boolean;
  onClick: () => void;
}

export const NavBurger = ({ isOpen, onClick }: NavBurgerProps) => (
  <button
    aria-label={isOpen ? "მენიუს დახურვა" : "მენიუს გახსნა"}
    aria-expanded={isOpen}
    onClick={onClick}
    className="btn btn-ghost btn-circle text-taupe-600 hover:bg-pink-100 hover:text-taupe-800
               transition-colors duration-200"
  >
    <div className="relative w-5 h-5">
      <span
        className={cn(
          "absolute left-0 h-px bg-current rounded-full transition-all duration-300",
          isOpen ? "top-2 w-5 rotate-45" : "top-1 w-5 rotate-0",
        )}
      />
      <span
        className={cn(
          "absolute left-0 top-2 h-px bg-current rounded-full transition-all duration-300",
          isOpen ? "opacity-0 w-0" : "opacity-100 w-4",
        )}
      />
      <span
        className={cn(
          "absolute left-0 h-px bg-current rounded-full transition-all duration-300",
          isOpen ? "top-2 w-5 -rotate-45" : "top-3 w-5 rotate-0",
        )}
      />
    </div>
  </button>
);


// ==== ./frontend/src/features/navbar/components/NavCartButton.tsx ====
import { ShoppingCart } from "lucide-react";
import { Link } from "react-router";
import { useCart } from "src/features/cart";

export const NavCartButton = () => {
  const count = useCart().length;

  return (
    <Link
      to="/cart"
      aria-label={`კალათა — ${count} პროდუქტი`}
      className="relative inline-flex h-11 w-11 items-center justify-center rounded-full text-taupe-600 transition-colors duration-200 hover:bg-pink-100 hover:text-taupe-800"
    >
      {count > 0 && (
        <span className="absolute right-0 top-0 inline-flex h-5 min-w-[20px] translate-x-1/4 -translate-y-1/4 items-center justify-center rounded-full bg-pink-400 text-[10px] font-semibold leading-none text-pink-50 shadow-sm md:h-5.5 md:min-w-[22px] md:text-xs">
          {count > 99 ? "99+" : count}
        </span>
      )}

      <ShoppingCart size={24} />
    </Link>
  );
};


// ==== ./frontend/src/features/navbar/components/NavMenu.tsx ====
import { NavLink } from "react-router";
import { NAV_ITEMS } from "src/constants";
import { cn } from "src/lib/cn";

interface NavMenuProps {
  onClose: () => void;
}

export const NavMenu = ({ onClose }: NavMenuProps) => (
  <ul className="menu menu-lg px-6 py-4 gap-1 max-w-7xl mx-auto">
    {NAV_ITEMS.map((item, index) => (
      <li key={item.label}>
        <NavLink
          to={item.to}
          end={item.to === "/"}
          onClick={onClose}
          className={({ isActive }) =>
            cn(
              "flex items-center gap-4 rounded-2xl px-4 py-3 transition-all duration-200 font-body text-sm border-l-2",
              isActive
                ? "bg-pink-100 text-taupe-800 border-pink-400"
                : "text-taupe-500 hover:bg-pink-50 hover:text-taupe-700 border-transparent",
            )
          }
        >
          <span className="font-label text-[10px] text-taupe-400 w-5 shrink-0">
            0{index + 1}
          </span>
          <span className="font-semibold tracking-wider uppercase text-xs md:text-sm">
            {item.label}
          </span>
        </NavLink>
      </li>
    ))}
  </ul>
);


// ==== ./frontend/src/features/navbar/index.ts ====
export { default as Navbar } from "./components/Navbar";

// ==== ./frontend/src/features/product/categoryContext.ts ====
import { createContext, useContext } from "react";
import type { CategoryContextValue } from "./types";

export const CategoryContext = createContext<CategoryContextValue | null>(null);

export const useCategory = (): CategoryContextValue => {
  const ctx = useContext(CategoryContext);
  if (!ctx) {
    throw new Error("useCategory must be used within a CategoryProvider");
  }
  return ctx;
};


// ==== ./frontend/src/features/product/CategoryProvider.tsx ====
import { useState, type ReactNode } from "react";
import { CategoryContext } from "./categoryContext";
import type { CategoryValue } from "./types";

interface CategoryProviderProps {
  children: ReactNode;
}

const CategoryProvider = ({ children }: CategoryProviderProps) => {
  const [productCategory, setProductCategory] = useState<CategoryValue>("all");

  return (
    <CategoryContext.Provider value={[productCategory, setProductCategory]}>
      {children}
    </CategoryContext.Provider>
  );
};

export default CategoryProvider;


// ==== ./frontend/src/features/product/components/FeaturedProductsSkeleton.tsx ====
const CARD_HEIGHTS = ["h-64", "h-80", "h-56", "h-72", "h-60", "h-76"];

interface FeaturedProductsSkeletonProps {
  count?: number;
}

export const FeaturedProductsSkeleton = ({
  count = 3,
}: FeaturedProductsSkeletonProps) => (
  <section
    aria-label="პროდუქტები იტვირთება..."
    aria-busy="true"
    className="px-6 py-12 md:py-24"
  >
    <div className="max-w-7xl mx-auto">
      <header className="mb-12 md:mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-3">
          <div className="skeleton h-3 w-24 rounded-full" />
          <div className="skeleton h-9 w-64 rounded-lg" />
        </div>
        <div className="space-y-2 max-w-md w-full">
          <div className="skeleton h-4 w-full rounded-lg" />
          <div className="skeleton h-4 w-4/5 rounded-lg" />
        </div>
      </header>

      <div className="columns-1 md:columns-2 lg:columns-3 gap-8">
        {Array.from({ length: count }).map((_, i) => (
          <div key={i} className="break-inside-avoid mb-8">
            <div
              className={`skeleton rounded-2xl w-full ${CARD_HEIGHTS[i % CARD_HEIGHTS.length]} mb-4`}
            />
            <div className="flex justify-between items-start gap-3 px-1">
              <div className="space-y-2 flex-1">
                <div className="skeleton h-3 w-16 rounded-full" />
                <div className="skeleton h-5 w-3/4 rounded-lg" />
              </div>
              <div className="space-y-2 shrink-0">
                <div className="skeleton h-5 w-20 rounded-lg" />
                <div className="skeleton h-3 w-14 rounded-full" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);


// ==== ./frontend/src/features/product/components/FeaturedProducts.tsx ====
import { useProducts } from "src/hooks/useProducts";
import { FeaturedProductsSkeleton } from "./FeaturedProductsSkeleton";
import { ProductCard } from "./ProductCard";
import type { Product } from "../types";

const getUniqueProductsByCategory = (products: Product[]): Product[] =>
  Array.from(
    new Map(
      products
        .filter(({ badge }) => badge !== "Premium")
        .map((p) => [p.category, p]),
    ).values(),
  );

const FeaturedProducts = () => {
  const { data: products = [], isLoading } = useProducts();

  if (isLoading) return <FeaturedProductsSkeleton count={3} />;

  const uniqueProducts = getUniqueProductsByCategory(products);

  return (
    <section className="px-6 py-12 md:py-24">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8 md:mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6 text-taupe-700">
          <div>
            <span className="font-label text-xs uppercase tracking-[0.3em] block mb-2 text-taupe-500">
              The Essentials
            </span>
            <h3 className="font-headline text-2xl md:text-4xl text-taupe-800">
              გამორჩეული კოლექცია
            </h3>
          </div>
          <p className="max-w-md font-body italic leading-relaxed text-taupe-500">
            აღმოაჩინეთ სილამაზის ინოვაციური მოწყობილობები, რომლებიც შექმნილია
            თქვენი ყოველდღიურობის გასაუმჯობესებლად.
          </p>
        </header>

        <div className="columns-2 md:columns-3 gap-4 md:gap-6">
          {uniqueProducts.map((product) => (
            <ProductCard key={product.id} variant="featured" {...product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;


// ==== ./frontend/src/features/product/components/ProductCard.tsx ====
import { cva, type VariantProps } from "class-variance-authority";
import { Plus } from "lucide-react";
import { cn } from "src/lib/cn";

const card = cva("group relative", {
  variants: {
    variant: {
      catalog: "",
      featured:
        "break-inside-avoid mb-6 rounded-2xl bg-base-200 shadow-sm hover:shadow-md transition-shadow duration-200",
    },
  },
  defaultVariants: { variant: "catalog" },
});

const figure = cva("overflow-hidden bg-pink-50", {
  variants: {
    variant: {
      catalog: "aspect-square rounded-2xl p-4 mb-3",
      featured: "rounded-t-2xl",
    },
  },
  defaultVariants: { variant: "catalog" },
});

interface ProductCardProps extends VariantProps<typeof card> {
  imgUrl: string;
  badge: string;
  title: string;
  newPrice: number;
  oldPrice?: number | null;
  description?: string;
  offset?: boolean;
  onAddToCart?: () => void;
}

export const ProductCard = ({
  imgUrl,
  badge,
  title,
  newPrice,
  oldPrice,
  variant = "catalog",
  description,
  offset = false,
  onAddToCart,
}: ProductCardProps) => {
  const titleId = `product-${title?.replace(/\s+/g, "-").toLowerCase()}`;

  return (
    <article
      aria-labelledby={titleId}
      className={cn(
        card({ variant }),
        offset && variant === "catalog" && "md:mt-16",
      )}
    >
      <div className={figure({ variant })}>
        <img
          src={imgUrl}
          alt={title}
          loading="lazy"
          className={cn(
            "w-full object-contain transition-transform duration-300 group-hover:scale-[1.03]",
            variant === "catalog" ? "h-full" : "h-auto",
          )}
        />
      </div>

      <div className={cn(variant === "featured" ? "p-4" : "px-0.5")}>
        <div className="flex justify-between items-start gap-3">
          <div className="min-w-0">
            <span className="font-label text-[10px] uppercase tracking-widest text-pink-400 font-semibold">
              {badge}
            </span>
            <p
              id={titleId}
              className={cn(
                "font-headline text-taupe-700 leading-snug truncate",
                variant === "featured" ? "text-lg mt-0.5" : "text-base mt-0.5",
              )}
            >
              {title}
            </p>
          </div>
          {variant === "featured" && (
            <div className="text-right shrink-0">
              <span className="font-headline text-base whitespace-nowrap text-taupe-700">
                {newPrice} ₾
              </span>
              {oldPrice != null && (
                <span className="font-label text-xs text-taupe-400 line-through block">
                  {oldPrice} ₾
                </span>
              )}
            </div>
          )}
        </div>

        {description && variant === "catalog" && (
          <p className="font-body text-xs text-taupe-500 line-clamp-1 mt-1 leading-relaxed">
            {description}
          </p>
        )}

        {variant === "catalog" && (
          <div className="mt-2 flex items-center justify-between">
            <div className="flex items-baseline gap-1.5">
              <span className="text-base font-bold text-taupe-700">
                {newPrice} ₾
              </span>
              {oldPrice != null && (
                <span className="text-xs text-taupe-400 line-through font-label">
                  {oldPrice} ₾
                </span>
              )}
            </div>
            <button
              onClick={onAddToCart}
              aria-label={`${title} კალათაში დამატება`}
              className="btn btn-accent btn-sm btn-circle shadow-sm hover:scale-105 transition-transform duration-150"
            >
              <Plus size={16} />
            </button>
          </div>
        )}
      </div>
    </article>
  );
};


// ==== ./frontend/src/features/product/components/ProductCatalogGrid.tsx ====
import { useCartDispatch } from "src/features/cart";
import { useProducts } from "src/hooks/useProducts";
import { useCategory } from "../categoryContext";
import { ProductCard } from "./ProductCard";
import { ProductCatalogSkeleton } from "./ProductCatalogSkeleton";

export const ProductCatalogGrid = () => {
  const dispatch = useCartDispatch();
  const [activeCategory] = useCategory();
  const { data: products = [], isLoading } = useProducts(activeCategory);

  if (isLoading) return <ProductCatalogSkeleton count={6} />;

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-8 md:gap-x-6 md:gap-y-10 mt-8">
      {products.map((product, index) => (
        <ProductCard
          key={product.id}
          variant="catalog"
          offset={index % 3 === 1}
          description={product.features?.[0]}
          onAddToCart={() => dispatch({ action: "ADD", item: product })}
          {...product}
        />
      ))}
    </div>
  );
};


// ==== ./frontend/src/features/product/components/ProductCatalogSkeleton.tsx ====
interface ProductCatalogSkeletonProps {
  count?: number;
}

export const ProductCatalogSkeleton = ({
  count = 6,
}: ProductCatalogSkeletonProps) => (
  <div
    aria-label="პროდუქტები იტვირთება..."
    aria-busy="true"
    className="grid grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-8 md:gap-x-6 md:gap-y-10 mt-8"
  >
    {Array.from({ length: count }).map((_, i) => (
      <div key={i} className={`relative ${i % 3 === 1 ? "md:mt-16" : ""}`}>
        <div className="skeleton aspect-square w-full rounded-2xl mb-3" />
        <div className="px-0.5 space-y-1.5">
          <div className="skeleton h-2.5 w-12 rounded-full" />
          <div className="skeleton h-4 w-3/4 rounded-lg" />
          <div className="flex justify-between items-center pt-1">
            <div className="skeleton h-4 w-14 rounded-lg" />
            <div className="skeleton h-7 w-7 rounded-full" />
          </div>
        </div>
      </div>
    ))}
  </div>
);


// ==== ./frontend/src/features/product/components/ProductCategories.tsx ====
import { CATEGORIES } from "src/constants";
import { cn } from "src/lib/cn";
import { useCategory } from "../categoryContext";

export const ProductCategories = () => {
  const [activeCategory, setCategory] = useCategory();

  return (
    <div className="flex gap-2 mb-12 overflow-x-auto pb-3 no-scrollbar">
      {CATEGORIES.map(({ label, value }) => (
        <button
          key={value}
          onClick={() => setCategory(value)}
          className={cn(
            "btn btn-sm rounded-full whitespace-nowrap font-label tracking-widest uppercase text-xs transition-all duration-200",
            activeCategory === value
              ? "btn-accent shadow-sm"
              : "bg-base-200 text-taupe-500 border-0 hover:bg-pink-100 hover:text-taupe-700",
          )}
        >
          {label}
        </button>
      ))}
    </div>
  );
};


// ==== ./frontend/src/features/product/components/ProductsCatalog.tsx ====
import { ProductCatalogGrid } from "./ProductCatalogGrid";
import { ProductCategories } from "./ProductCategories";

const ProductsCatalog = () => (
  <main className="max-w-7xl mx-auto px-6 pt-6 pb-16 md:pb-32">
    <header className="mb-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <span className="font-label text-[11px] uppercase tracking-[0.25em] text-on-surface-variant mb-3 block">
            კოლექცია 2026
          </span>
          <h1 className="font-headline text-2xl md:text-5xl text-primary leading-none tracking-tighter">
            კატალოგი
          </h1>
        </div>
        <p className="font-body text-base text-on-surface-variant italic max-w-xs md:text-right">
          აღმოაჩინეთ სილამაზის ტექნოლოგიების ახალი ერა თქვენს ყოველდღიურობაში.
        </p>
      </div>
    </header>
    <ProductCategories />
    <ProductCatalogGrid />
  </main>
);

export default ProductsCatalog;


// ==== ./frontend/src/features/product/index.ts ====
export { default as CategoryProvider } from "./CategoryProvider";

export { CategoryContext, useCategory } from "./categoryContext";

export { default as FeaturedProducts } from "./components/FeaturedProducts";
export { default as ProductsCatalog } from "./components/ProductsCatalog";


// ==== ./frontend/src/features/product/types.ts ====
import type { Dispatch, SetStateAction } from "react";

export type { Product } from "src/types";
export type CategoryValue = string;

export type CategoryContextValue = [
  CategoryValue,
  Dispatch<SetStateAction<CategoryValue>>,
];


// ==== ./frontend/src/features/profile/components/ProfileAccountField.tsx ====
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


// ==== ./frontend/src/features/profile/components/ProfileAccount.tsx ====
import { SectionTitle } from "../../../components/SectionTitle";
import { ProfileAccountField } from "./ProfileAccountField";
import type { User } from "../types";

interface ProfileAccountProps {
  user: User;
}

export const ProfileAccount = ({ user }: ProfileAccountProps) => (
  <section className="flex flex-col gap-6">
    <SectionTitle>ანგარიში</SectionTitle>
    <div className="grid grid-cols-2 gap-6">
      <ProfileAccountField
        label="სახელი"
        name="firstName"
        type="text"
        value={user.firstName}
      />
      <ProfileAccountField
        label="გვარი"
        name="lastName"
        type="text"
        value={user.lastName}
      />
    </div>
    <ProfileAccountField
      label="ელ-ფოსტა"
      name="email"
      type="email"
      value={user.email}
    />
    <ProfileAccountField
      label="ტელეფონი"
      name="phone"
      type="tel"
      value={user.phone}
    />
  </section>
);


// ==== ./frontend/src/features/profile/components/ProfileFallback.tsx ====
export const ProfileFallback = () => (
  <div
    aria-label="პროფილი იტვირთება..."
    aria-busy="true"
    className="min-h-screen flex justify-center items-center pt-16 px-6"
  >
    <div className="w-full max-w-sm flex flex-col gap-10 pb-16">
      <div className="flex items-center gap-5">
        <div className="skeleton w-20 h-20 rounded-full shrink-0" />
        <div className="flex flex-col gap-2 flex-1">
          <div className="skeleton h-8 w-32 rounded" />
          <div className="skeleton h-3 w-44 rounded-full" />
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-4 mb-2">
          <div className="skeleton h-px w-6" />
          <div className="skeleton h-2.5 w-28 rounded-full" />
          <div className="skeleton h-px flex-1" />
        </div>

        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={i}
            className="flex justify-between items-center py-4 border-b border-taupe-100"
          >
            <div className="space-y-2 flex-1">
              <div className="skeleton h-4 w-3/4 rounded" />
              <div className="skeleton h-3 w-1/2 rounded-full" />
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-6">
        <div className="flex items-center gap-4 mb-2">
          <div className="skeleton h-px w-6" />
          <div className="skeleton h-2.5 w-20 rounded-full" />
          <div className="skeleton h-px flex-1" />
        </div>

        <div className="grid grid-cols-2 gap-6">
          {Array.from({ length: 2 }).map((_, i) => (
            <div key={i} className="space-y-2">
              <div className="skeleton h-2.5 w-12 rounded-full" />
              <div className="skeleton h-5 w-full rounded" />
            </div>
          ))}
        </div>
        {Array.from({ length: 2 }).map((_, i) => (
          <div key={i} className="space-y-2">
            <div className="skeleton h-2.5 w-16 rounded-full" />
            <div className="skeleton h-5 w-full rounded" />
          </div>
        ))}
      </div>

      <div className="flex justify-between items-center pt-6 border-t border-taupe-100">
        <div className="skeleton h-3 w-16 rounded-full" />
        <div className="skeleton h-3 w-20 rounded-full" />
      </div>
    </div>
  </div>
);


// ==== ./frontend/src/features/profile/components/ProfileFooter.tsx ====
import { useFormFetcher } from "src/hooks/useFormFetcher";

export const ProfileFooter = () => {
  const { fetcher, isLoading } = useFormFetcher();

  return (
    <footer className="flex justify-between items-center pt-6 border-t border-taupe-200">
      <a
        href="mailto:13beauty.code@gmail.com"
        className="link link-hover text-xs tracking-[0.18em] uppercase text-taupe-400"
      >
        დახმარება
      </a>
      <fetcher.Form method="post" action="/logout">
        <button
          type="submit"
          disabled={isLoading}
          className="text-taupe-400 hover:text-error tracking-[0.18em] text-xs uppercase transition-colors duration-200
             disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
        >
          გამოსვლა
        </button>
      </fetcher.Form>
    </footer>
  );
};


// ==== ./frontend/src/features/profile/components/ProfileHero.tsx ====
import UserPng from "../../../assets/images/user.png";

interface ProfileHeroProps {
  name: string;
}

export const ProfileHero = ({ name }: ProfileHeroProps) => (
  <div className="flex items-center gap-5">
    <div className="relative shrink-0">
      <img
        src={UserPng}
        alt={name}
        className="w-20 h-20 rounded-full object-cover"
      />
      <span className="absolute bottom-1 right-1 w-3 h-3 rounded-full bg-green-400 ring-2 ring-pink-50" />
    </div>
    <div className="flex flex-col gap-1">
      <h1 className="text-2xl md:text-3xl font-semibold text-taupe-800 leading-none">
        {name}
      </h1>
      <p className="text-xs tracking-[0.18em] uppercase text-taupe-400">
        თქვენი პროფილი და შეკვეთები
      </p>
    </div>
  </div>
);


// ==== ./frontend/src/features/profile/components/ProfileOrderCard.tsx ====
import { Package } from "lucide-react";
import type { Order } from "../types";

const formatOrderDate = (dateStr: string): string =>
  new Intl.DateTimeFormat("ka-GE", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(dateStr));

type ProfileOrderCardProps = Order;

export const ProfileOrderCard = ({
  id,
  summary,
  date,
}: ProfileOrderCardProps) => (
  <div className="flex items-center gap-3 py-4 border-b border-taupe-100 last:border-0">
    <div className="w-9 h-9 rounded-full bg-pink-50 flex items-center justify-center text-pink-400 shrink-0">
      <Package size={16} />
    </div>
    <div className="flex flex-col gap-0.5 min-w-0">
      <p className="text-sm font-medium text-taupe-800 truncate">{summary}</p>
      <p className="text-xs tracking-[0.1em] uppercase text-taupe-400">
        {id} &middot; {formatOrderDate(date)}
      </p>
    </div>
  </div>
);


// ==== ./frontend/src/features/profile/components/ProfileOrders.tsx ====
import { PackageOpen } from "lucide-react";
import { SectionTitle } from "src/components/SectionTitle";
import { useOrders } from "src/hooks/useOrders";
import { ProfileOrderCard } from "./ProfileOrderCard";

export const ProfileOrders = () => {
  const { data: orders = [], isLoading, error } = useOrders();

  return (
    <section className="flex flex-col gap-2">
      <SectionTitle>ჩემი შეკვეთები</SectionTitle>

      {isLoading && (
        <div className="space-y-3 pt-2">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="skeleton h-14 w-full rounded-lg" />
          ))}
        </div>
      )}

      {error && (
        <p className="text-sm text-rose-400 tracking-wide py-4">
          შეცდომა შეკვეთების ჩატვირთვისას
        </p>
      )}

      {!isLoading &&
        !error &&
        (orders.length === 0 ? (
          <div className="flex flex-col items-center gap-2 py-8 text-taupe-300">
            <PackageOpen size={28} />
            <p className="text-sm text-taupe-400 tracking-wide">
              შეკვეთები არ გაქვს
            </p>
          </div>
        ) : (
          <div className="flex flex-col">
            {orders.map((order) => (
              <ProfileOrderCard key={order.id} {...order} />
            ))}
          </div>
        ))}
    </section>
  );
};


// ==== ./frontend/src/features/profile/components/Profile.tsx ====
import { useLoaderData } from "react-router";
import { ProfileAccount } from "./ProfileAccount";
import { ProfileFooter } from "./ProfileFooter";
import { ProfileHero } from "./ProfileHero";
import { ProfileOrders } from "./ProfileOrders";
import type { ProfileLoaderData } from "../types";

const Profile = () => {
  const { user } = useLoaderData() as ProfileLoaderData;

  if (!user) {
    return (
      <div className="min-h-screen flex justify-center items-center text-taupe-400 text-sm tracking-wide">
        მომხმარებლის მონაცემები ვერ ჩაიტვირთა
      </div>
    );
  }

  return (
    <div className="min-h-screen flex justify-center items-center pt-16 px-6">
      <div className="w-full max-w-sm flex flex-col gap-10 pb-16">
        <ProfileHero name={user.firstName} />
        <ProfileOrders />
        <ProfileAccount user={user} />
        <ProfileFooter />
      </div>
    </div>
  );
};

export default Profile;


// ==== ./frontend/src/features/profile/index.ts ====
export { profileLoader } from "./profileLoader";

export { default as Profile } from "./components/Profile";


// ==== ./frontend/src/features/profile/profileLoader.ts ====
import { redirect } from "react-router";
import { api } from "src/services/api";
import type { ProfileLoaderData, User } from "./types";

export const profileLoader = async (): Promise<ProfileLoaderData> => {
  const response = await api.get("/users/profile");

  if (!response.ok) {
    throw redirect("/login");
  }

  return { user: (await response.json()) as User };
};


// ==== ./frontend/src/features/profile/types.ts ====
export type { User, Order } from "src/types";

export interface ProfileLoaderData {
  user: import("src/types").User;
}


// ==== ./frontend/src/hooks/useFormFetcher.ts ====
import { useFetcher } from "react-router";

export const useFormFetcher = <T = unknown>() => {
  const fetcher = useFetcher<T>();

  return {
    fetcher,
    isLoading: fetcher.state !== "idle",
    data: fetcher.data,
  };
};


// ==== ./frontend/src/hooks/useOrders.ts ====
import { useQuery } from "@tanstack/react-query";
import { api } from "src/services/api";
import type { Order } from "src/types";

export const useOrders = (isAuthenticated: boolean = true) => {
  return useQuery<Order[]>({
    queryKey: ["orders"],
    queryFn: async () => {
      const res = await api.get("/users/orders");
      if (!res.ok) throw new Error("Failed to fetch orders");
      return res.json();
    },
    enabled: isAuthenticated,
    staleTime: 1000 * 60 * 2,
  });
};


// ==== ./frontend/src/hooks/useProducts.ts ====
import { useQuery } from "@tanstack/react-query";
import { api } from "src/services/api";
import type { Product } from "src/types";

export const useProducts = (category: string = "all") => {
  return useQuery<Product[]>({
    queryKey: ["products", category],
    queryFn: async ({ queryKey }) => {
      const [, category] = queryKey as [string, string];

      const url =
        category && category !== "all"
          ? `/products?category=${category}`
          : "/products";

      const res = await api.get(url);

      if (!res.ok) {
        throw new Error("Failed to fetch products");
      }

      return res.json();
    },
    staleTime: 1000 * 60 * 5,
  });
};


// ==== ./frontend/src/lib/cn.ts ====
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));


// ==== ./frontend/src/main.tsx ====
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";
import { ErrorPage } from "./components/ErrorPage";
import {
  Login,
  loginAction,
  logoutAction,
  Register,
  registerAction,
} from "./features/auth";
import { Cart, CartProvider } from "./features/cart";
import { BrandEthos, Hero, Home } from "./features/home";
import { TermsAndConditions } from "./features/legal";
import {
  CategoryProvider,
  FeaturedProducts,
  ProductsCatalog,
} from "./features/product";
import { Profile, profileLoader } from "./features/profile";
import { ProfileFallback } from "./features/profile/components/ProfileFallback";
import "./index.css";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: (
          <main>
            <Hero />
            <FeaturedProducts />
            <BrandEthos />
          </main>
        ),
      },
      {
        path: "cart",
        element: <Cart />,
      },
      {
        path: "profile",
        element: <Profile />,
        loader: profileLoader,
        HydrateFallback: ProfileFallback,
      },
      {
        path: "products",
        element: (
          <CategoryProvider>
            <ProductsCatalog />
          </CategoryProvider>
        ),
      },
      {
        path: "terms-and-conditions",
        element: <TermsAndConditions />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
    action: loginAction,
  },
  {
    path: "/logout",
    action: logoutAction,
  },
  {
    path: "/register",
    element: <Register />,
    action: registerAction,
  },
]);

const rootElement = document.getElementById("root");
if (!rootElement) {
  throw new Error("Root element #root not found");
}

createRoot(rootElement).render(
  <CartProvider>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </CartProvider>,
);


// ==== ./frontend/src/services/api.ts ====
const API_BASE = import.meta.env.VITE_API_URL;

interface RequestOptions extends Omit<RequestInit, "headers"> {
  headers?: Record<string, string>;
}

const request = async (
  url: string,
  { headers = {}, ...options }: RequestOptions = {},
): Promise<Response> => {
  const response = await fetch(`${API_BASE}${url}`, {
    credentials: "include",
    ...options,
    headers,
  });
  return response;
};

export const api = {
  get: (url: string, headers: Record<string, string> = {}) =>
    request(url, { method: "GET", headers }),

  post: (url: string, body: unknown, headers: Record<string, string> = {}) =>
    request(url, {
      method: "POST",
      headers: { "Content-Type": "application/json", ...headers },
      body: JSON.stringify(body),
    }),

  postForm: (
    url: string,
    params: Record<string, string>,
    headers: Record<string, string> = {},
  ) =>
    request(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        ...headers,
      },
      body: new URLSearchParams(params),
    }),
};


// ==== ./frontend/src/types.ts ====
export interface Product {
  id: string;
  title: string;
  badge: string;
  category: string;
  imgUrl: string;
  newPrice: number;
  oldPrice?: number | null;
  features?: string[];
}

export interface CartItem extends Product {
  quantity: number;
}

export type CartAction =
  | { action: "ADD"; item: Product }
  | { action: "INCREASE"; item: CartItem }
  | { action: "DECREASE"; item: CartItem }
  | { action: "REMOVE"; item: CartItem };

export interface User {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

export interface Order {
  id: string;
  summary: string;
  date: string;
}


// ==== ./frontend/src/vite-env.d.ts ====
/// <reference types="vite/client" />


// ==== ./frontend/vite.config.js ====
import babel from "@rolldown/plugin-babel";
import tailwindcss from "@tailwindcss/vite";
import react, { reactCompilerPreset } from "@vitejs/plugin-react";
import path from "node:path";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    babel({ presets: [reactCompilerPreset()] }),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      src: path.resolve(import.meta.dirname, "./src"),
    },
  },
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:8080",
        changeOrigin: true,
      },
    },
  },
});


// ==== ./merged.ts ====



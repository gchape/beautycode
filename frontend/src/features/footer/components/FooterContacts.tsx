import { Mail, MapPin, Phone } from "lucide-react";
import type { ReactNode } from "react";

interface ContactLink {
  href: string;
  icon: ReactNode;
  label: string;
}

const FacebookIcon = ({ size = 24 }) => (
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

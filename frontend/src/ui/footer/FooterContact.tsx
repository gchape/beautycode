import { Mail, MapPin, Phone } from "lucide-react";
import type { ReactNode } from "react";
import { FacebookGlyph } from "src/ui/icons/FacebookGlyph";

interface ContactLink {
  href: string;
  icon: ReactNode;
  label: string;
}

const CONTACT_LINKS: ContactLink[] = [
  {
    href: "https://www.facebook.com/Beatlovegeorgia",
    icon: <FacebookGlyph />,
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

export const FooterContact = () => (
  <div>
    <h5 className="text-xs uppercase tracking-[0.2em] text-taupe-600 mb-4">
      კონტაქტი
    </h5>
    <ul className="flex flex-col gap-3 text-taupe-500 text-sm list-none">
      {CONTACT_LINKS.map(({ href, icon, label }) => (
        <li key={href}>
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 no-underline hover:underline"
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

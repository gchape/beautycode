import {
  EmailIcon,
  FacebookIcon,
  LocationIcon,
  PhoneIcon,
} from "src/components/icons";

const CONTACT_LINKS = [
  {
    href: "https://www.facebook.com/Beatlovegeorgia",
    icon: <FacebookIcon />,
    label: "Beatlovegeorgia",
  },
  {
    href: "https://wa.me/995574074833",
    icon: <PhoneIcon />,
    label: "(+995) 574-074-833",
  },
  {
    href: "mailto:13beauty.code@gmail.com",
    icon: <EmailIcon />,
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
        <LocationIcon />
        თბილისი, საქართველო
      </li>
    </ul>
  </div>
);

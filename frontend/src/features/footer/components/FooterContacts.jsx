import { CONTACT_LINKS } from "../../data";

export const FooterContacts = () => (
  <div>
    <h5 className="text-xs uppercase tracking-[0.2em] text-taupe-600 mb-6">
      კონტაქტი
    </h5>
    <ul className="flex flex-col place-content-center gap-4 text-taupe-500 text-sm">
      {CONTACT_LINKS.map(({ href, icon, label }) => (
        <li key={href}>
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="w-fit flex items-center gap-1 no-underline relative after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:bg-taupe-400 after:transition-all after:duration-300 hover:after:w-full"
          >
            <span className="material-symbols-outlined text-base">{icon}</span>
            <span>{label}</span>
          </a>
        </li>
      ))}
      <li className="flex items-center gap-1">
        <span className="material-symbols-outlined text-base">location_on</span>
        თბილისი, საქართველო
      </li>
    </ul>
  </div>
);

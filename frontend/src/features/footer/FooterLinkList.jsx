const FooterLinkList = ({ title, items }) => (
  <div>
    <h5 className="font-label text-xs uppercase tracking-[0.2em] text-on-surface mb-6">
      {title}
    </h5>
    <ul className="space-y-4">
      {items.map((item) => (
        <li key={item}>
          <a
            href="#"
            className="font-body text-on-surface-variant hover:text-primary transition-colors no-underline"
          >
            {item}
          </a>
        </li>
      ))}
    </ul>
  </div>
);

export default FooterLinkList;

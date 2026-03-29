const Contacts = () => (
  <div>
    <h5 className="font-label text-xs uppercase tracking-[0.2em] text-on-surface mb-6">
      კონტაქტი
    </h5>

    <ul className="flex flex-col gap-4">
      <li>
        <a
          href="https://www.facebook.com/Beatlovegeorgia"
          target="_blank"
          rel="noopener noreferrer"
          className="font-body w-fit flex place-items-center gap-1 text-on-surface-variant no-underline relative after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:bg-on-surface-variant after:transition-all after:duration-300 hover:after:w-full"
        >
          <span class="material-symbols-outlined">public</span>
          Beatlovegeorgia
        </a>
      </li>

      <li>
        <a
          href="https://wa.me/995574074833"
          target="_blank"
          rel="noopener noreferrer"
          className="font-body w-fit flex place-items-center gap-1 text-on-surface-variant no-underline relative after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:bg-on-surface-variant after:transition-all after:duration-300 hover:after:w-full"
        >
          <span className="material-symbols-outlined">call</span>
          (+995) 574-074-833
        </a>
      </li>

      <li>
        <a
          href="mailto:13beauty.code@gmail.com"
          className="font-body w-fit flex place-items-center gap-1 text-on-surface-variant no-underline relative after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:bg-on-surface-variant after:transition-all after:duration-300 hover:after:w-full"
        >
          <span className="material-symbols-outlined">email</span>
          13beauty.code@gmail.com
        </a>
      </li>

      <li>
        <p className="font-body flex place-items-center gap-1 text-on-surface-variant">
          <span className="material-symbols-outlined">location_on</span>
          თბილისი, საქართველო
        </p>
      </li>
    </ul>
  </div>
);

export default Contacts;

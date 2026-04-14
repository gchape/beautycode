export const ProfileHero = ({ name }) => (
  <div className="flex items-center gap-5">
    <div className="relative shrink-0">
      <img
        src="/avatar/girl.png"
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

export const ProfileHero = ({ name }) => (
  <div className="flex items-center gap-5">
    <div className="relative shrink-0">
      <img
        src="/avatar/girl.png"
        alt={name}
        className="w-16 h-16 rounded-full object-cover"
      />
      <span className="absolute bottom-0.5 right-0.5 w-3 h-3 rounded-full bg-green-500 ring-2 ring-pink-50" />
    </div>
    <div>
      <h1 className="text-3xl font-light italic text-taupe-600 leading-tight">
        {name}
      </h1>
      <p className="mt-1 text-xs tracking-[0.16em] uppercase text-taupe-500">
        თქვენი პროფილი და შეკვეთები
      </p>
    </div>
  </div>
);

import { useNavigate } from "react-router";

export const SectionTitle = ({ children }) => (
  <div className="flex items-center gap-4 mb-6">
    <div className="w-6 h-px bg-taupe-400" />
    <span className="text-xs tracking-[0.22em] uppercase text-taupe-500">
      {children}
    </span>
    <div className="flex-1 h-px bg-taupe-400" />
  </div>
);

export const ProfileHero = ({ name }) => (
  <div className="flex items-center gap-5">
    <div className="relative shrink-0">
      <img
        alt={name}
        src="/girl.png"
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

export const OrderCard = ({ id, item, date }) => (
  <div className="flex justify-between items-center py-4 border-b border-taupe-200 last:border-0">
    <div>
      <p className="text-base font-medium tracking-wide text-taupe-800">
        {item}
      </p>
      <p className="mt-1 text-xs tracking-widest uppercase text-taupe-500">
        {id} &middot;{" "}
        {new Intl.DateTimeFormat("ka-GE", {
          day: "numeric",
          month: "short",
          year: "numeric",
        }).format(new Date(date))}
      </p>
    </div>
  </div>
);

export const OrderList = ({ orders }) => (
  <section>
    <SectionTitle>ჩემი შეკვეთები</SectionTitle>
    <div className="flex flex-col">
      {orders.map((o) => (
        <OrderCard key={o.id} {...o} />
      ))}
    </div>
  </section>
);

export const AccountField = ({ label, placeholder, type }) => (
  <div>
    <label className="block text-xs tracking-[0.16em] uppercase text-taupe-600 mb-2">
      {label}
    </label>
    <input
      type={type}
      placeholder={placeholder}
      className="w-full bg-transparent py-2 text-base font-medium tracking-wide text-taupe-800 border-b border-taupe-300 outline-none focus:border-taupe-600 transition-colors duration-200"
    />
  </div>
);

export const AccountForm = () => (
  <section>
    <SectionTitle>ანგარიში</SectionTitle>
    <div className="flex flex-col gap-7">
      <AccountField label="სახელი" placeholder="მარიამი" type="text" />
      <AccountField label="გვარი" placeholder="გელაშვილი" type="text" />
      <AccountField
        label="ელ-ფოსტა"
        placeholder="mariam.gelashvili@example.com"
        type="email"
      />
      <AccountField
        label="ტელეფონი"
        placeholder="(+995) 599-000-000"
        type="tel"
      />
    </div>
    <button className="mt-10 w-full py-3 text-xs tracking-[0.22em] font-bold text-taupe-600 border border-taupe-400 rounded-full hover:bg-pink-50 transition-colors duration-200 cursor-pointer">
      შენახვა
    </button>
  </section>
);

export const ProfileFooter = ({ logout }) => {
  const navigate = useNavigate();

  return (
    <footer className="flex justify-between pt-6 border-t border-taupe-200">
      <a
        href="#"
        className="text-xs tracking-[0.16em] uppercase text-blue-500 hover:text-blue-700 transition-colors duration-150"
      >
        დახმარება
      </a>
      <button
        onClick={() => {
          logout();
          navigate("/");
        }}
        className="text-xs tracking-[0.16em] uppercase text-red-400 hover:text-red-600 transition-colors duration-150 cursor-pointer"
      >
        გამოსვლა
      </button>
    </footer>
  );
};

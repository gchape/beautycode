import { useFetcher } from "react-router";

const SectionTitle = ({ children }) => (
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

const AccountField = ({ label, name, type, value, readOnly = true }) => (
  <div>
    <label className="block text-xs tracking-[0.16em] uppercase text-taupe-600 mb-2">
      {label}
    </label>
    <input
      name={name}
      type={type}
      value={value}
      readOnly={readOnly}
      onChange={() => {}} // suppress React warning for controlled readOnly inputs
      className="w-full bg-transparent py-2 text-base font-medium tracking-wide text-taupe-800
                 border-b border-taupe-300 outline-none focus:border-taupe-600
                 transition-colors duration-200 read-only:cursor-default"
    />
  </div>
);

export const ProfileAccount = ({ user }) => (
  <section className="flex flex-col gap-5">
    <SectionTitle>ანგარიში</SectionTitle>
    <div className="grid grid-cols-2 gap-4">
      <AccountField
        label="სახელი"
        name="firstName"
        type="text"
        value={user.firstName}
      />
      <AccountField
        label="გვარი"
        name="lastName"
        type="text"
        value={user.lastName}
      />
    </div>
    <AccountField
      label="ელ-ფოსტა"
      name="email"
      type="email"
      value={user.email}
    />
    <AccountField label="ტელეფონი" name="phone" type="tel" value={user.phone} />
  </section>
);

const formatOrderDate = (dateStr) =>
  new Intl.DateTimeFormat("ka-GE", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(dateStr));

export const OrderCard = ({ id, summary, date }) => (
  <div className="flex justify-between items-center py-4 border-b border-taupe-200 last:border-0">
    <div>
      <p className="text-base font-medium tracking-wide text-taupe-800">
        {summary}
      </p>
      <p className="mt-1 text-xs tracking-widest uppercase text-taupe-500">
        {id} &middot; {formatOrderDate(date)}
      </p>
    </div>
  </div>
);

export const ProfileOrders = ({ orders }) => (
  <section>
    <SectionTitle>ჩემი შეკვეთები</SectionTitle>
    {orders.length === 0 ? (
      <p className="text-sm text-taupe-400 tracking-wide py-4">
        შეკვეთები არ გაქვს
      </p>
    ) : (
      <div className="flex flex-col">
        {orders.map((order) => (
          <OrderCard key={order.id} {...order} />
        ))}
      </div>
    )}
  </section>
);

export const ProfileFooter = () => {
  const fetcher = useFetcher();
  const isLoggingOut = fetcher.state !== "idle";

  return (
    <footer className="flex justify-between pt-6 border-t border-taupe-200">
      <a
        href="mailto:13beauty.code@gmail.com"
        className="text-xs tracking-[0.16em] uppercase text-taupe-500
                   hover:text-taupe-700 transition-colors duration-150"
      >
        დახმარება
      </a>
      <fetcher.Form method="post" action="/logout">
        <button
          type="submit"
          disabled={isLoggingOut}
          className="text-xs tracking-[0.16em] uppercase text-red-400 hover:text-red-600
                     transition-colors duration-150 cursor-pointer
                     disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoggingOut ? "..." : "გამოსვლა"}
        </button>
      </fetcher.Form>
    </footer>
  );
};

const orders = [
  {
    id: "#1042",
    item: "Serum No. 5",
    date: "28 მარტი, 2026",
    status: "მიწოდებულია",
  },
  {
    id: "#1039",
    item: "Silk Brushes",
    date: "21 მარტი, 2026",
    status: "გზაშია",
  },
  {
    id: "#1031",
    item: "Rose Toner",
    date: "10 მარტი, 2026",
    status: "მიწოდებულია",
  },
];

const Profile = () => {
  return (
    <div className="min-h-screen text-taupe-600 bg-white p-8 space-y-10">
      <div className="flex items-center gap-6">
        <img
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuDBPf0f0u9i_OF61Vj1uDgmZZRD2aVbJpQ4LktqTJLcwDLueYQ7EjMH8yMG1sxuHjr1fwFtrPqVSVyqti57PcIblc71_FSxF56__5El_5J5BJEJ3z8r9oLAPR2Nmh7mbOW7dCbeh7QPa27KaK7w9vb8HjSTK0v1s-ihSDwAwNcOb-8UAJrwPe99km0B_xMsimoOwkZGECMfnAN-eEW9CKM8hftNP_muerY1x5ypCpC-bSDxAFSWqoEZ4XN17084yqOeyDhd3QAeds0y"
          alt="Mariam"
          className="w-20 h-20 rounded-full object-cover"
        />
        <div>
          <h1 className="text-2xl font-headline">მარიამი</h1>
          <p className="text-sm text-taupe-500">თქვენი პროფილი და შეკვეთები</p>
        </div>
      </div>

      <div>
        <h2 className="text-lg font-headline mb-4">ჩემი შეკვეთები</h2>
        <div className="space-y-3">
          {orders.map((o) => (
            <div
              key={o.id}
              className="flex justify-between items-center p-4 border border-stone-200 rounded-lg bg-white"
            >
              <div>
                <div className="font-medium">{o.item}</div>
                <div className="text-xs text-on-surface-variant">
                  {o.id} • {o.date}
                </div>
              </div>

              <span
                className={`text-xs px-2 py-1 rounded ${
                  o.status === "მიწოდებულია"
                    ? "bg-pink-100 text-taupe-600"
                    : "bg-pink-50 text-taupe-500"
                }`}
              >
                {o.status}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-lg mb-4">ანგარიში</h2>

        <div className="space-y-4">
          {[
            { label: "სახელი", value: "მარიამი", type: "text" },
            { label: "გვარი", value: "გელაშვილი", type: "text" },
            { label: "ელ-ფოსტა", value: "mariam@example.com", type: "email" },
            { label: "ტელეფონი", value: "+995 555 00 00 00", type: "tel" },
          ].map(({ label, value, type }) => (
            <div key={label}>
              <label className="block text-xs text-taupe-500 mb-1">
                {label}
              </label>
              <input
                type={type}
                defaultValue={value}
                className="w-full bg-transparent border-b border-stone-400 focus:border-taupe-600 outline-none py-2"
              />
            </div>
          ))}
        </div>

        <button className="mt-6 w-full bg-pink-100 text-taupe-600 tracking-wide py-2 rounded hover:opacity-90 transition cursor-pointer">
          შენახვა
        </button>
      </div>

      <div className="flex justify-between pt-6 border-t border-stone-300">
        <a href="#" className="text-sm text-blue-400">
          დახმარება
        </a>
        <a href="#" className="text-sm text-red-400">
          გამოსვლა
        </a>
      </div>
    </div>
  );
};

export default Profile;

const CartItem = ({ item, onIncrease, onDecrease, onRemove }) => (
  <div className="bg-pink-50 p-6 rounded-xl flex flex-col md:flex-row gap-8 items-center md:items-start">
    <div className="w-full md:w-48 h-48 rounded-lg overflow-hidden shrink-0 border border-stone-200">
      <img
        src={item.imgUrl}
        alt={item.title}
        className="w-full h-full object-contain p-4"
      />
    </div>

    <div className="grow flex flex-col justify-between h-full py-2">
      <div className="space-y-3">
        <div className="flex justify-between place-items-center">
          <h3 className="text-lg md:text-xl font-headline font-bold text-taupe-800 leading-tight max-w-md">
            {item.title}
          </h3>

          <button
            onClick={() => onRemove(item.id)}
            className="text-taupe-400 hover:text-red-500 transition-colors p-2 cursor-pointer"
          >
            <span className="material-symbols-outlined">delete</span>
          </button>
        </div>

        <p className="font-label text-xs text-taupe-500 uppercase tracking-wider">
          {item.badge}
        </p>
      </div>

      <div className="mt-8 flex flex-wrap justify-between items-end gap-6">
        <div className="flex items-center bg-pink-100 text-taupe-500 rounded-full px-2 py-1">
          <button
            onClick={() => onDecrease(item.id)}
            className="w-10 h-10 flex items-center justify-center hover:opacity-80 rounded-full transition-opacity cursor-pointer"
          >
            <span className="material-symbols-outlined">remove</span>
          </button>

          <span className="w-12 text-center">{item.quantity}</span>

          <button
            onClick={() => onIncrease(item.id)}
            className="w-10 h-10 flex items-center justify-center hover:opacity-80 rounded-full transition-opacity cursor-pointer"
          >
            <span className="material-symbols-outlined">add</span>
          </button>
        </div>

        <div className="text-right">
          <span className="block font-label text-xs text-taupe-600 uppercase tracking-widest mb-1">
            ფასი
          </span>

          <span className="text-xl md:text-2xl font-headline font-bold text-taupe-700">
            {(item.newPrice * item.quantity).toFixed(0)} ₾
          </span>

          {item.oldPrice && (
            <span className="block font-label text-sm text-taupe-400 line-through">
              {(item.oldPrice * item.quantity).toFixed(0)} ₾
            </span>
          )}
        </div>
      </div>
    </div>
  </div>
);

const CartSummary = ({ total }) => (
  <div className="sticky top-32 bg-pink-100 p-8 rounded-xl shadow-sm">
    <h3 className="text-xl md:text-2xl font-bold text-taupe-600 mb-8">
      შეკვეთის დეტალები
    </h3>

    <div className="space-y-6 text-taupe-500">
      <div className="flex justify-between items-center">
        <span className="font-label text-sm uppercase tracking-widest">
          ჯამი
        </span>

        <span className="font-label font-semibold">{total} ₾</span>
      </div>

      <div className="flex justify-between items-center">
        <span className="font-label text-sm uppercase tracking-widest">
          მიწოდება
        </span>

        <span className="font-label font-semibold">უფასო</span>
      </div>

      <div className="pt-6 mt-6 text-taupe-600">
        <div className="flex justify-between items-end mb-8">
          <span className="font-headline text-lg md:text-xl font-bold">
            სულ:
          </span>

          <span className="text-xl md:text-2xl font-headline font-bold tracking-tight">
            {total} ₾
          </span>
        </div>

        <button className="w-full py-3 text-sm md:text-md border border-stone-400 rounded-full font-label font-bold uppercase tracking-[0.15em] transition-shadow duration-300 hover:shadow-lg flex items-center justify-center gap-3 cursor-pointer">
          გადახდა
          <span className="material-symbols-outlined text-lg">
            arrow_forward
          </span>
        </button>
      </div>
    </div>

    <div className="mt-8 flex items-center gap-4 p-4">
      <span className="material-symbols-outlined text-taupe-600">
        verified_user
      </span>

      <p className="text-[11px] font-label text-taupe-500 uppercase tracking-tighter leading-relaxed">
        უსაფრთხო გადახდა გარანტირებულია პარტნიორი ბანკების მიერ
      </p>
    </div>
  </div>
);

const EmptyCart = () => (
  <div className="col-span-full flex flex-col items-center justify-center py-32 gap-6">
    <span className="material-symbols-outlined text-6xl text-taupe-400">
      shopping_bag
    </span>

    <p className="font-headline text-2xl text-taupe-500">კალათა ცარიელია</p>

    <a
      href="/products"
      className="font-label text-xs uppercase tracking-widest text-taupe-600 border-b border-taupe-400 hover:border-taupe-600 pb-0.5 transition-colors"
    >
      პროდუქტების ნახვა
    </a>
  </div>
);

export { CartItem, CartSummary, EmptyCart };

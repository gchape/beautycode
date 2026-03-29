const CartItem = ({ item, onIncrease, onDecrease, onRemove }) => (
  <div className="bg-surface-container-lowest p-6 rounded-xl flex flex-col md:flex-row gap-8 items-center md:items-start hover:bg-surface-container-low shadow-sm">
    <div className="w-full md:w-48 h-48 rounded-lg overflow-hidden shrink-0 bg-surface-container">
      <img
        src={item.imgUrl}
        alt={item.title}
        className="w-full h-full object-contain p-4"
      />
    </div>

    <div className="grow flex flex-col justify-between h-full py-2">
      <div className="space-y-3">
        <div className="flex justify-between items-start">
          <h3 className="text-xl font-headline font-bold text-on-surface leading-tight max-w-md">
            {item.title}
          </h3>

          <button
            onClick={() => onRemove(item.id)}
            className="text-on-surface-variant hover:text-red-500 transition-colors p-2 cursor-pointer"
          >
            <span className="material-symbols-outlined">delete</span>
          </button>
        </div>

        <p className="font-label text-xs text-on-surface-variant uppercase tracking-wider">
          {item.badge}
        </p>
      </div>

      <div className="mt-8 flex flex-wrap justify-between items-end gap-6">
        <div className="flex items-center bg-surface-container rounded-full px-2 py-1">
          <button
            onClick={() => onDecrease(item.id)}
            className="w-10 h-10 flex items-center justify-center text-primary hover:bg-primary-container/20 rounded-full transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined">remove</span>
          </button>

          <span className="w-12 text-center font-label font-bold text-on-surface">
            {item.quantity}
          </span>

          <button
            onClick={() => onIncrease(item.id)}
            className="w-10 h-10 flex items-center justify-center text-primary hover:bg-primary-container/20 rounded-full transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined">add</span>
          </button>
        </div>

        <div className="text-right">
          <span className="block font-label text-xs text-on-surface-variant uppercase tracking-widest mb-1">
            ფასი
          </span>

          <span className="text-2xl font-headline font-bold text-primary">
            {(item.newPrice * item.quantity).toFixed(0)} ₾
          </span>

          {item.oldPrice && (
            <span className="block font-label text-sm text-on-surface-variant line-through">
              {(item.oldPrice * item.quantity).toFixed(0)} ₾
            </span>
          )}
        </div>
      </div>
    </div>
  </div>
);

const CartSummary = ({ total }) => (
  <div className="sticky top-32 bg-surface-container-low p-8 rounded-xl border border-outline-variant/10">
    <h3 className="text-2xl font-headline font-bold text-on-surface mb-8">
      შეკვეთის დეტალები
    </h3>

    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <span className="font-label text-sm uppercase tracking-widest text-on-surface-variant">
          ჯამი
        </span>

        <span className="font-label font-semibold text-on-surface">
          {total} ₾
        </span>
      </div>

      <div className="flex justify-between items-center">
        <span className="font-label text-sm uppercase tracking-widest text-on-surface-variant">
          მიწოდება
        </span>

        <span className="font-label font-semibold text-primary">უფასო</span>
      </div>

      <div className="pt-6 mt-6 border-t border-outline-variant/20">
        <div className="flex justify-between items-end mb-8">
          <span className="font-headline text-xl font-bold text-on-surface">
            სულ:
          </span>

          <span className="text-3xl font-headline font-bold text-primary tracking-tight">
            {total} ₾
          </span>
        </div>

        <button className="w-full py-5 bg-primary-container text-on-primary-container rounded-full font-label font-bold uppercase tracking-[0.15em] transition-all duration-300 hover:scale-[1.02] hover:shadow-lg active:scale-95 flex items-center justify-center gap-3 cursor-pointer">
          გადახდა
          <span className="material-symbols-outlined text-lg">
            arrow_forward
          </span>
        </button>
      </div>
    </div>

    <div className="mt-8 flex items-center gap-4 p-4 bg-surface-container-lowest/50 rounded-lg">
      <span className="material-symbols-outlined text-primary">
        verified_user
      </span>

      <p className="text-[11px] font-label text-on-surface-variant uppercase tracking-tighter leading-relaxed">
        უსაფრთხო გადახდა გარანტირებულია პარტნიორი ბანკების მიერ
      </p>
    </div>
  </div>
);

const EmptyCart = () => (
  <div className="col-span-full flex flex-col items-center justify-center py-32 gap-6">
    <span className="material-symbols-outlined text-6xl text-on-surface-variant/30">
      shopping_bag
    </span>

    <p className="font-headline text-2xl text-on-surface-variant">
      კალათა ცარიელია
    </p>

    <a
      href="/products"
      className="font-label text-xs uppercase tracking-widest text-primary border-b border-primary/30 hover:border-primary pb-0.5 transition-all"
    >
      პროდუქტების ნახვა
    </a>
  </div>
);

export { CartItem, CartSummary, EmptyCart };

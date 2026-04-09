export const CartItemPrice = ({ newPrice, oldPrice, quantity }) => (
  <div className="text-right">
    <span className="block font-label text-xs text-taupe-600 uppercase tracking-widest mb-1">
      ფასი
    </span>
    <span className="text-xl md:text-2xl font-headline font-bold text-taupe-700">
      {(newPrice * quantity).toFixed(0)} ₾
    </span>
    {oldPrice != null && (
      <span className="block font-label text-sm text-taupe-400 line-through">
        {(oldPrice * quantity).toFixed(0)} ₾
      </span>
    )}
  </div>
);

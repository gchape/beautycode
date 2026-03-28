const ProductCard = ({ imgUrl, badge, title, newPrice, oldPrice }) => (
  <div className="group bg-surface-container p-6 rounded-xl transition-all duration-500 hover:shadow-xl hover:shadow-primary/10 break-inside-avoid mb-8">
    <img
      src={imgUrl}
      alt={title}
      className="w-full rounded-lg mb-6 group-hover:scale-105 transition-transform duration-700"
    />
    <div className="flex justify-between items-start gap-2">
      <div>
        <span className="font-label text-[11px] uppercase tracking-wider text-primary/60">
          {badge}
        </span>
        <h4 className="font-headline text-xl mt-1 text-on-surface">{title}</h4>
      </div>
      <div className="text-right shrink-0">
        <span className="font-headline text-lg text-primary whitespace-nowrap">
          {newPrice} GEL
        </span>
        <span className="font-label text-sm text-on-surface-variant line-through block">
          {oldPrice} GEL
        </span>
      </div>
    </div>
  </div>
);

export default ProductCard;

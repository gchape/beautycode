const FeaturedProductCard = ({ imgUrl, badge, title, newPrice, oldPrice }) => (
  <div className="group bg-pink-50 text-taupe-600 p-6 rounded-2xl transition-shadow duration-500 hover:shadow-xl hover:shadow-taupe-600/10 break-inside-avoid mb-8 cursor-text">
    <img
      src={imgUrl}
      alt={title}
      className="w-full mb-4 group-hover:scale-105 transition-transform duration-400"
    />

    <div className="flex place-content-around place-items-start gap-2">
      <div>
        <span className="font-label text-xs uppercase tracking-wider text-taupe-500">
          {badge}
        </span>

        <h4 className="font-headline text-lg md:text-xl mt-1">{title}</h4>
      </div>

      <div className="text-left shrink-0">
        <span className="font-headline text-lg whitespace-nowrap">
          {newPrice} GEL
        </span>

        <span className="font-label text-sm text-taupe-400 line-through block">
          {oldPrice} GEL
        </span>
      </div>
    </div>
  </div>
);

export default FeaturedProductCard;

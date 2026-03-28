const Hero = () => (
  <section className="relative min-h-[600px] flex flex-col md:flex-row items-center overflow-hidden pt-12">
    <div className="w-full md:w-1/2 px-8 md:px-20 z-10 py-12 md:py-0">
      <span className="font-label text-xs uppercase tracking-[0.3em] text-primary block mb-2">
        Premium Selection
      </span>

      <h2 className="font-headline text-4xl md:text-5xl text-on-surface leading-tight mb-8 max-w-xl">
        BeautiyCode-ის ✨ პრემიუმ კატეგორიის 𝗜𝗣𝗟 ლაზერული ეპილატორი💜
      </h2>

      <div className="flex items-baseline gap-4 mb-10">
        <span className="text-3xl font-headline text-primary">379.0 GEL</span>

        <span className="text-xl font-headline text-on-surface-variant line-through opacity-50">
          700.0 GEL
        </span>
      </div>

      <button className="bg-primary-container text-on-primary-container px-12 py-4 rounded-full font-label uppercase tracking-widest text-sm hover:opacity-90 transition-opacity duration-300 border-none cursor-pointer">
        ყიდვა
      </button>
    </div>

    <div className="w-full md:w-1/2 h-[500px] md:h-[700px] relative">
      <div className="absolute inset-0 bg-surface-container-low transform scale-95 origin-right translate-x-12 -z-10 rounded-l-[10rem]" />

      <img
        className="w-full h-full object-contain rounded-l-[5rem] md:rounded-l-[10rem] shadow-2xl shadow-primary/5"
        src="/6.svg"
        alt="IPL laser epilator"
      />
    </div>
  </section>
);

export default Hero;

const BrandEthos = () => (
  <section className="py-12 md:py-20 bg-pink-50 relative overflow-hidden">
    <div className="max-w-4xl mx-auto px-6">
      {/* Section label */}
      <div className="flex items-center justify-center gap-4 mb-10">
        <div className="flex-1 h-px bg-pink-200" />
        <span className="font-label text-[10px] tracking-[0.25em] uppercase text-taupe-500 shrink-0">
          ჩვენი მისია
        </span>
        <div className="flex-1 h-px bg-pink-200" />
      </div>

      {/* Headline */}
      <h2
        className="text-2xl md:text-5xl mb-12 md:mb-20 font-light italic leading-[1.2]
                     text-taupe-600 text-center max-w-2xl mx-auto"
      >
        დავეხმაროთ ქალებს აღმოაჩინონ თავიანთი{" "}
        <em className="not-italic text-pink-400">ბუნებრივი სილამაზე</em> —
        თანამედროვე ტექნოლოგიების დახმარებით.
      </h2>

      <div className="grid md:grid-cols-[1fr_1px_1fr] gap-x-12 items-start">
        {/* Blockquote */}
        <blockquote>
          <p className="text-base italic font-light tracking-tight leading-relaxed text-taupe-600">
            <span className="font-script text-xl text-taupe-700 not-italic">
              BeautyCode
            </span>{" "}
            — არ არის მხოლოდ ბრენდი, ეს არის თავის მოვლის რიტუალი, რომელიც
            ხელმისაწვდომს ხდის პროფესიონალურ მომსახურებას თქვენს სახლში.
          </p>
        </blockquote>

        {/* Vertical divider */}
        <div className="hidden md:block bg-linear-to-b from-transparent via-pink-200 to-transparent self-stretch" />

        {/* Quality blurb */}
        <div className="pt-8 md:pt-0 flex flex-col gap-5">
          <span className="font-label text-[10px] tracking-[0.2em] uppercase text-taupe-500">
            ხარისხი
          </span>
          <p className="text-sm font-medium tracking-wide leading-relaxed text-taupe-700">
            ჩვენ გთავაზობთ მხოლოდ უმაღლესი ხარისხის, სერტიფიცირებულ
            მოწყობილობებს, რომლებიც შექმნილია თქვენი უსაფრთხოებისა და კომფორტის
            გათვალისწინებით.
          </p>
          <div className="flex gap-2 flex-wrap">
            {["სერტიფიცირებული", "უსაფრთხო"].map((b) => (
              <span
                key={b}
                className="badge badge-outline border-pink-300 text-pink-500
                           font-label text-[10px] tracking-widest uppercase px-3"
              >
                {b}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default BrandEthos;

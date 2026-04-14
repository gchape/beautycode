const BrandEthos = () => (
  <section className="py-8 md:py-12 bg-pink-50 relative overflow-hidden">
    <div className="max-w-4xl mx-auto px-6">
      <div className="flex items-center justify-center gap-4 mb-10">
        <div className="w-10 h-px bg-taupe-400" />

        <span className="text-xs tracking-[0.22em] uppercase text-taupe-500">
          ჩვენი მისია
        </span>

        <div className="w-10 h-px bg-taupe-400" />
      </div>

      <h2 className="text-2xl md:text-5xl mb-10 md:mb-20 font-light italic leading-[1.2] text-taupe-600 text-center">
        დავეხმაროთ ქალებს აღმოაჩინონ თავიანთი{" "}
        <em className="not-italic text-taupe-400">ბუნებრივი სილამაზე</em> —
        თანამედროვე ტექნოლოგიების დახმარებით.
      </h2>

      <div className="grid md:grid-cols-[1fr_1px_1fr] gap-x-14 items-start">
        <blockquote className="relative">
          <p className="text-base italic font-light tracking-tight leading-relaxed text-taupe-600">
            <span className="font-script text-left text-xl text-taupe-700">
              BeautyCode
            </span>{" "}
            არ არის მხოლოდ ბრენდი, ეს არის თავის მოვლის რიტუალი, რომელიც
            ხელმისაწვდომს ხდის პროფესიონალურ მომსახურებას თქვენს სახლში."
          </p>
        </blockquote>

        <div className="hidden md:block bg-linear-to-b from-transparent via-taupe-300 to-transparent self-stretch" />

        <div className="pt-8 md:pt-1">
          <span className="text-[10px] tracking-[0.16em] uppercase text-taupe-600 mb-4 block">
            ხარისხი
          </span>

          <p className="text-sm font-medium tracking-wide leading-[1.85] text-taupe-800">
            ჩვენ გთავაზობთ მხოლოდ უმაღლესი ხარისხის, სერტიფიცირებულ
            მოწყობილობებს, რომლებიც შექმნილია თქვენი უსაფრთხოებისა და კომფორტის
            გათვალისწინებით.
          </p>

          <div className="flex gap-2 mt-7 flex-wrap">
            {["სერტიფიცირებული", "უსაფრთხო"].map((b) => (
              <span
                key={b}
                className="text-[10px] tracking-widest uppercase text-taupe-600 border border-taupe-400 rounded-full px-3 py-1"
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

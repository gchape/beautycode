import { ArrowRightIcon, BadgeCheckIcon } from "src/components/icons";
import { CartSummaryRow } from "./CartSummaryRow";

export const CartSummary = ({ total }) => (
  <div className="sticky top-32 bg-pink-100 p-8 rounded-xl shadow-sm">
    <h3 className="text-xl md:text-2xl font-bold text-taupe-600 mb-8">
      შეკვეთის დეტალები
    </h3>
    <div className="space-y-6 text-taupe-500">
      <CartSummaryRow label="ჯამი" value={`${total} ₾`} />
      <CartSummaryRow label="მიწოდება" value="უფასო" />
      <div className="pt-6 mt-6 text-taupe-600">
        <div className="flex justify-between items-end mb-8">
          <span className="font-headline text-lg md:text-xl font-bold">
            სულ:
          </span>
          <span className="text-xl md:text-2xl font-headline font-bold tracking-tight">
            {total} ₾
          </span>
        </div>
        <button
          className="w-full py-3 text-sm md:text-md border border-stone-400 rounded-full
                           font-label font-bold uppercase tracking-[0.15em] transition-shadow
                           duration-300 hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer"
        >
          გადახდა
          <ArrowRightIcon />
        </button>
      </div>
    </div>
    <div className="mt-8 flex items-center gap-4 p-4">
      <BadgeCheckIcon size={24} />
      <p className="text-[11px] font-label text-taupe-500 uppercase tracking-tighter leading-relaxed">
        უსაფრთხო გადახდა გარანტირებულია პარტნიორი ბანკების მიერ
      </p>
    </div>
  </div>
);

import { ArrowRight, BadgeCheck } from "lucide-react";
import { SummaryRow } from "./SummaryRow";

interface OrderSummaryProps {
  total: number;
}

export const OrderSummary = ({ total }: OrderSummaryProps) => (
  <div className="rounded-2xl bg-base-200 shadow-sm sticky top-20">
    <div className="flex flex-col gap-4 p-6">
      <h3 className="font-headline font-normal text-xl text-taupe-700">
        შეკვეთის დეტალები
      </h3>

      <div className="space-y-3 text-taupe-500">
        <SummaryRow label="ჯამი" value={`${total.toFixed(0)} ₾`} />
        <SummaryRow label="მიტანა" value="უფასო" />
      </div>

      <div className="h-px bg-taupe-200" />

      <div className="flex justify-between items-end">
        <span className="font-label text-xs uppercase tracking-widest text-taupe-500">
          სულ
        </span>
        <span className="text-2xl font-headline text-taupe-700">
          {total.toFixed(0)} ₾
        </span>
      </div>

      <div className="group relative">
        <button
          disabled
          aria-disabled="true"
          aria-describedby="checkout-unavailable-note"
          className="w-full rounded-full bg-accent py-3 font-label uppercase tracking-widest text-sm text-accent-content mt-1
                     opacity-50 cursor-not-allowed"
        >
          გადახდა
          <ArrowRight size={16} className="inline-block ml-2" />
        </button>
        <p
          id="checkout-unavailable-note"
          role="tooltip"
          className="pointer-events-none absolute -top-9 left-1/2 -translate-x-1/2 whitespace-nowrap
                     rounded-full bg-taupe-800 px-3 py-1.5 font-label text-[10px] uppercase tracking-widest text-white
                     opacity-0 transition-opacity duration-150 group-hover:opacity-100"
        >
          გადახდა მალე ხელმისაწვდომი იქნება
        </p>
      </div>

      <div
        role="alert"
        className="flex items-start gap-3 rounded-xl border border-pink-200 bg-pink-50 py-3 px-4 mt-1"
      >
        <BadgeCheck size={18} className="shrink-0 text-taupe-600" />
        <p className="text-[11px] font-label text-taupe-500 uppercase tracking-tight leading-relaxed">
          უსაფრთხო გადახდა გარანტირებულია პარტნიორი ბანკების მიერ
        </p>
      </div>
    </div>
  </div>
);

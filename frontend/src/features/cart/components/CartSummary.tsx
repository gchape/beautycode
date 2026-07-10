import { ArrowRight, BadgeCheck } from "lucide-react";
import { CartSummaryRow } from "./CartSummaryRow";

interface CartSummaryProps {
  total: number;
}

export const CartSummary = ({ total }: CartSummaryProps) => (
  <div className="card rounded-2xl bg-base-200 shadow-sm sticky top-20">
    <div className="card-body gap-4">
      <h3 className="card-title text-taupe-700 font-headline font-normal text-xl">
        შეკვეთის დეტალები
      </h3>

      <div className="space-y-3 text-taupe-500">
        <CartSummaryRow label="ჯამი" value={`${total.toFixed(0)} ₾`} />
        <CartSummaryRow label="მიტანა" value="უფასო" />
      </div>

      <div className="divider my-0" />

      <div className="flex justify-between items-end">
        <span className="font-label text-xs uppercase tracking-widest text-taupe-500">
          სულ
        </span>
        <span className="text-2xl font-headline text-taupe-700">
          {total.toFixed(0)} ₾
        </span>
      </div>

      <button className="btn btn-accent w-full rounded-full font-label uppercase tracking-widest text-sm mt-1">
        გადახდა
        <ArrowRight size={16} />
      </button>

      <div
        role="alert"
        className="alert bg-pink-50 border border-pink-200 rounded-xl py-3 px-4 mt-1"
      >
        <BadgeCheck size={18} />
        <p className="text-[11px] font-label text-taupe-500 uppercase tracking-tight leading-relaxed">
          უსაფრთხო გადახდა გარანტირებულია პარტნიორი ბანკების მიერ
        </p>
      </div>
    </div>
  </div>
);

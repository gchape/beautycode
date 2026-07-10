interface CartSummaryRowProps {
  label: string;
  value: string;
}

export const CartSummaryRow = ({ label, value }: CartSummaryRowProps) => (
  <div className="flex justify-between items-center text-sm">
    <span className="font-label uppercase tracking-widest">{label}</span>
    <span>{value}</span>
  </div>
);

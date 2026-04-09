export const CartSummaryRow = ({ label, value }) => (
  <div className="flex justify-between items-center text-sm">
    <span className="font-label uppercase tracking-widest">{label}</span>
    <span>{value}</span>
  </div>
);

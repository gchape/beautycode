export const CartSummaryRow = ({ label, value }) => (
  <div className="flex justify-between items-center">
    <span className="font-label text-sm uppercase tracking-widest">
      {label}
    </span>
    <span className="font-label font-semibold">{value}</span>
  </div>
);

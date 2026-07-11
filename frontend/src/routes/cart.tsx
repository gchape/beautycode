import { useCart } from "src/entities/cart";
import { CartPageHeader } from "src/ui/cart/CartPageHeader";
import { CartLineItem } from "src/ui/cart/CartLineItem";
import { OrderSummary } from "src/ui/cart/OrderSummary";
import { EmptyCartState } from "src/ui/cart/EmptyCartState";

export const Component = () => {
  const cart = useCart();
  const total = cart.reduce(
    (acc, item) => acc + item.quantity * item.newPrice,
    0,
  );

  return (
    <main className="max-w-7xl mx-auto px-6 pt-6 pb-16 md:pb-32">
      <CartPageHeader />
      {cart.length === 0 ? (
        <EmptyCartState />
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
          <div className="lg:col-span-8 rounded-2xl bg-base-200 shadow-sm px-4 md:px-6">
            {cart.map((item) => (
              <CartLineItem key={item.id} item={item} />
            ))}
          </div>
          <div className="lg:col-span-4">
            <OrderSummary total={total} />
          </div>
        </div>
      )}
    </main>
  );
};

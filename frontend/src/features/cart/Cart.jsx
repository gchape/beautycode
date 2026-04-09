import { useCart } from "../providers/cartContext";
import {
  CartHeader,
  CartItem,
  CartSummary,
  EmptyCart,
} from "./components/CartComponents";

const Cart = () => {
  const cart = useCart();

  const total = cart.reduce(
    (acc, item) => acc + item.quantity * item.newPrice,
    0,
  );

  return (
    <main className="max-w-7xl mx-auto px-6 pt-10 pb-32">
      <CartHeader />
      {cart.length === 0 ? (
        <EmptyCart />
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          <div className="lg:col-span-8 space-y-8">
            {cart.map((item) => (
              <CartItem key={item.id} item={item} />
            ))}
          </div>
          <div className="lg:col-span-4">
            <CartSummary total={total} />
          </div>
        </div>
      )}
    </main>
  );
};

export default Cart;

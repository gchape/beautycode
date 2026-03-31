import { useContext } from "react";
import { CartContext } from "../state/store";
import { CartItem, CartSummary, EmptyCart } from "./CartComponents";

const Cart = () => {
  const [state, dispatch] = useContext(CartContext);

  return (
    <main className="max-w-7xl mx-auto px-6 pt-10 pb-32">
      <div className="mb-12">
        <h2 className="text-4xl font-headline font-bold text-taupe-600 tracking-tight mb-2">
          კალათა
        </h2>
        <p className="font-label text-sm uppercase tracking-widest text-taupe-500">
          თქვენი შერჩეული პროდუქცია
        </p>
      </div>

      {state.length === 0 ? (
        <EmptyCart />
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          <div className="lg:col-span-8 space-y-8">
            {state.map((item) => (
              <CartItem
                key={item.id}
                item={item}
                onIncrease={() => dispatch({ item: item, action: "INCREASE" })}
                onDecrease={() => dispatch({ item: item, action: "DECREASE" })}
                onRemove={() => dispatch({ item: item, action: "REMOVE" })}
              />
            ))}
          </div>

          <div className="lg:col-span-4">
            <CartSummary
              total={state.reduce(
                (prev, curr) => prev + curr.quantity * curr.newPrice,
                0,
              )}
            />
          </div>
        </div>
      )}
    </main>
  );
};

export default Cart;

import { useState } from "react";
import { CartItem, CartSummary, EmptyCart } from "./CartComponents";

const INITIAL_CART = [
  {
    id: 6,
    imgUrl: "/6.svg",
    badge: "Premium",
    title: "BeautiyCode-ის ✨ პრემიუმ კატეგორიის 𝗜𝗣𝗟 ლაზერული ეპილატორი💜",
    oldPrice: 700.0,
    newPrice: 379.0,
    quantity: 1,
  },
];

const Cart = () => {
  const [items, setItems] = useState(INITIAL_CART);

  const increase = (id) =>
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item,
      ),
    );

  const decrease = (id) =>
    setItems((prev) =>
      prev.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item,
      ),
    );

  const remove = (id) =>
    setItems((prev) => prev.filter((item) => item.id !== id));

  const total = items
    .reduce((sum, item) => sum + item.newPrice * item.quantity, 0)
    .toFixed(0);

  return (
    <main className="max-w-7xl mx-auto px-6 pt-10 pb-32">
      <div className="mb-12">
        <h2 className="text-4xl font-headline font-bold text-on-surface tracking-tight mb-2">
          კალათა
        </h2>
        <p className="font-label text-sm uppercase tracking-widest text-on-surface-variant">
          თქვენი შერჩეული პროდუქცია
        </p>
      </div>

      {items.length === 0 ? (
        <EmptyCart />
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          <div className="lg:col-span-8 space-y-8">
            {items.map((item) => (
              <CartItem
                key={item.id}
                item={item}
                onIncrease={increase}
                onDecrease={decrease}
                onRemove={remove}
              />
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

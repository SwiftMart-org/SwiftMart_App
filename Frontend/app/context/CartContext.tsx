import React, { createContext, useContext, useState, ReactNode } from "react";

// 🧾 Types
type CartItem = {
  id: string;
  name: string;
  quantity: number;
};

type Cart = {
  id: string;
  name: string;
  items: CartItem[];
};

type CartContextType = {
  carts: Cart[];
  selectedCartId: string;
  setSelectedCartId: React.Dispatch<React.SetStateAction<string>>;
  addCart: (name: string) => void;
  removeCart: (id: string) => void;
  updateItemQuantity: (cartId: string, itemId: string, amount: number) => void;
  addItemToCart: (cartId: string, item: CartItem) => void;
};

const CartContext = createContext<CartContextType | null>(null);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

// ✅ Fixes all "any" errors
export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [carts, setCarts] = useState<Cart[]>([]);
  const [selectedCartId, setSelectedCartId] = useState("");

  const addCart = (name: string) => {
    const newCart: Cart = {
      id: Date.now().toString(),
      name,
      items: [],
    };
    setCarts((prev) => [...prev, newCart]);
  };

  const removeCart = (id: string) => {
    setCarts((prev) => prev.filter((cart) => cart.id !== id));
  };

  const updateItemQuantity = (
    cartId: string,
    itemId: string,
    amount: number
  ) => {
    setCarts((prev) =>
      prev.map((cart) =>
        cart.id === cartId
          ? {
              ...cart,
              items: cart.items.map((item) =>
                item.id === itemId
                  ? { ...item, quantity: item.quantity + amount }
                  : item
              ),
            }
          : cart
      )
    );
  };

  const addItemToCart = (cartId: string, item: CartItem) => {
    setCarts((prev) =>
      prev.map((cart) =>
        cart.id === cartId
          ? {
              ...cart,
              items: [...cart.items, item],
            }
          : cart
      )
    );
  };

  return (
    <CartContext.Provider
      value={{
        carts,
        selectedCartId,
        setSelectedCartId,
        addCart,
        removeCart,
        updateItemQuantity,
        addItemToCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};


export default CartProvider;

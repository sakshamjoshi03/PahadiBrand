import { createContext, useContext, useState, useEffect } from "react";
import { useNotifications } from "../components/UI/NotificationProvider";

const CartContext = createContext(null);

const CART_STORAGE_KEY = "pahadibrand_cart";

export function CartProvider({ children }) {
  const { addNotification } = useNotifications();

  const [cartItems, setCartItems] = useState(() => {
    try {
      const savedCart = localStorage.getItem(CART_STORAGE_KEY);
      return savedCart ? JSON.parse(savedCart) : [];
    } catch (err) {
      console.error("Failed to load cart from localStorage", err);
      return [];
    }
  });

  // Keep localStorage updated
  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
    } catch (err) {
      console.error("Failed to save cart to localStorage", err);
    }
  }, [cartItems]);

  // Compute total item count
  const cartCount = cartItems.reduce((total, item) => total + (item.quantity || 1), 0);

  const addToCart = (product, quantity = 1, showToast = true) => {
    if (!product) return;

    const productId = product._id || product.id || product.name || product.title;
    const productName = product.name || product.title || "Product";

    setCartItems((prevItems) => {
      const existingIndex = prevItems.findIndex((item) => {
        const itemKey = item.product?._id || item.product?.id || item.product?.name || item.product?.title;
        return itemKey === productId;
      });

      if (existingIndex > -1) {
        const updated = [...prevItems];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + quantity,
        };
        return updated;
      } else {
        return [...prevItems, { product, quantity }];
      }
    });

    if (showToast && addNotification) {
      addNotification(`Added "${productName}" to cart!`, "success");
    }
  };

  const removeFromCart = (productId) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => {
        const itemKey = item.product?._id || item.product?.id || item.product?.name || item.product?.title;
        return itemKey !== productId;
      })
    );
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCartItems((prevItems) =>
      prevItems.map((item) => {
        const itemKey = item.product?._id || item.product?.id || item.product?.name || item.product?.title;
        if (itemKey === productId) {
          return { ...item, quantity: newQuantity };
        }
        return item;
      })
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        cartCount,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}

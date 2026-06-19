import { createContext, useState, useEffect } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    const saved = localStorage.getItem('cartItems');
    return saved ? JSON.parse(saved) : [];
  });

  const [shippingAddress, setShippingAddress] = useState(() => {
    const saved = localStorage.getItem('shippingAddress');
    return saved ? JSON.parse(saved) : {};
  });

  const [paymentMethod, setPaymentMethod] = useState(() => {
    const saved = localStorage.getItem('paymentMethod');
    return saved ? JSON.parse(saved) : 'Cash on Delivery';
  });

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  const saveShippingAddress = (data) => {
    setShippingAddress(data);
    localStorage.setItem('shippingAddress', JSON.stringify(data));
  };

  const savePaymentMethod = (data) => {
    setPaymentMethod(data);
    localStorage.setItem('paymentMethod', JSON.stringify(data));
  };

  const addToCart = (product, qty, increment = false) => {
    setCartItems(prev => {
      const existItem = prev.find(x => x.product === product.product && x.size === product.size);
      if (existItem) {
        const newQty = increment ? existItem.qty + Number(qty) : Number(qty);
        return prev.map(x => (x.product === existItem.product && x.size === existItem.size) ? { ...x, qty: newQty } : x);
      } else {
        return [...prev, { ...product, qty: Number(qty) }];
      }
    });
  };

  const removeFromCart = (id, size) => {
    setCartItems(prev => prev.filter(x => !(x.product === id && x.size === size)));
  };

  const updateCartItemSize = (productId, oldSize, newSize) => {
    setCartItems(prev => {
      const existItemIndex = prev.findIndex(x => x.product === productId && x.size === oldSize);
      if (existItemIndex === -1) return prev;
      
      const newItems = [...prev];
      const targetItemIndex = prev.findIndex(x => x.product === productId && x.size === newSize);
      
      if (targetItemIndex !== -1 && targetItemIndex !== existItemIndex) {
        newItems[targetItemIndex].qty += newItems[existItemIndex].qty;
        newItems.splice(existItemIndex, 1);
      } else {
        newItems[existItemIndex].size = newSize;
      }
      return newItems;
    });
  };

  const clearCart = () => setCartItems([]);

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateCartItemSize, clearCart, shippingAddress, saveShippingAddress, paymentMethod, savePaymentMethod }}>
      {children}
    </CartContext.Provider>
  );
};

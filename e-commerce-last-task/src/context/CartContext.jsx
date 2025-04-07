import { createContext, useState, useEffect } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  // Initialize cart from localStorage or empty array
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });
  
  const [totalItems, setTotalItems] = useState(0);
  const [subtotal, setSubtotal] = useState(0);
  const [tax, setTax] = useState(0);
  const [total, setTotal] = useState(0);
  
  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // Calculate total items
    const itemCount = cart.reduce((total, item) => total + item.quantity, 0);
    setTotalItems(itemCount);
    
    // Calculate subtotal
    const itemSubtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    setSubtotal(itemSubtotal);
    
    // Calculate tax (assuming 8% tax rate)
    const taxAmount = itemSubtotal * 0.08;
    setTax(taxAmount);
    
    // Calculate total
    setTotal(itemSubtotal + taxAmount);
  }, [cart]);
  
  // Add item to cart
  const addToCart = (product) => {
    setCart(prevCart => {
      // Check if item is already in cart
      const existingItem = prevCart.find(item => item.id === product.id);
      
      if (existingItem) {
        // Increase quantity if item exists
        return prevCart.map(item => 
          item.id === product.id 
            ? { ...item, quantity: item.quantity + 1 } 
            : item
        );
      } else {
        // Add new item with quantity 1
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };
  
  // Remove item from cart
  const removeFromCart = (productId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
  };
  
  // Update item quantity
  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) return;
    
    setCart(prevCart => 
      prevCart.map(item => 
        item.id === productId 
          ? { ...item, quantity: newQuantity } 
          : item
      )
    );
  };
  
  // Clear cart
  const clearCart = () => {
    setCart([]);
  };
  
  return (
    <CartContext.Provider 
      value={{ 
        cart, 
        totalItems, 
        subtotal, 
        tax, 
        total, 
        addToCart, 
        removeFromCart, 
        updateQuantity, 
        clearCart 
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
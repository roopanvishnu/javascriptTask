import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';

const Cart = () => {
  const { cart, updateQuantity, removeFromCart, subtotal, tax, total, clearCart } = useContext(CartContext);
  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [promoError, setPromoError] = useState('');
  const [promoSuccess, setPromoSuccess] = useState('');
  
  // Valid promo codes (in a real app, this would come from a backend)
  const validPromoCodes = {
    'SAVE10': 0.10,
    'SAVE20': 0.20,
    'WELCOME': 0.15
  };
  
  // Handle quantity change
  const handleQuantityChange = (id, newQuantity) => {
    updateQuantity(id, parseInt(newQuantity));
  };
  
  // Handle promo code application
  const applyPromoCode = () => {
    setPromoError('');
    setPromoSuccess('');
    
    if (!promoCode.trim()) {
      setPromoError('Please enter a promo code');
      return;
    }
    
    const discountRate = validPromoCodes[promoCode.toUpperCase()];
    
    if (discountRate) {
      const discountAmount = subtotal * discountRate;
      setDiscount(discountAmount);
      setPromoSuccess(`Promo code applied! You saved $${discountAmount.toFixed(2)}`);
    } else {
      setPromoError('Invalid promo code');
      setDiscount(0);
    }
  };
  
  // Format price to 2 decimal places
  const formatPrice = (price) => {
    return price.toFixed(2);
  };
  
  // Calculate final total
  const finalTotal = total - discount;

  return (
    <div className="cart-container">
      <h2 className="cart-title">Shopping Cart</h2>
      
      {cart.length === 0 ? (
        <div className="empty-cart">
          <p>Your cart is empty</p>
          <Link to="/" className="continue-shopping-btn">Continue Shopping</Link>
        </div>
      ) : (
        <div className="cart-content">
          <div className="cart-items">
            {cart.map(item => (
              <div key={item.id} className="cart-item">
                <div className="item-image">
                  <img src={item.image} alt={item.name} />
                </div>
                
                <div className="item-details">
                  <h3 className="item-name">{item.name}</h3>
                  <p className="item-price">${formatPrice(item.price)}</p>
                </div>
                
                <div className="item-quantity">
                  <button 
                    className="quantity-btn" 
                    onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                    disabled={item.quantity <= 1}
                  >
                    -
                  </button>
                  <input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) => handleQuantityChange(item.id, e.target.value)}
                    className="quantity-input"
                  />
                  <button 
                    className="quantity-btn" 
                    onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                  >
                    +
                  </button>
                </div>
                
                <div className="item-total">
                  ${formatPrice(item.price * item.quantity)}
                </div>
                
                <button 
                  className="remove-btn" 
                  onClick={() => removeFromCart(item.id)}
                  aria-label="Remove item"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
          
          <div className="cart-summary">
            <h3 className="summary-title">Order Summary</h3>
            
            <div className="promo-code">
              <input
                type="text"
                placeholder="Enter promo code"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                className="promo-input"
              />
              <button className="apply-promo-btn" onClick={applyPromoCode}>Apply</button>
            </div>
            
            {promoError && <p className="promo-error">{promoError}</p>}
            {promoSuccess && <p className="promo-success">{promoSuccess}</p>}
            
            <div className="summary-row">
              <span>Subtotal:</span>
              <span>${formatPrice(subtotal)}</span>
            </div>
            
            {discount > 0 && (
              <div className="summary-row discount">
                <span>Discount:</span>
                <span>-${formatPrice(discount)}</span>
              </div>
            )}
            
            <div className="summary-row">
              <span>Tax (8%):</span>
              <span>${formatPrice(tax)}</span>
            </div>
            
            <div className="summary-row total">
              <span>Total:</span>
              <span>${formatPrice(finalTotal)}</span>
            </div>
            
            <div className="cart-actions">
              <button className="checkout-btn">Proceed to Checkout</button>
              <button className="clear-cart-btn" onClick={clearCart}>Clear Cart</button>
              <Link to="/" className="continue-shopping-link">Continue Shopping</Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
import { useState } from 'react';

const ProductCard = ({ product, addToCart }) => {
  const [showDetails, setShowDetails] = useState(false);
  const { id, name, price, image, description, category, inStock, rating } = product;
  
  // Format price to 2 decimal places
  const formattedPrice = price.toFixed(2);
  
  // Toggle product details
  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };
  
  // Handle add to cart
  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart(product);
  };
  
  // Generate star rating display
  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;
    const stars = [];
    
    // Add full stars
    for (let i = 0; i < fullStars; i++) {
      stars.push(<span key={`full-${i}`} className="star full">★</span>);
    }
    
    // Add half star if needed
    if (halfStar) {
      stars.push(<span key="half" className="star half">★</span>);
    }
    
    // Add empty stars
    const emptyStars = 5 - stars.length;
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<span key={`empty-${i}`} className="star empty">☆</span>);
    }
    
    return stars;
  };

  return (
    <div className="product-card" onClick={toggleDetails}>
      <div className="product-image-container">
        <img src={image} alt={name} className="product-image" />
        {!inStock && <div className="out-of-stock">Out of Stock</div>}
      </div>
      
      <div className="product-info">
        <h3 className="product-name">{name}</h3>
        <div className="product-rating">
          {renderStars(rating)}
          <span className="rating-value">({rating})</span>
        </div>
        <p className="product-price">${formattedPrice}</p>
        <span className="product-category">{category}</span>
        
        {showDetails && (
          <div className="product-details">
            <p className="product-description">{description}</p>
          </div>
        )}
        
        <button 
          className="add-to-cart-btn"
          onClick={handleAddToCart}
          disabled={!inStock}
        >
          {inStock ? 'Add to Cart' : 'Out of Stock'}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
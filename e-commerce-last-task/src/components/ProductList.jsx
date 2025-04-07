import { useState, useEffect, useContext } from 'react';
import { products, categories } from '../data/productData';
import { CartContext } from '../context/CartContext';
import ProductCard from './ProductCard';

const ProductList = () => {
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState('default');
  const { addToCart } = useContext(CartContext);

  // Handle filtering, searching, and sorting products
  useEffect(() => {
    let result = [...products];
    
    // Filter by category
    if (selectedCategory !== 'all') {
      result = result.filter(product => product.category === selectedCategory);
    }
    
    // Filter by search term
    if (searchTerm) {
      const searchTermLower = searchTerm.toLowerCase();
      result = result.filter(product => 
        product.name.toLowerCase().includes(searchTermLower) || 
        product.description.toLowerCase().includes(searchTermLower)
      );
    }
    
    // Sort products
    if (sortOption === 'price-asc') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortOption === 'price-desc') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortOption === 'name-asc') {
      result.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortOption === 'rating') {
      result.sort((a, b) => b.rating - a.rating);
    }
    
    setFilteredProducts(result);
  }, [selectedCategory, searchTerm, sortOption]);
  
  // Handle category selection
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };
  
  // Handle search input
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };
  
  // Handle sort selection
  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  return (
    <div className="product-list-container">
      <div className="filters-container">
        <div className="search-container">
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="search-input"
          />
        </div>
        
        <div className="category-filters">
          {categories.map(category => (
            <button
              key={category}
              className={`category-btn ${selectedCategory === category ? 'active' : ''}`}
              onClick={() => handleCategoryChange(category)}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>
        
        <div className="sort-container">
          <select 
            value={sortOption} 
            onChange={handleSortChange}
            className="sort-select"
          >
            <option value="default">Default Sorting</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="name-asc">Name: A to Z</option>
            <option value="rating">Top Rated</option>
          </select>
        </div>
      </div>
      
      {filteredProducts.length === 0 ? (
        <div className="no-products">
          <p>No products found matching your criteria.</p>
        </div>
      ) : (
        <div className="products-grid">
          {filteredProducts.map(product => (
            <ProductCard 
              key={product.id} 
              product={product} 
              addToCart={addToCart} 
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductList;
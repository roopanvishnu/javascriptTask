import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import ProductList from './components/ProductList'
import Cart from './components/Cart'
import { CartProvider } from './context/CartContext'
import './App.css'

function App() {
  return (
    <CartProvider>
      <Router>
        <div className="app">
          <Navbar />
          <div className="container">
            <Routes>
              <Route path="/" element={<ProductList />} />
              <Route path="/cart" element={<Cart />} />
            </Routes>
          </div>
        </div>
      </Router>
    </CartProvider>
  )
}

export default App
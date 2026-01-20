import React, { useState } from 'react';
import Payment from './Payment'; 
import para from '../assets/para.png';
import vitc from '../assets/vitc.png';
import n95 from '../assets/n95.png';
import cs from '../assets/cs.png';
import sani from '../assets/sani.png';
import gel from '../assets/gel.png';

const PRODUCTS = [
  { id: 1, name: "Paracetamol 650", price: 30, image: para},
  { id: 2, name: "Vitamin C Syrum", price: 150, image: vitc },
  { id: 3, name: "Cough Syrup", price: 90, image: cs },
  { id: 4, name: "N95 Mask", price: 50, image: n95},
  { id: 5, name: "Hand Sanitizer", price: 120, image: sani },
  { id: 6, name: "Pain Relief Gel", price: 200, image: gel},
  
];

const Home = ({user}) => {
  const [cart, setCart] = useState([]);
  const [isCheckout, setIsCheckout] = useState(false); 

  const addToCart = (product) => {
    setCart([...cart, { ...product, quantity: 1 }]);
  };

  const removeFromCart = (indexToRemove) => {
    setCart(cart.filter((_, index) => index !== indexToRemove));
  };

  
  const handleOrderSuccess = () => {
    setCart([]);          
    setIsCheckout(false); 
  };

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  
  if (isCheckout) {
    return (
      <Payment 
        cart={cart} 
        total={total} 
        user={user} 
        onBack={() => setIsCheckout(false)} 
        onOrderPlaced={handleOrderSuccess} 
      />
    );
  }

  return (
    <div>
      <h2 className="welcome">
        Welcome , {user.name} 👋
      </h2>
      <div className="con">
        <div className="product">
          {PRODUCTS.map(prod => (
            <div key={prod.id} className="pro-card">
              <img src={prod.image} alt={prod.name} />
              <h3 className="product-title">{prod.name}</h3>
              <p className="product-price">₹{prod.price}</p>
              <button onClick={() => addToCart(prod)} className="addbtn">Add to Cart</button>
            </div>
          ))}
        </div>
        <div className="cart-sidebar">
          <h2 className="cart-title">🛒 Your Cart</h2>
          
          {cart.length === 0 && <p>Cart is empty</p>}
          <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
          />
          {cart.map((item, index) => (
            <div key={index} className="cart-item">
              <div >
                <span>{item.name}</span>
                <div>₹{item.price}</div>
              </div>
              <button onClick={() => removeFromCart(index)} className="remove"><i class="fa-solid fa-trash"></i></button>
            </div>
          ))}
          <div className="cart">
            <div className="cart-total">
               <h3>Total:</h3>
               <h3>₹{total}</h3>
            </div>
            <button 
              onClick={() => cart.length > 0 ? setIsCheckout(true) : alert("Cart is empty")} 
              className="primary-btn"
            >
                 Checkout Now    <i class="fa-solid fa-bag-shopping"></i>
            </button>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
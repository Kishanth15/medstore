import React, { useState } from 'react';
import axios from 'axios';

const Payment = ({ cart, total, user, onBack, onOrderPlaced }) => {
  const [method, setMethod] = useState('COD'); 
  const [upiId, setUpiId] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleConfirmOrder = async () => {
    if (method === 'UPI' && !upiId.includes('@')) {
      alert("Please enter a valid UPI ID");
      return;
    }

    setIsProcessing(true);

    const statusToSend = method === 'UPI' ? "Paid" : "Pending";

    const orderData = {
      customer: user,
      items: cart.map(item => ({
        medicineName: item.name,
        quantity: 1,
        price: item.price
      })),
      totalAmount: total,
      status: statusToSend 
    };

    try {
      await axios.post('http://localhost:6615/pharmacy', orderData);
      alert(`Order Placed!`);
      onOrderPlaced(); 

    } catch (err) {
      console.error(err);
      alert("Payment Failed.");
      setIsProcessing(false);
    }
  };

  return (
    <div className="payment-mode">
      <h2>Payment Gateway</h2>
      
      <div className="payment-summary">
        <h3>Total: ₹{total}</h3>
      </div>

      <div className="payment-options">
        
        <label className="payment-label">
          <input 
            type="radio" 
            checked={method === 'UPI'} 
            onChange={() => setMethod('UPI')} 
          /> 
          <span className="payment-text">UPI / Online</span>
        </label>

        {method === 'UPI' && (
          <input 
            className="form-input"
            type="text" 
            placeholder="Enter UPI ID"
            value={upiId}
            onChange={(e) => setUpiId(e.target.value)}
          />
        )}

        
        <label className="payment-label">
          <input 
            type="radio" 
            checked={method === 'COD'} 
            onChange={() => setMethod('COD')} 
          /> 
          <span className="payment-text">Cash On Delivery</span>
        </label>
      </div>

      <div className="payment-actions">
        <button className="backbtn" onClick={onBack}>Back</button>
        <button className="primary-btn" onClick={handleConfirmOrder} disabled={isProcessing}>
          {isProcessing ? "Processing..." : "Confirm Order"}
        </button>
      </div>
    </div>
  );
};

export default Payment;
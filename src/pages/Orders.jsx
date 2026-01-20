import React, { useEffect, useState } from 'react';
import axios from 'axios';
const handle = (promise) => {
  return promise
    .then(data => [null, data])
    .catch(err => [err, null]);
};

const Orders = ({ user }) => {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    const [err, res] = await handle(axios.get('http://localhost:6615/pharmacy'));
  
    if (err) {
      console.error("Backend Error:", err);
      setError("Could not connect to server");
      return;
    }
    const myOrders = res.data.filter((o) => o.customer.name === user.name);
    setOrders(myOrders);
  };

  const deleteOrder = async (orderId) => {
    if (!window.confirm("Are you sure you want to delete this order?")) 
      return;

    const [err] = await handle(axios.delete(`http://localhost:6615/pharmacy/${orderId}`));

    if (err) {
      alert("Failed to delete order.");
      console.error(err);
      return;
    }
    setOrders(prevOrders => prevOrders.filter((o) => o._id !== orderId));
  };

  return (
    <div>
      <h1 className="page-title">Your Orders</h1>

      <div className="order-list">
        {orders.length === 0 && !error ? <p>No orders found.</p> : orders.map((order) => (
          
          <OrderCard key={order._id} order={order} onDelete={deleteOrder} />
        ))}
      </div>
    </div>
  );
};

const OrderCard = ({ order, onDelete }) => {
  const [status, setStatus] = useState(order.status);

  useEffect(() => {
    const eventSource = new EventSource(`http://localhost:6615/pharmacy/events/${order._id}`);
    
    eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.status) setStatus(data.status);
    };

    return () => eventSource.close();
  }, [order._id]);

  const statusClass = `status-badge status-${status.toLowerCase().replace(/\s+/g, '-')}`;

  return (
    <div className="order-card" style={{ position: 'relative' }}>
      <div className="order-header">
        <div>
          <h3 style={{margin: 0}}>Order </h3>
          <span style={{ fontSize: '12px', color: '#888' }}>
             {new Date(order.createdAt).toLocaleDateString()}
          </span>
        </div>
        
        <span className={statusClass}>
          {status}
        </span>
      </div>
      
      <div style={{ marginBottom: '15px' }}>
        <h4>Items: </h4>
        {order.items.map(i => `${i.medicineName} (x${i.quantity})`).join(', ')}
      </div>

      <div className='oc'>
        <button className='cancel'
          onClick={() => onDelete(order._id)}
        >
          Cancel Order
        </button>

        <p className='total'>Total: ₹{order.totalAmount}</p>
      </div>
    </div>
  );
};

export default Orders;
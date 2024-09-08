import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './order.css'; 

const MyOrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    const fetchOrders = async () => {
      try {
        const response = await fetch('http://localhost:5000/order', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.ok) {
          const data = await response.json();
          setOrders(data.orders);
        } else {
          navigate('/login');
        }
      } catch (error) {
        console.error('Error fetching orders:', error);
        navigate('/login');
      }
    };

    fetchOrders();
  }, [navigate]);

  return (
    <div className="orders-container">
      <h2>My Orders</h2>
      {orders && orders.length > 0 ? (
        <ul className="orders-list">
          {orders.map(order => (
            <li key={order._id} className="order-item">
              <p><strong>Order ID:</strong> {order._id}</p>
              <p><strong>Status:</strong> {order.status}</p>
              <p><strong>Total:</strong> ${order.total}</p>
              <p><strong>Items:</strong></p>
              <ul>
                {order.items.map(item => (
                  <li key={item._id}>
                    {item.name} - ${item.price} x {item.quantity}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      ) : (
        <p>No orders found.</p>
      )}
      <button onClick={() => navigate('/profile')}>Back to Profile</button>
    </div>
  );
};

export default MyOrdersPage;

import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import Modal from 'react-modal';
import "./cart.css";
Modal.setAppElement('#root');

const Cart = () => {
  const [cart, setCart] = useState([]);
  const [error, setError] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('');
  const navigate = useNavigate();

  const userId = sessionStorage.getItem("user_id");

  useEffect(() => {
    fetchCartData();
  }, [userId]);

  const fetchCartData = async () => {
    const token = localStorage.getItem('token');
    if (token === undefined) {
      return (
        <span>You need to <button onClick={() => { navigate('/login'); }}>Login</button> First</span>
      );
    }
    try {
      const response = await fetch(`http://localhost:5000/cart/${userId}`);
      if (!response.ok) {
        throw new Error("Failed to fetch cart data");
      }
      const data = await response.json();
      setCart(data.cart.items); 
    } catch (error) {
      console.error("Error fetching cart data:", error);
      setError(error.message);
    }
  };

  const decrementQuantity = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/cart/${userId}/item/${id}/decrement`, {
        method: "PUT",
      });

      if (!response.ok) {
        throw new Error("Failed to decrement quantity");
      }

      const data = await response.json();
      fetchCartData();
    } catch (error) {
      console.error("Error decrementing quantity:", error);
      setError(error.message);
    }
  };

  const incrementQuantity = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/cart/${userId}/item/${id}/increment`, {
        method: "PUT",
      });

      if (!response.ok) {
        throw new Error("Failed to increment quantity");
      }

      const data = await response.json();
      fetchCartData();
    } catch (error) {
      console.error("Error incrementing quantity:", error);
      setError(error.message);
    }
  };

  const removeItem = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/cart/${userId}/item/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to remove item from cart");
      }

      const data = await response.json();
      fetchCartData();
    } catch (error) {
      console.error("Error removing item from cart:", error);
      setError(error.message);
    }
  };

  const totalPrice = cart.reduce(
    (acc, item) => acc + item.details.price * item.quantity,
    0
  );

  const handleCheckout = () => {
    setModalIsOpen(true);
  };

  const handlePayment = async () => {
    if (paymentMethod === 'razorpay') {
      const options = {
        key: "rzp_test_892751456bfrumskj",
        amount: totalPrice * 100, 
        currency: "INR",
        name: "Food Villa",
        description: "Test Transaction",
        handler: async function (response) {
          alert(`Payment successful: ${response.razorpay_payment_id}`);
          await createOrder('Razorpay', response.razorpay_payment_id);
        },
        prefill: {
          name: "Customer Name",
          email: "customer@example.com",
          contact: "9999999999",
        },
        notes: {
          address: "Food Villa Corporate Office",
        },
        theme: {
          color: "#3399cc",
        },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } else if (paymentMethod === 'pay_on_delivery') {
      await createOrder('Pay on Delivery');
    }
  };

  const createOrder = async (paymentMethod, razorpayPaymentId = null) => {
    try {
      const response = await fetch(`http://localhost:5000/order`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          restaurant: 'restaurant_id', 
          eatables: cart.map(item => ({
            eatableId: item.itemId,
            quantity: item.quantity,
            menuId: item.menuId,
          })),
          totalPrice: totalPrice,
          status: 'Pending',
          user: userId,
          paymentMethod: paymentMethod,
          razorpayPaymentId: razorpayPaymentId
        })
      });

      if (!response.ok) {
        throw new Error('Failed to create order');
      }

      alert('Order placed successfully');
      setModalIsOpen(false);
      fetchCartData();
    } catch (error) {
      console.error('Error creating order:', error);
      alert('Error placing order');
    }
  };

  if (error) {
    return <div className="error">{error}</div>;
  }

  if (cart.length === 0) {
    return <div className="cart-container">Your cart is empty</div>;
  }

  return (
    <div className="cart-container">
      <h2>Shopping Cart</h2>
      <ul className="cart-items">
        {cart.map((item) => (
          <li key={item.itemId} className="cart-item">
            <span className="item-name">{item.details.name}</span>
            <span className="item-price">${item.details.price}</span>
            <div className="quantity-controls">
              <button onClick={() => decrementQuantity(item.itemId)}>-</button>
              <span>{item.quantity}</span>
              <button onClick={() => incrementQuantity(item.itemId)}>+</button>
            </div>
            <button
              onClick={() => removeItem(item.itemId)}
              className="remove-btn"
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
      <div className="cart-total">
        <h3>Total: ${totalPrice.toFixed(2)}</h3>
        <button className="checkout-btn" onClick={handleCheckout}>
          Checkout
        </button>
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        contentLabel="Payment Options"
        className="modal"
        overlayClassName="modal-overlay"
      >
        <div className="modal-content">
          <h2>Choose Payment Method</h2>
          <button onClick={() => { setPaymentMethod('razorpay'); handlePayment(); }} className="pay">Pay with Razorpay</button>
          <button onClick={() => { setPaymentMethod('pay_on_delivery'); handlePayment(); }} className="pay">Pay on Delivery</button>
          <button onClick={() => setModalIsOpen(false)} className="cancel">Cancel</button>
        </div>
      </Modal>
    </div>
  );
};

export default Cart;

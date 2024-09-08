import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './restaurantDetails.css';
import { useNavigate } from 'react-router-dom';

const Menu = () => {
    const [menu, setMenu] = useState(null);
    const [error, setError] = useState(null);
    const { id } = useParams();
    const navigate = useNavigate();
    async function getData() {
        try {
            const response = await fetch(`http://localhost:5000/res/restaurants/${id}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const json = await response.json();
            setMenu(json); 
        } catch (error) {
            console.error('Error fetching menu:', error);
            setError(error.message);
        }
    }

    async function moveToCart(itemId) {
        const token = localStorage.getItem('token')
        if(token == undefined){
            navigate('/login');
        }
        const menuId = menu._id
        const userId = sessionStorage.getItem('user_id');
        try {
            const response = await fetch('http://localhost:5000/cart/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({userId , itemId , menuId}),
            });

            if (!response.ok) {
                throw new Error('Failed to add item to cart');
            }

            const result = await response.json();
            console.log('Item added to cart:', result);
        } catch (error) {
            console.error('Error moving to cart:', error);
        }
    }

    useEffect(() => {
        getData();
    }, [id]);

    if (error) {
        return <h3 className="error">Error: {error}</h3>;
    }

    if (!menu) {
        return <h3 className="loading">Loading...</h3>;
    }

    return (
        <div className="restaurant-details">
            <h2 className="restaurant-title">Restaurant: {menu.name}</h2>
            <ul className="restaurant-info">
                {menu.eatables && menu.eatables.length > 0 ? (
                    menu.eatables.map((item) => (
                        <li key={item._id}>
                            <strong>{item.name}</strong>: {item.description} - ${item.price}
                            <button 
                                className="move-to-cart-btn" 
                                onClick={() => moveToCart(item._id)}
                            >
                                Move to Cart
                            </button>
                        </li>
                    ))
                ) : (
                    <li>No items available</li>
                )}
            </ul>
        </div>
    );
};

export default Menu;

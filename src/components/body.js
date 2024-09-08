import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

const Rest = ({ card1, addToCart }) => {
    return (
        <div className='card'>
            <img className='image' src="https://via.placeholder.com/150" alt={card1.name} />
            <h4>{card1.name}</h4>
        </div>
    );
};

const filterData = (list, inputValue) => {
    if (!inputValue) return list;
    return list.filter((item) => item.name.toLowerCase().includes(inputValue.toLowerCase()));
};

const Body = () => {
    const [allList, setAllList] = useState([]);
    const [realList, setRealList] = useState([]);
    const [inputValue, setInputValue] = useState("");
    const [cart, setCart] = useState([]);

    useEffect(() => {
        async function fetchRestaurants() {
            try {
                const response = await fetch('http://localhost:5000/res/restaurants');
                const data = await response.json();
                setAllList(data);
                setRealList(data);
            } catch (e) {
                console.error('Error fetching restaurant data:', e);
            }
        }
        fetchRestaurants();
    }, []);

    const addToCart = (item) => {
        setCart([...cart, item]);
    };

    const handleSearch = () => {
        setRealList(filterData(allList, inputValue));
    };

    return (
        <>
            <div className="search-bar">
                <input
                    type="text"
                    className="searchBar"
                    placeholder="Search"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                />
                <button type='button' className="button" onClick={handleSearch}>Search</button>
            </div>

            <div className="rescard">
                {realList.map((record) => (
                    <Link to={`/restaurant/${record._id}`} style={{ color: 'black', textDecoration: 'none' }} key={record._id}>
                        <Rest card1={record} addToCart={addToCart} />
                    </Link>
                ))}
            </div>

            <div className="cart">
                <h3>Cart Items:</h3>
                <ul>
                    {cart.map((item, index) => (
                        <li key={index}>{item.name}</li>
                    ))}
                </ul>
            </div>
        </>
    );
};

export default Body;

import React from 'react';
import ReactDOM from 'react-dom/client';
import Header from './components/header';
import Body from './components/body';
import Footer from './components/Footer/footer.js'
import {createBrowserRouter,RouterProvider, Outlet} from "react-router-dom"
import About from "./components/About/About.js"
import Error from "./components/Error"
import Contact from "./components/Contact/contact.js"
import Menu from "./components/restaurantDetails/restaurantDetails.js"
import Login from "./components/loginAndRegister/LoginAndRegister.js"
import Cart from './components/cart/cart.js';
import ProfilePage from './components/profile/profile.js';
import Order from './components/order/order.js';
//const heading = React.createElement("h1",{},"heading1")
// const Heading = () => (<h1 className='h1' key= "h1">Heading 1</h1>)//()-if multiple line ----it is jsx expression

// // react components - functional and class based
// // 1. functional Components
// const head2 = (
//     <h2>lemon pagal hai</h2>
// )
// const HeaderComponent = () => {
//     return (<div>
//             <h1>hello everyone</h1>
//             <h2> My name is Roshan</h2>
//            </div>);
// }
// const HeaderComponent2 = () => (
//         <div>
//             <Heading /> 
//             {Heading()}
//             <Heading></Heading>
//             {head2}
//             <h1>hello everyone</h1>      
//             <h2> My name is Roshan</h2>
//         </div>
// );
// //9 and 15 are same 

/*
header
    logo
    nav items(cart)
        home 
        about
        cart
body
    searchbar
    restraunt cart
footer
    links
*/






const AppLayout = () => (
    <>
        <Header />
        <Outlet/>
        <Footer/>
    </>
)
const router = createBrowserRouter([
    {
        path: "/",
        element: <AppLayout/>,
        errorElement: <Error/>,
        children : [
            {
                path: "/",
                element: <Body/>
            },
            {
                path: "/about",
                element: <About/>
            },
            {
                path: '/contact',
                element: <Contact/>
            },
            {
                path: '/restaurant/:id',
                element: <Menu/>
            },
            {
                path: '/login',
                element: <Login/>
            },
            {
                path: '/cart',
                element: <Cart/>
            },
            {
                path: '/profile',
                element: <ProfilePage/>,
            },
            {
                path: '/orders',
                element: <Order/>
            }
        ]
    },
    
])
const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(<RouterProvider router = {router} />);
//root.render(heading);
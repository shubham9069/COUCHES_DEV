
import { HashRouter, Route, Router, Routes } from 'react-router-dom';
import './App.css';
import './Homepage/Homepage.css'
import './product/Product.css'
import './Form/authForm.css'
import './pages/Profile.css'
import './Orders/Order.css'
import Navbar from './Homepage/Navbar';
import Homepage from './Homepage/Homepage';
import Product from './product/Product'
import ProductDetails from './product/ProductDetails';
import Cart from './product/Cart';
import Footer from './Homepage/Footer';
import Login from './Form/Login';
import Signup from './Form/Signup';
import Forget from './Form/Forget'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import PresistLogin from './pages/PresistLogin'
import RequiredLogin from './pages/Requiredlogin'
import Protected from './pages/Protected'
import ScrollToTop from './pages/ScrollToTop';
import Verify from './Form/Verify';
import Checkoutpage from './product/Checkoutpage';
import EditProfile from './pages/EditProfile';
import UserProfile from './pages/UserProfile';
import Thankyou from './product/Thankyou';
import Orders from './Orders/Orders';
import OrderDetails from './Orders/OrderDetails';
import { Category } from './product/Category';
import Contactus from './pages/Contactus'
import AboutUs from './pages/aboutus/AboutUs';




function App() {
  return (
   <HashRouter>
<ScrollToTop />
<Routes>

<Route element={<Protected/>} >
<Route path="/Login" element ={<Login/>}/>
<Route path="/Signup" element ={<Signup/>}/>
<Route path="/Forget" element ={<Forget/>}/>
<Route path="/Verify" element ={<Verify/>}/>
</Route>


<Route element={<PresistLogin/>}>

<Route path="/" element ={<><Navbar /><Homepage /><Footer /></>}/>
<Route path="/Allproduct" element ={<><Navbar /><Product /><Footer /></>}/>
<Route path="/Category/:id" element ={<><Navbar /><Category/><Footer /></>}/>
<Route path="/productDetails/:id" element ={<><Navbar /><ProductDetails /><Footer /></>}/>

<Route path="/about-us" element ={<><Navbar /><AboutUs url={"/about"}/><Footer /></>}/>
<Route path="/contact-us" element ={<><Navbar /><AboutUs/><Footer /></>}/>
<Route path="/contact-us" element ={<><Navbar /><Contactus/><Footer /></>}/>

<Route element ={<RequiredLogin/>}>
<Route path="/cart" element ={<><Navbar /><Cart/><Footer /></>}/>
<Route path="/checkout" element ={<><Navbar /><Checkoutpage type="cart"/><Footer /></>}/>
<Route path="/checkout-SingleProduct" element ={<><Navbar /><Checkoutpage /><Footer /></>}/>
<Route path="/editprofile" element ={<><Navbar /><UserProfile/><Footer /></>}/>
<Route path="/MyOrders" element ={<><Navbar /><Orders/><Footer /></>}/>
<Route path="/orderDetails/:id" element ={<><Navbar /><OrderDetails/><Footer /></>}/>
<Route path="/thankyou" element ={<><Navbar /><Thankyou title={"Thnakyou For Choosing Us"} desc={"Payment was successful and your order is confirmed Enjoy the excellent service and fast delivery."}/><Footer /></>}/>
<Route path="/orderFailed" element ={<><Navbar /><Thankyou title={"Soory Your Order Has Been Failed"} desc={"Call us Our Helpline number +917845126325 we will reach you soon"} /><Footer /></>}/>

</Route>
</Route>

</Routes>

     <ToastContainer
position="top-right"
autoClose={2000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
draggable
pauseOnHover
theme="light"
/>
</HashRouter>
  );
}

export default App;

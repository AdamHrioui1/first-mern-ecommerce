import React, { useContext } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from '../components/header/Header';
import Home from '../components/pages/home/Home'
import Products from '../components/pages/products/Products'
import Cart from './pages/cart/Cart';
import About from './pages/about/About';
import Contact from './pages/contact/Contact';
import SingleProduct from './pages/singleProduct/SingleProduct';
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import AddProduct from './pages/add_product/AppProduct'
import Orders from './pages/orders/Orders';
import OrderDetails from './pages/orderDetails/OrderDetails';
import GlobaleCotext from '../GlobaleCotext';
import Edit from './pages/Edit/Edit';
import Faq from './pages/faq/Faq';
import PrivacyPolicy from './pages/privacyPolicy/PrivacyPolicy';
import TermsConditions from './pages/termsCondition/TermsConditions';
import Cookies from './pages/cookies/Cookies';
import Refund from './pages/refund/Refund';
import Error404 from './pages/error404/Error404';

function Routers() {
  const state = useContext(GlobaleCotext)
  const [isAdmin] = state.userApi.isAdmin
  const [isLogged] = state.userApi.isLogged

  return (
    <Router>
      <Header />
      <div className="App">
        <Routes>
          <Route  path='/' exact element={<Home />} />
          <Route  path='/products' exact element={<Products />} />
          <Route  path='/products/:id' exact element={<SingleProduct />} />
          <Route  path='/cart' exact element={<Cart />} />
          
          <Route  path='/about' exact element={<About />} />
          <Route  path='/register' exact element={<Register /> } />
          <Route  path='/login' exact element={<Login /> } />

          <Route  path='/orders' exact element={isLogged ? <Orders /> : <Login /> } />
          <Route  path='/orders/:id' exact element={isLogged ? <OrderDetails /> : <Login /> } />
          
          <Route  path='/add_product' exact element={isAdmin ? <AddProduct /> : <Products /> } />
          <Route  path='/edit/:id' exact element={isAdmin ? <Edit /> : <Products /> } />

          <Route  path='/contact' exact element={<Contact />} />
          <Route  path='/faq' exact element={<Faq />} />
          <Route  path='/privacy_policy' exact element={<PrivacyPolicy />} />
          <Route  path='/terms_and_conditions' exact element={<TermsConditions />} />
          <Route  path='/cookies' exact element={<Cookies />} />
          <Route  path='/refund' exact element={<Refund />} />

          <Route  path='*' exact element={<Error404 />} />
        </Routes>
      </div>
    </Router>
  )
}

export default Routers
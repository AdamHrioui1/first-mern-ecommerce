import React, { useContext, useState, useEffect } from 'react'
import Cart from '../icons/Cart.svg'
import Cart2 from '../icons/Cart2.svg'
import { Link, useLocation } from 'react-router-dom'
import axios from 'axios'
import GlobaleCotext from "../../GlobaleCotext";

function Header() {
  const [menuIsOn, setMenuIsOn] = useState('')
  const state = useContext(GlobaleCotext)
  const [isRed, setIsRed] = state.isRed
  const [isSticky, setIsSticky] = state.isSticky
  const [cart] = state.userApi.cart
  const [isAdmin] = state.userApi.isAdmin
  const [isLogged] = state.userApi.isLogged

  const location = useLocation()

  const handleMenu = () => {
    if(menuIsOn.length === 0) {
      setMenuIsOn('on')
    }
    else {
      setMenuIsOn('')
    }
  }

  const logout = async () => {
    try {  
      await axios.get('/user/logout')
      localStorage.removeItem('firstlogin')
      window.location.href = '/'
    } catch (err) {
      console.log(err)
    }
  }

  const check = () => {
    if(window.location.pathname === '/') {
      setIsRed(true)
      setIsSticky(false)
    }
    else {
      setIsRed(false)
      setIsSticky(true)
    }
  }

  useEffect(() => {
    check()
  }, [isRed, isSticky, window.location.pathname])

  useEffect(() => {
    check()
  }, [])

  useEffect(() => {
    // console.log(location)
  }, [location])
  
  return (
    <nav className={`navbar ${isSticky ? 'sticky' : ''}`}>
        <ul className={`menu_list ${menuIsOn}`}>
          <li>
            <Link to='/' onClick={handleMenu}>Home</Link>
          </li>

          {
            isAdmin &&
            <li>
              <Link to='/add_product' onClick={handleMenu}>Add Products</Link>
            </li>
          }

          <li>
            <Link to='/products' onClick={handleMenu}>Products</Link>
          </li>
          {
            isLogged && !isAdmin &&
            <li>
              <Link to='/cart' onClick={handleMenu}>Cart</Link>
            </li>
          }
          {
            isLogged && 
            <li>
              <Link to='/orders' onClick={handleMenu}>Orders</Link>
            </li>
          }
          {
            !isLogged && 
            <li>
              <Link to='/login' onClick={handleMenu}>Login</Link>
            </li>
          }
          <li>
            <Link to='/contact' onClick={handleMenu}>Contact</Link>
          </li>
          <li>
            <Link to='/about' onClick={handleMenu}>About</Link>
          </li>

          {isLogged && <li onClick={logout}>Logout</li>}
        </ul>
        {
          <Link to='/'>
            <h1 className={`logo ${isRed ? 'red' : ''}`}>BowWoow.</h1>
          </Link>
        }
        {isAdmin && <h2 className='admin__dashboard' >Admin Dashboard</h2>}  
        <div className="right_navbar">
        <Link to='/cart'>
          {
            !isAdmin && <div className="cart">
              <img src={isRed ? Cart2 : Cart} alt='cart' />
              <span>{cart ? cart.length : 0}</span>
            </div>
          }
        </Link>

        <div className="burger">
            <input type="checkbox" className={`menu_checkbox ${menuIsOn}`} id="menu_checkbox" />
            {
              window.location.pathname === '/' ?
              <label onClick={handleMenu} className='red_label' htmlFor="menu_checkbox">
                <div></div>
                <div></div>
                <div></div>
              </label> :
              <label onClick={handleMenu} htmlFor="menu_checkbox">
                <div></div>
                <div></div>
                <div></div>
              </label>
            }
          </div>
        </div>
    </nav>
  )
}

export default Header
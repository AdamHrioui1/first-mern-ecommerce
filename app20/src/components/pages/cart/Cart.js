import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import GlobaleContext from '../../../GlobaleCotext'
import PaypalButton from './PaypalButton'
import TableItem from './TableItem'

function Cart() {
  const state = useContext(GlobaleContext)
  const [cart, setCart] = state.userApi.cart
  const [token] = state.token
  const [callback, setCallback] = state.callback
  const [total, setTotal] = useState(0)
  
  
  const getTotal = () => {
    setTotal(cart.reduce((prev, item) => {
      return prev + item.price * item.quantity
    }, 0))
  }

  useEffect(() => {
    getTotal()
  }, [cart])
  

  const addtocart = async () => {
    try {
        await axios.patch('/user/addtocart', {
            cart: []
        }, {
            headers: {
                'Authorization': token
            }
        })
    } catch (err) {
        alert(err.response.data.msg)
    }
  }

  const tranSuccess = async (payment) => {
    const { paymentID, address } = payment
    try {
      await axios.post('/api/payment', { paymentId: paymentID, address, cart }, {
        headers: { 'Authorization': token }
      })
      alert('Payment successfuly!')
      setCart([])
      addtocart()
      setCallback(!callback)

    } catch (err) {
      console.log(err.response)
    }
  }  
  
  if(cart.length === 0) return <h1 style={{'padding': '20px 40px'}} >Cart Empty!</h1>
  
  return (
    <div className='cart__page' >
      <div className='page__header'>
        <h1>Shopping Cart</h1>
        <div className="border"></div>
      </div>

      <div className='page__second__header'>
        <h2>You have Choose {cart.length} products</h2>
      </div>

      <div className="product__table">
        <div className="table__header">
          <ul>
            <li>Product</li>
            <li className='table__header__name'>Name</li>
            <li>Size</li>
            <li>Quantity</li>
            <li>Price</li>
          </ul>
        </div>

        {
          cart.map(product => {
            return (
              <TableItem key={product._id} product={product} />
            )
          })
        }

        <div className="total__payment__container">
          <div className="total__payment__info">
            <h2>Total</h2>
            <h2>${total.toFixed(2)}</h2>
          </div>
          <PaypalButton total={total} tranSuccess={tranSuccess} />
        </div>
      </div>
    </div>
  )
}

export default Cart
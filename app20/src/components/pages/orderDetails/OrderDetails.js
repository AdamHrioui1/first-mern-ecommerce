import React, { useState, useEffect, useContext } from 'react'
import { useParams } from 'react-router-dom';
import GlobaleContext from '../../../GlobaleCotext'
import OrderDetailsItem from './OrderDetailsItem';

function OrderDetails() {
  const state = useContext(GlobaleContext)
  const [history] = state.userApi.history
  const [order, setOrder] = useState([])
  const params = useParams()

  const getOrders = () => {
    if(params.id) {
      history.forEach(o => {
        return o._id === params.id && setOrder([o]) 
      });
    }
  }

  useEffect(() => {
    getOrders()
  }, [history, params.id])

  if(order.length === 0) return null

  return (
    <div className='cart__page' >
      <div className='page__header'>
        <h1>Order Details</h1>
        <div className="border"></div>
      </div>

      <div className='page__second__header'>
        <h2>You have Choose {order[0].cart.length} products</h2>
      </div>

      <div className="product__table">
        
        <div className="table__header">
          <ul>
            <li>Name</li>
            <li>Address</li>
            <li className='table__header__name'>Country</li>
            <li>City</li>
            <li>Postal Code</li>
          </ul>
        </div>
        
        <div className="table__product__item">
          <ul>
              <li>{order[0].name}</li>
              <li>{order[0].address.line1} </li>
              <li className='table__country__name'>{order[0].address.country_code} </li>
              <li>{order[0].address.city} </li>
              <li>{order[0].address.postal_code}</li>
          </ul>
        </div>

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
          order[0].cart.map(item => {
            return (    
              <OrderDetailsItem key={item._id} item={item} />
            )
          })
        }

      </div>
    </div>
  ) 
}

export default OrderDetails
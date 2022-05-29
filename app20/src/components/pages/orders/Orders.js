import React, { useContext } from 'react'
import GlobaleContext from '../../../GlobaleCotext'
import OrderItem from './OrderItem'

function Orders() {
  const state = useContext(GlobaleContext)

  const [history] = state.userApi.history
  const [isAdmin] = state.userApi.isAdmin

  return (
    <div className='cart__page'>
      <div className='page__header'>
        <h1>Your Orders</h1>
        <div className="border"></div>
      </div>

      <div className='page__second__header'>
        <h2>{isAdmin ? `You have ${history.length} Orders` : `You did ${history.length} Orders`} </h2>
      </div>

      <div className="product__table orders">
        <div className="table__header">
          <ul>
            <li>Payment ID</li>
            <li>Date of Orders</li>
            <li>Details</li>
          </ul>
        </div>

        {
          history.map(payment => {
            return (
              <OrderItem key={payment._id} payment={payment} />
            )
          })
        }
      </div>

    </div>
  )
}

export default Orders
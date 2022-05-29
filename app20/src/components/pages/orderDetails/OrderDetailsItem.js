import React from 'react'

function OrderDetailsItem({ item }) {
  return (
    <div className="table__product__item">
        <ul>
            <li>
                <div className="img__container">  
                    <img src={item.images[0].secure_url} alt="" />
                </div>
            </li>
            <li className='table__item__name'>{item.name}</li>
            <li>{item.size}</li>

            <li className='quantity'>
                <h3>{item.quantity}</h3>
            </li>

            <li>${item.price}.00</li>
        </ul>
    </div>
  )
}

export default OrderDetailsItem
import React from 'react'
import { Link } from 'react-router-dom'

function YouMayLike({ product }) {
  const { _id, name, images, price } = product

  return (
    <Link to={`/products/${_id}`} className='presented_product'>
      <div className="presented_product_img_container">
          <img src={images[0].secure_url} alt={name} />
      </div>
      <h1>{name.length > 22 ? name.slice(0, 22) + '...' : name }</h1>
      <h2>${price.toFixed(2)}</h2>
    </Link>
  )
}

export default YouMayLike
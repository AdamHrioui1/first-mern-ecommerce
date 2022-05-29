import { motion } from 'framer-motion'
import React from 'react'

function SingleProductLoading() {
  return (
    <div className='single__product__loaging__page'>
    
      <div className='page__header'>
        <motion.h1 layoutId='header'>Product Details</motion.h1>
        <motion.div layoutId='border' className="border"></motion.div>
      </div>

      <div className="img__container__loading__page">
        <div className="img__container__loading"></div>
      </div>

      <div className="info__loading">
        <div className="product__name__loading"></div>
        <div className="price__loading"></div>
        <div className="border__loading"></div>
        <div className="description__loading">
          <div className="desc__loading"></div>
          <div className="desc__loading"></div>
          <div className="desc__loading"></div>
          <div className="desc__loading"></div>
          <div className="desc__loading"></div>
          <div className="desc__loading"></div>
          <div className="desc__loading"></div>
          <div className="desc__loading"></div>
          <div className="desc__loading"></div>
          <div className="desc__loading"></div>
          <div className="desc__loading"></div>
          <div className="desc__loading"></div>
        </div>
        <div className="button__loading"></div>
      </div>
    </div>
  )
}

export default SingleProductLoading
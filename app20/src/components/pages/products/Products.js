import React, { useState, useEffect, useContext } from 'react'
import ProductItem from './ProductItem'
import { Link } from 'react-router-dom'
import GlobaleCotext from '../../../GlobaleCotext'
import LoadingProducts from '../LoadingProducts/LoadingProducts'

import { AnimateSharedLayout, motion } from 'framer-motion'

function Products() {
  const state = useContext(GlobaleCotext)
  const [products] = state.products.products
  const [allProducts, setAllProducts] = useState([])

  useEffect(() => {
    if(products) {
      getProducts()
    }
  }, [products, allProducts])

  const getProducts = async () => {
    setAllProducts(products)
  }

  if(products.length === 0) return <LoadingProducts />

  return (
    <div className='product_page'>
      <div className='page__header'>
        <motion.h1 layoutId='header'>Our Products</motion.h1>
        <motion.div layoutId='border' className="border"></motion.div>
      </div>

      <div className='products__handler'>
        {/* <AnimateSharedLayout> */}
          {
            allProducts.map(product => {
              return <ProductItem key={product._id} product={product} />
            })
          }
        {/* </AnimateSharedLayout> */}
            
      </div>
    </div>
  )
}

export default Products
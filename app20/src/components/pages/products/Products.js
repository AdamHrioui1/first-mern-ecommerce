import React, { useEffect } from 'react'
import { motion } from 'framer-motion'
import Footer from '../../footer/Footer'
import Filter from '../../filter/Filter'
import Pagination from '../../pagination/Pagination'
import GetAllProducts from './GetAllProducts'

function Products() {
  useEffect(() => {
      console.clear()
  }, [])
  
  return (
    <div className='product_page'>
      <div className='page__header'>
        <motion.h1 layoutId='header'>Our Products</motion.h1>
        <motion.div layoutId='border' className="border"></motion.div>
      </div>

      <Filter />
      <GetAllProducts />
      <Pagination />
      <Footer />
    </div>
  )
}

export default Products
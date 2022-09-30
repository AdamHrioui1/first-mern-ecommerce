import React, { useContext, useEffect, useState } from 'react'
import GlobaleCotext from '../../../GlobaleCotext'
import LoadingProducts from '../LoadingProducts/LoadingProducts'
import ProductItem from './ProductItem'

function GetAllProducts() {
  const state = useContext(GlobaleCotext)
  const [products] = state.products
  
  const [allProducts, setAllProducts] = useState([])
  const [loading, setLoading] = useState(true)

    useEffect(() => {
        setLoading(true)
        if(products) {
            getProducts()
            setLoading(false)
        }
    }, [products, allProducts])

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])
    

    const getProducts = async () => {
        setAllProducts(products)
    }

    if(products.length === 0 && loading === true) return <LoadingProducts />
    if(products.length === 0 && loading === false) return <h1 style={{ textAlign: 'center'}}>No products</h1>
        
    return (
        <div className='products__handler'>
            {
                allProducts.map(product => {
                    return <ProductItem key={product._id} product={product} />
                })
            }
        </div>
    )
}

export default GetAllProducts
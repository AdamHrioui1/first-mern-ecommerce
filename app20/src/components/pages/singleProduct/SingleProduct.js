import { motion, AnimatePresence } from 'framer-motion'
import React, { useState, useEffect, useContext } from 'react'
import { Link, useParams } from 'react-router-dom'
import GlobaleCotext from '../../../GlobaleCotext'
import SingleProductLoading from './SingleProductLoading'

function SingleProduct() {
    const state = useContext(GlobaleCotext)
    const params = useParams()
    const [products] = state.products.products
    const addToCart = state.userApi.addToCart
    const [isLogged] = state.userApi.isLogged
    const [cart] = state.userApi.cart

    const [product, setProduct] = useState([])
    const [productInCart, setProductInCart] = useState(false)
    const [showMsg, setShowMsg] = useState(false)

    useEffect(() => {
        getProduct()
    }, [params.id, products])

    useEffect(() => {
        if(cart.length > 0 && product) {
            const single__product = document.getElementById('single__product')
            let findInCart = cart.some(item => {
                return item._id === product._id
            })

            findInCart ? setProductInCart(true) : setProductInCart(false)
        }
    }, [cart, product])
    
    const getProduct = () => {
        products.forEach(item => {
            if(item._id === params.id) return setProduct(item)
        });
    }

    useEffect(() => {
        setTimeout(() => {
            if (showMsg) {  
                setShowMsg(false)
            }
        }, 2000);
    }, [addToCart])
    
    const addToCartShowMsg = (product) => {
        addToCart(product)
        if(!productInCart && isLogged) {
            setShowMsg(true)
        }
        else {
            setShowMsg(false)
        }
    }

    if(product.length === 0) return <SingleProductLoading />

    return (
        <div className='single__product'>
            {
                isLogged && showMsg ? 
                <div id="message" className={`message ${isLogged && !productInCart && addToCart ? 'show' : ''}`}>
                    <h1>Product Added To Cart</h1>
                </div>
                :
                ''
            }
            
            <div className='page__header'>
                <motion.h1 layoutId='header'>Product Details</motion.h1>
                <motion.div layoutId='border' className="border"></motion.div>
            </div>
            <div className="back">
                <Link to='/products'>&#8592; Back</Link>
            </div>
            
            <div className="clmn">
                <div className="product__img__container">
                    <motion.img src={product.images[0].secure_url} alt="" layoutId={product._id} />
                </div>
            </div>

            <div className="clmn">
                <div className="product__info">
                    <h1>{product.name}</h1>
                    <h2>${product.price.toFixed(2)}</h2>
                    <div className="border"></div>
                    <p>{product.description}</p>
                    {
                        productInCart ? <button className='btn disable'>Product In The Cart</button>
                        :
                        <button className='btn' onClick={() => addToCartShowMsg(product)}>Add To Cart</button>
                    }
                </div>
            </div>
        </div>
    )
}

export default SingleProduct
import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import Edit from '../../icons/Edit.svg'
import Delete from '../../icons/Delete.svg'
import GlobaleCotext from '../../../GlobaleCotext'
import axios from 'axios'
import { motion } from 'framer-motion'


function ProductItem({ product }) {
    const { _id, name, price, images } = product
    const state = useContext(GlobaleCotext)
    const [products] = state.products
    const [isAdmin] = state.userApi.isAdmin
    const [token] = state.token
    const [callback, setCallback] = state.callback

    const [startTouchingProduct, setStartTouchingProduct] = useState(false)

    const deleteImages = async (id) => {
        try {
            await axios.post('/api/destroy', { public_id: id }, {
                headers: {
                    'Authorization': token
                }
            })
        } catch (err) {
            console.log(err)
        }
    }

    const deleteProduct = async (id) => {
        if(window.confirm('Are you sure you want to delete this product!')) {
            const getimage = products.find(p => p._id === id)
            for(var i = 0; i < getimage.images.length; i++) {
                deleteImages(getimage.images[i].public_id)
            }
            
            try {
                await axios.delete(`/api/product/${id}`, {
                    headers: {
                        'Authorization': token
                    }
                })

                setCallback(!callback)
            } catch (err) {
                console.log(err.response)
            }
        }
    }
    

    const startTouching = () => setStartTouchingProduct(true)

    const endTouching = () => setStartTouchingProduct(false)

    return (
        <div key={_id} className='product__item'>
            {isAdmin && 
                <div className="updateOrDelete">
                    <h2>Update Or Delete Your Product</h2>
                    <div className="updateOrDelete__container">
                        <Link to={`/edit/${_id}`} >
                            <div className="updateBtn">
                                <img src={Edit} alt="edit" />
                            </div>
                        </Link>
                        <div className="deleteBtn" onClick={() => deleteProduct(_id)}>    
                            <img src={Delete} alt="delete" />
                        </div>
                    </div>
                </div>
            }

            <Link to={`/products/${_id}`}>
                <div className="img__container" onTouchStart={startTouching} onTouchEnd={endTouching}>    
                    <div className={`third__circle ${ startTouchingProduct ? 'active' : ''}`} style={{ backgroundColor: `${product.color && product.color}` }}></div>
                    <div className={`second__circle ${ startTouchingProduct ? 'active' : ''}`} style={{ backgroundColor: `${product.color && product.color}` }}></div>
                    <motion.div layoutId={`/main__circle/${_id}`} transition={{ duration: 1 }} className="main__circle" style={{ backgroundColor: `${product.color && product.color}` }}></motion.div>
                    <motion.img layoutId={_id} transition={{ duration: 1 }} src={images[0].secure_url} alt="" />
                </div>
                <div className="product__item__name__price">
                    <h2>{name.length > 22 ? name.slice(0, 22) + '...' : name }</h2>
                    <p className='price'>${price.toFixed(2)}</p>
                </div>
            </Link>
        </div>
    )
}

export default ProductItem
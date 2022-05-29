import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import Edit from '../../icons/Edit.svg'
import Delete from '../../icons/Delete.svg'
import GlobaleCotext from '../../../GlobaleCotext'
import axios from 'axios'
import { motion } from 'framer-motion'

function ProductItem({ product }) {
    const { _id, name, price, images } = product
    const state = useContext(GlobaleCotext)
    const [products] = state.products.products
    const [isAdmin] = state.userApi.isAdmin
    const [token] = state.token
    const [callback, setCallback] = state.callback

    const deleteProduct = async (id) => {
        
        if(window.confirm('Are you sure you want to delete this product!')) {
            try {
                const getimage = products.find(p => p._id === id)                
                await axios.post(`/api/destory`, { public_id: getimage.images[0].public_id }, {
                    headers: {
                        'Authorization': token
                    }
                })

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
            <div className="img__container">    
                <motion.img layoutId={_id} src={images[0].secure_url} alt="" />
            </div>
            <div className="product__item__name__price">
                <h2>{name}</h2>
                <p className='price'>${price.toFixed(2)}</p>
            </div>
        </Link>

        </div>
    )
}

export default ProductItem
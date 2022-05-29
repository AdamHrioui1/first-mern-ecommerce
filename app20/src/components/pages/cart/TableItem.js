import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import GlobaleContext from '../../../GlobaleCotext'
import Cross from '../../icons/Cross.svg'

function TableItem({ product }) {
    const { _id, name, quantity, sizeAndQuantity, price, images } = product
    const state = useContext(GlobaleContext)
    const [token] = state.token
    const [cart, setCart] = state.userApi.cart

    const [size, setSize] = useState(7)

    const addtocart = async () => {
        try {
            const res = await axios.patch('/user/addtocart', {
                cart: cart
            }, {
                headers: {
                    'Authorization': token
                }
            })
        } catch (err) {
            alert(err.response.data.msg)
        }
    }
    

    const increase = (id) => {
        cart.forEach(item => {
            if(item._id === id) product.quantity += 1
        });
        setCart([...cart])
        addtocart()
    }

    const decrease = (id) => {
        cart.forEach(item => {
            if(item._id === id) {
                product.quantity === 1 ? product.quantity = 1 :  product.quantity -= 1
            }
        });
        setCart([...cart])
        addtocart()
    }

    const handleRemove = (id) => {
        setCart([...cart.filter(item => {
            return item._id !== id
        })])
        
        cart.forEach((item, index) => {
            if(item._id === id) {
                setCart(cart.splice(index, 1))
            }
        })

        setCart([...cart])
        addtocart()
    }

    const handleSize = (e, id) => {
        setSize(e)
        cart.forEach(item => {
            if(item._id === id) {
                return item.size = e
            }
        });
        setCart([...cart])
        addtocart()
    }    

    return (
    <div className="table__product__item" key={_id}>
        <button onClick={() => handleRemove(_id)}>
            <img className='cross' src={Cross} alt="times" />
        </button>
        <ul>
            <li>
                <div className="img__container">  
                    <img src={images[0].secure_url} alt="" />
                </div>
            </li>
            <li className='table__item__name'>{name}</li>
            <li>
                <select onChange={(e) => handleSize(e.target.value, _id)} value={product.size} className='select__size'>
                    {
                        sizeAndQuantity.map(item => {
                            return parseInt(item.quantity) !== 0 && <option value={item.size} key={item.size} >{item.size}</option>
                        })
                    }
                </select>
            </li>

            <li className='quantity'>
                <h3>{quantity}</h3>
                <div className="quantity__btn">
                    <button className="plus" onClick={() => increase(_id)}>+</button>
                    <button className="minus" onClick={() => decrease(_id)}>-</button>
                </div>
            </li>

            <li>${price.toFixed(2)}</li>
        </ul>
    </div>
  )
}

export default TableItem
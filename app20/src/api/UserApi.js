import axios from 'axios'
import { useEffect, useState } from 'react'

function UserApi(token, callback) {
    const [isLogged, setIsLogged] = useState(false)
    const [isAdmin, setIsAdmin] = useState(false)
    const [cart, setCart] = useState([])
    const [history, setHistory] = useState([])

    const addToCart = async (product) => {
        if(!isLogged) return document.location.href = '/login'
        
        const check = cart.some(item => {
            return item._id === product._id 
        })

        if(!check) {
            setCart([...cart, {...product, quantity: 1, size: 7}])

            await axios.patch('/user/addtocart', {
                cart: [...cart, {...product, quantity: 1, size: 7}]
            }, {
                headers: {
                    'Authorization': token
                }
            })
        }
        else {
            alert('This products is alredy in the cart!')
        }
    }

    useEffect(() => {
        if(token) {
            const getUser = async () => {
                try {
                    const res = await axios.get('/user/userinfo', {
                        headers: {
                            'Authorization': token
                        }
                    })

                    setIsLogged(true)
                    setCart(res.data.user.cart)
                    res.data.user.role === '1234' ? setIsAdmin(true) : setIsAdmin(false)
                } catch (err) {
                    console.log(err.response)
                }
            }
            getUser()
        }
    }, [token])
    
    useEffect(() => {
        if(token) {
            const getHistory = async () => {
                try {
                    if(isAdmin) {
                        const res = await axios.get('/api/payment', {
                            headers: { 'Authorization': token }
                        })
                        setHistory(res.data.payments)
                    }
                    else {
                        const res = await axios.get('/user/history', {
                            headers: { 'Authorization': token }
                        })
                        setHistory(res.data.history)
                    }
                } catch (err) {
                    console.log(err.response)
                }
            }
            getHistory()
        }
    }, [token, isAdmin, callback])

    return {
        cart: [cart, setCart],
        addToCart: addToCart,
        isLogged: [isLogged, setIsLogged],
        isAdmin: [isAdmin, setIsAdmin],
        history: [history, setHistory]
    }
}

export default UserApi
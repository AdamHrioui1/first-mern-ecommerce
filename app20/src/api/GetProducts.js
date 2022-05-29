import { useEffect, useState } from 'react'
import axios from 'axios'

function GetProducts(callback) {
    const [products, setProducts] = useState([])

    const getProducts = async () => {
        try {
            const res = await axios.get('/api/product')

            setProducts(res.data.products)
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        getProducts()
    }, [callback])

    return {
        products: [products, setProducts]
    }
}

export default GetProducts
import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react'
import UserApi from './api/UserApi';

export const GlobaleCotext = createContext()

export const DataProvider = ({ children }) => {
  const [products, setProducts] = useState([])
  const [allproducts, setAllProducts] = useState([])
  const [token, setToken] = useState('')
  const [callback, setCallback] = useState(false)
  const [isRed, setIsRed] = useState(false)
  const [isSticky, setIsSticky] = useState(false)
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('')
  const limit = 20;

  useEffect(() => {
    const getProducts = async () => {
        try {
          const res = await axios.get(`/api/product?page=${page}&name[regex]=${search}&brand[regex]=${category}&limit=${limit}`)
          const resProducts = await axios.get(`/api/product?limit=1000`)
          
          setAllProducts(resProducts.data.products)
          setProducts(res.data.products)
        } catch (err) {
          console.log(err.response.data.msg)
        }
    }
    
    getProducts()
  }, [callback, page, search, category])

  const getToken = async () => {
    try {
      const res = await axios.get('/user/refreshtoken')
      setToken(res.data.accesstoken)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    const firstlogin = localStorage.getItem('firstlogin')
    if(firstlogin) {
      getToken()
    }
  }, [])
  
  let state = {
    token: [token, setToken],
    products: [products, setProducts],
    AllProducts: [allproducts, setAllProducts],
    page: [page, setPage],
    search: [search, setSearch],
    userApi: UserApi(token, callback),
    callback: [callback, setCallback],
    isRed: [isRed, setIsRed],
    isSticky: [isSticky, setIsSticky],
    category: [category, setCategory],
    limit: limit
  }
  
  return (
      <GlobaleCotext.Provider value={state} >
        {children}
      </GlobaleCotext.Provider>
  )
}

export default GlobaleCotext
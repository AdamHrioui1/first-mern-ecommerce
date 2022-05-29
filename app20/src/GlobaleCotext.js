import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react'
import GetProducts from './api/GetProducts';
import UserApi from './api/UserApi';

export const GlobaleCotext = createContext()

export const DataProvider = ({ children }) => {
  const [token, setToken] = useState('')
  const [callback, setCallback] = useState(false)
  const [isRed, setIsRed] = useState(false)
  const [isSticky, setIsSticky] = useState(false)


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
    products: GetProducts(callback),
    userApi: UserApi(token, callback),
    callback: [callback, setCallback],
    isRed: [isRed, setIsRed],
    isSticky: [isSticky, setIsSticky]
  }
  
  return (
      <GlobaleCotext.Provider value={state} >
        {children}
      </GlobaleCotext.Provider>
  )
}

export default GlobaleCotext
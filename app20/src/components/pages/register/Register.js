import axios from 'axios'
import { motion } from 'framer-motion'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Loading from '../Loading/Loading'

function Register() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleRegister = async e => {
    e.preventDefault()
    try {
      setIsLoading(true)
      await axios.post('/user/register', {
        name: name, email: email, password: password
      })

      setIsLoading(false)
      localStorage.setItem('firstlogin', true)
      window.location.href = '/login'
    } catch (err) {
      setIsLoading(false)
      alert(err.response.data.msg)
    }
  }
  
  return (
    <div className='login__page'>
      <div className='page__header'>
        <motion.h1 layoutId='header'>Register</motion.h1>
        <motion.div layoutId='border' className="border"></motion.div>
      </div>

      <div className="login__container">  
        <div className="account__form">
          <motion.h3 layoutId='h3Form'>Create an account in</motion.h3>
          <motion.h1 layoutId='h1Form'>BowWoow.</motion.h1>

          {
            isLoading ?
            <Loading />
            :
            <motion.form layoutId='formTransition' className='form' onSubmit={handleRegister}>
              <div className='input__container'>
                <input type='text' className='input' placeholder=' ' name='name' id='name' onChange={e => setName(e.target.value)} />
                <label htmlFor='name' className='label'>Name</label>
              </div>

              <div className='input__container'>
                <input type='email' className='input' placeholder=' ' name='email' id='email' onChange={e => setEmail(e.target.value)} />
                <label htmlFor='email' className='label'>Email</label>
              </div>

              <div className='input__container'>
                <input type='password' className='input' placeholder=' ' name='password' id='password' onChange={e => setPassword(e.target.value)} />
                <label htmlFor='password' className='label'>Password</label>
              </div>
              
              <button type='submit' className='form__button'>Login</button>
            </motion.form>
          }

          <h5>Already have an account - <Link to='/login'>Sign in</Link></h5>

        </div>
      </div>
    </div>
  )
}

export default Register
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Loading from '../Loading/Loading'
import axios from 'axios'
import Footer from '../../footer/Footer'

function Contact() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const sendMessage = async e => {
    e.preventDefault()
    setIsLoading(true)

    console.log({ name, email, message })
    try {
      if(name.length > 3 && email.length > 12 && message.length > 10) {
        const res = await axios.post('/api/contact', {
          name: name, email: email, message: message
        })

        res.data && messageSent()
      }
      else {
        setIsLoading(false)
        window.alert('Please fill all the fields!')
      }
    } catch (err) {
      console.log(err)
    }
  }

  const messageSent = () => {
    setIsLoading(false)
    setName('')
    setEmail('')
    setMessage('')
    window.alert('Message sent successfuly!')
  }

  return (
    <div className='login__page'>

      <div className="login__container">  
        <div className="account__form">
          <h3>Need support? Contact us.</h3>
          <h1 style={{ marginTop: 0 }}>BowWoow.</h1>

          {
            isLoading ?
            <Loading />
            :
            <form className='form' onSubmit={sendMessage}>
              <div className='input__container'>
                <input type='text' className='input' placeholder=' ' name='name' id='name' onChange={e => setName(e.target.value)} value={name} />
                <label htmlFor='name' className='label'>name</label>  
              </div>

              <div className='input__container'>
                <input type='email' className='input' placeholder=' ' name='email' id='email' onChange={e => setEmail(e.target.value)} value={email} />
                <label htmlFor='email' className='label'>Email</label>  
              </div>

              <div className='input__container textarea'>
                <textarea cols="30" rows="4" className='input textarea' placeholder=' ' name='message' id='message' onChange={e => setMessage(e.target.value)} value={message}></textarea>
                <label htmlFor='message' className='label'>Message</label>  
              </div>
              
              <button type='submit' className='form__button' style={{ marginBottom: 0 }}>Send</button>

            </form>
          }        
        </div>
      </div>
    </div>
  )
}

export default Contact
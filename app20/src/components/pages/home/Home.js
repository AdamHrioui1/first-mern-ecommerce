import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import Facebook from '../../icons/Facebook.svg'
import Instagram from '../../icons/Instagram.svg'
import Arrow from '../../icons/Arrow.svg'
import landing_img from '../../images/landing_page_img.webp'
import GlobalCotext from '../../../GlobaleCotext'

function Home() {
  const state = useContext(GlobalCotext)
  const [setIsRed] = state.isRed
  const [setIsSticky] = state.isSticky

  const explore = () => {
    setIsRed(false)
    setIsSticky(true)
    window.location.pathname = '/products'
  }

  return (
    <div className='home_container'>
      <div className="column2">
        <h2>LEGEND HAVE OWN PLACES</h2>
        <h1>BE PREPARED TO GREATNESS</h1>
        <p>No shoe will be worth wearing, despite its quality and value unless you feel comfortable in it.<br/>
        Think about your feet, care about your style and the manner of walking.</p>
        
        <img src={landing_img} className='landing_page_img' alt='shoes png' />
        <Link to='/products' className='landing_page_btn one'>
            <span>Explore</span>
            <img src={Arrow} alt='arrow' />
        </Link>
      </div>

      <div className='column2'>
        <img src={landing_img} className='landing_page_img' alt='shoes png' />
      </div>

      {/*-------------- Landing Page for Mobile -------------*/}
      <div className='mobile_landing_page'>
        <div className="mobile_row">
          <h2>LEGEND HAVE OWN PLACES</h2>
          <h1>BE PREPARED TO GREATNESS</h1>
        </div>

        <div className='mobile_row'>
          <img src={landing_img} className='mobile_img' alt='shoes png' />
        </div>

        <div className='mobile_row' >
          <p>Think about your feet, care about your style and the manner of walking.</p>
          <Link to='/products' className='landing_page_btn'>
              <span>Explore</span>
              <img src={Arrow} alt='arrow' />
          </Link>
        </div>
      </div>


      <div className="left_landing_page">
          <div className="left_border"></div>
          <img src={Facebook} alt='facebook icon svg' />
          <img src={Instagram} alt='instagram icon svg' />
      </div>
    </div>
  )
}

export default Home
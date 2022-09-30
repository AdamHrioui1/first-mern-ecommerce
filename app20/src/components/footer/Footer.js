import React from 'react'
import { Link } from 'react-router-dom'

function Footer() {
  return (
    <footer class="footer">
  	 <div class="footer__container">
  	 	<div class="footer_row">
  	 		<div class="footer-col">
  	 			<h4>company</h4>
  	 			<ul>
  	 				<li><p><Link to='/about'>about us</Link></p></li>
  	 				<li><p><Link to='/contact'>contact us</Link></p></li>
  	 				<li><p><Link to='/terms_and_conditions'>Terms and Conditions</Link></p></li>
  	 			</ul>
  	 		</div>
  	 		<div class="footer-col">
  	 			<h4>get help</h4>
  	 			<ul>
  	 				<li><p><Link to='/faq'>FAQ</Link></p></li>
  	 				<li><p><Link to='/privacy_policy'>Privacy Policy</Link></p></li>
  	 				<li><p><Link to='/terms_and_conditions'>Terms and Conditions</Link></p></li>
  	 				<li><p><Link to='/cookies'>Cookies Policy</Link></p></li>
  	 				<li><p><Link to='/refund'>Refund</Link></p></li>
  	 			</ul>
  	 		</div>
  	 		<div class="footer-col">
  	 			<h4>follow us</h4>
  	 			<ul>
  	 				<li><p><a href='https://www.facebook.com'>Facebook</a></p></li>
  	 				<li><p><a href='https://www.instagram.com'>Instagram</a></p></li>
  	 				<li><p><a href='https://www.pinterest.com'>Pinterest</a></p></li>
  	 				<li><p><a href='https://www.linkdin.com'>Linkdin</a></p></li>
  	 			</ul>
  	 		</div>
  	 	</div>
  	 </div>
    </footer>
  )
}

export default Footer
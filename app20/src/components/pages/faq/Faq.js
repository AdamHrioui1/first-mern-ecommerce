import React from 'react'
import Footer from '../../footer/Footer'

function Faq() {
  return (
    <div>
        <div className='privacy_policy_container'>            
            <h1>What are the delivery charges for orders from BowWoow.com?</h1>
            <p>We offer FREE shipping to our US, UK, and Canadian customers. All you need to pay is the cost of the product and we will deliver it to your doorstep for no additional cost.</p>

            <h1>Which payment methods are accepted?</h1>
            <p>You can pay for your order with PAYPAL, Debit Card, and Credit Card. We are integrating new payment options soon.</p>

            <h1>How long will delivery take?</h1>
            <p>Most of our products get delivered within 9-15 business days (depends on the delivery address) after we ship the order. Whereas, in some cases, it may take a little bit extra time in the order processing (3 days on average) from our store. If you don’t receive your product within 45 days after we ship the order, you can contact us via the given form and we will investigate the issue and process refunds (if required).</p>

            <h1>How secure is shopping on BowWoow.com? Is my data protected?</h1>
            <p>We use let’s Encrypt SSL encryption to protect your personal information and payments. We have a strict no-data sharing policy to protect your personal information. We don’t keep your sensitive payment information or details with us.</p>
        </div>

        <Footer />
    </div>
  )
}

export default Faq
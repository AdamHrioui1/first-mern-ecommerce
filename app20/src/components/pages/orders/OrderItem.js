import React from 'react'
import { Link } from 'react-router-dom'

function OrderItem({ payment }) {
    const formatDate = (date) => {
        const d = new Date(date)
        const day = d.getDate()
        const month = d.getMonth()
        const year = d.getFullYear()

        return `${day}-${month}-${year}`
    }

    return (
    <div className="table__product__item">
        <ul>
            <li>{payment.paymentId}</li>
            <li>{(formatDate(payment.createdAt))}</li>
            <li>
                <Link to={`/orders/${payment._id}`}>View</Link>
            </li>
        </ul>
    </div>
  )
}

export default OrderItem
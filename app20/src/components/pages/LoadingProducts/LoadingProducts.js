import React from 'react'

function LoadingProducts() {
    const loadingProducts = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    return (
        <div className='product_page'>
            <div className='products__handler'>
                {
                    loadingProducts.map((product, index) => {
                        return (
                            <div key={index} className='loading__container'>
                                <div className="loading__img__container"></div>
                                <div className='loading__name'></div>
                                <div className='loading__price'></div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default LoadingProducts
import React from 'react'

function LoadingCategories() {
    const categories = ['', '', '', '']

    return (
        <div className="filter__elements__container ld" style={{ paddingLeft: '40px' }}>
            <div className="filter__elements">   
            {
                categories.map((e, i) => {
                    return (
                        <div key={i} className='filter__element ld' style={{ padding: '15px', border: 'none', backgroundColor: '#e4e4e4', width: '100px' }}></div>
                    )
                })
            }
            </div>
        </div>
    )
}

export default LoadingCategories
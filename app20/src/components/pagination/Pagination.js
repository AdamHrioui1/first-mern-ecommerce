import React, { useState, useEffect, useContext } from 'react'
import GlobaleCotext from '../../GlobaleCotext'

function Pagination() {
    let [btns, setBtns] = useState([])
    const [currentPage, setCurrentPage] = useState(0)
    const [currentBtns, setCurrentBtns] = useState(0)
    const [currentBtn, setCurrentBtn] = useState(1)
    const state = useContext(GlobaleCotext)    
    const [products] = state.products
    const [allproducts] = state.AllProducts
    const [page, setPage] = state.page
    const limit = state.limit

    const itemsPerPage = limit;
  
    const getBtns = () => {
      btns = []
      const btnNumber = Math.ceil(allproducts.length / itemsPerPage)
      for (let i = 1; i <= btnNumber; i++) {
        btns.push(i)
      }
      setBtns(btns)
    }
  
    const setpage = (btn) =>  {
      setCurrentPage(btn - 1)
      setCurrentBtn(btn)
      setPage(btn)

      window.scrollTo(0, 0)
    }
  
    const prevBtns = () => {
      if(currentBtns <= 0) return;
      else {
        window.scrollTo(0, 0)
        return setCurrentBtns(currentBtns-1)
      }
    }
  
    const nextBtns = () => {
      if(currentBtns*5 + 5 >= btns.length) return;
      else {
        window.scrollTo(0, 0)
        return setCurrentBtns(currentBtns+1)
      }
    }
  
    useEffect(() => {
      getBtns()
      setCurrentPage(page)
    }, [products, allproducts])

    return (
        <div className='btns_conatiner'>
            {
              currentBtns*5 + 5 >= btns.length &&
              <button onClick={prevBtns}>
                  <svg aria-hidden="true" focusable="false" products-prefix="fas" products-icon="chevron-left" className="svg-inline--fa fa-chevron-left fa-w-10" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path fill="currentColor" d="M34.52 239.03L228.87 44.69c9.37-9.37 24.57-9.37 33.94 0l22.67 22.67c9.36 9.36 9.37 24.52.04 33.9L131.49 256l154.02 154.75c9.34 9.38 9.32 24.54-.04 33.9l-22.67 22.67c-9.37 9.37-24.57 9.37-33.94 0L34.52 272.97c-9.37-9.37-9.37-24.57 0-33.94z"></path></svg>
              </button>
            }
            {
              btns.slice(currentBtns*5, currentBtns*5+5).map((btn, index) => {
                return (
                  <button className={btn === currentPage ? 'active' : ''} key={index} onClick={() => setpage(btn)}>{btn}</button>
                )
              })
            }
            {
              currentBtns <= 0 &&
              <button onClick={nextBtns}>
                <svg aria-hidden="true" focusable="false" products-prefix="fas" products-icon="chevron-right" className="svg-inline--fa fa-chevron-right fa-w-10" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path fill="currentColor" d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z"></path></svg>
              </button>
            }
        </div>
    )
}

export default Pagination
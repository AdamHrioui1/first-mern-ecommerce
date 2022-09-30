import React, { useContext, useEffect, useRef, useState } from 'react'
import "swiper/css";
import "swiper/css/pagination";
import GlobaleCotext from '../../GlobaleCotext';
import LoadingCategories from '../pages/Loading/LoadingCategories';
import SearchIcon from '../icons/Search.svg'

function Filter() {
    const state = useContext(GlobaleCotext)
    const [search, setSearch] = state.search
    const [products] = state.products
    const [category, setCategory] = state.category
    const [allproducts] = state.AllProducts
    const [page, setPage] = state.page

    const [searcProducthName, setSearchProductName] = useState('')
    const [categories, setCategories] = useState([])

    const slider = useRef()

    useEffect(() => {       
        if(allproducts.length !== 0) {
            let categoriesArray = []
            allproducts.forEach((p, i) => {
                return categoriesArray.find(c => c === p.brand) ? categoriesArray : categoriesArray.push(allproducts[i].brand)   
            })
            setCategories(categoriesArray)
        }
    }, [products])

    useEffect(() => {
        setSearch('')
        setPage(1)
    }, [category])

    useEffect(() => {
        setCategory('')
        setPage(1)
    }, [search])
    
    const Search = e => {
        e.preventDefault()
        setSearch(searcProducthName)
        setSearchProductName('')
    }
    
    if(allproducts.length === 0) return <LoadingCategories />

    return (
        <div className='filter__container'>
            <div className="filter__elements__container">
                <div className="filter__elements" ref={slider}>
                    <div className={`filter__element ${category === '' ? 'active' : ''}`} onClick={() => setCategory('')}>
                        <p>All</p>
                    </div>

                    {
                        categories.map((e, i) => {
                            return (
                                <div key={i} className={`filter__element ${e === category ? 'active' : ''}`} onClick={() => setCategory(e)}>
                                    <p>{e}</p>
                                </div>
                            )
                        })
                    }

                </div>
            </div>

            <form className="search__container" onSubmit={Search}>
                <input type="text" name="search" id="search" onChange={e => setSearchProductName(e.target.value)} value={searcProducthName} placeholder='Yeezi 350, New Balence 550...' />    
                <button type='submit' className='search__btn'>
                    <img src={SearchIcon} alt="search svg" />
                </button>
            </form>
        </div>
    )
}

export default Filter
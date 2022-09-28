import React, { useContext, useEffect, useRef, useState } from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper";
import GlobaleCotext from '../../GlobaleCotext';
import Loading from '../pages/Loading/Loading';
import LoadingCategories from '../pages/Loading/LoadingCategories';
import SearchIcon from '../icons/Search.svg'

function Filter() {

    const state = useContext(GlobaleCotext)
    const [search, setSearch] = state.search
    const [products, setProducts] = state.products
    const [category, setCategory] = state.category
    const [allproducts] = state.AllProducts
    const [page, setPage] = state.page

    const [isDown, setIsDown] = useState(false)
    const [searcProducthName, setSearchProductName] = useState('')
    const [categories, setCategories] = useState([])

    var scrollLeft = 20;
    var clientX = 0;
    var x = 0;
    var scrollX = 0;

    const slider = useRef()


    const mouseDown = e => {
        setIsDown(true)
        clientX = e.clientX
    };

    const mouseUp = () => {
        setIsDown(false)
    };

    const mouseMove = e => {
        if (isDown) {
            slider.current.scrollLeft = scrollX - e.clientX + clientX;
            console.log({ calc: scrollX + e.clientX - clientX });
            scrollX = scrollX - e.clientX + clientX
            clientX = e.clientX
            slider.current.style.left = (e.clientX)*2 + 'px'
        }
    };

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
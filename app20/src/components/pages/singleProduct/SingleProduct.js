import { motion } from 'framer-motion'
import React, { useState, useEffect, useContext, useRef } from 'react'
import { Link, useParams, useLocation } from 'react-router-dom'
import GlobaleCotext from '../../../GlobaleCotext'
import ImgsArrow from '../../icons/ImgsArrow.svg'
import YouMayLike from './YouMayLike'
import Footer from '../../footer/Footer'
import Loading from '../Loading/Loading'

function SingleProduct() {
    const state = useContext(GlobaleCotext)
    const params = useParams()
    const [allproducts] = state.AllProducts
    const addToCart = state.userApi.addToCart
    const [isLogged] = state.userApi.isLogged
    const [cart] = state.userApi.cart

    const [product, setProduct] = useState([])
    const [productInCart, setProductInCart] = useState(false)
    const [showMsg, setShowMsg] = useState(false)
    const [changeImg, setChangeImg] = useState('')
    const [imgsLength, setImgsLength] = useState(0)
    const [imgsCounter, setImgsCounter] = useState(0)
    const [showedProductsCounter, setShowedProductsCounter] = useState(0)
    const [showedProductsWidth, setShowedProductsWidth] = useState(20)
    const [showPrevBtn, setShowPrevBtn] = useState(false)
    const [showNextBtn, setShowNextBtn] = useState(false)


    const [similarProductsCounter, setSimilarProductsCounter] = useState(0)
    const [similarProductsWidth, setSimilarProductsWidth] = useState(20)
    const [similarProductsshowPrevBtn, setsimilarProductsShowPrevBtn] = useState(false)
    const [showsimilarProductsNextBtn, setShowsimilarProductsNextBtn] = useState(false)
    const [randomProducts, setRandomProducts] = useState(0)

    useEffect(() => {
        getProduct()
    }, [params.id, allproducts])

    useEffect(() => {
        if(cart.length > 0 && product) {
            let findInCart = cart.some(item => {
                return item._id === product._id
            })

            findInCart ? setProductInCart(true) : setProductInCart(false)
        }
    }, [cart, product])
    
    const getProduct = () => {
        allproducts.forEach(item => {
            if(item._id === params.id) {
                setProduct(item)
                setChangeImg(item.images[0].secure_url)
                setImgsLength(item.images.length)
            }
        });
    }

    useEffect(() => {
        setTimeout(() => {
            if (showMsg) setShowMsg(false)
        }, 2000);
    }, [addToCart])

    useEffect(() => {
      window.scrollTo(0, 0)
    }, [])
       
    const addToCartShowMsg = (product) => {
        addToCart(product)
        if(!productInCart && isLogged) {
            setShowMsg(true)
        }
        else {
            setShowMsg(false)
        }
    }
    
    const leftImg = () => {
        if(imgsCounter > 0) {
            setImgsCounter(imgsCounter-1)
            setChangeImg(product.images[imgsCounter-1].secure_url)
        }
        else {
            setImgsCounter(0)
            setChangeImg(product.images[imgsCounter].secure_url)
        }
    }

    const rightImg = () => {
        if(imgsCounter < imgsLength-1) {
            setImgsCounter(imgsCounter+1)
            setChangeImg(product.images[imgsCounter+1].secure_url)
        }
        else {
            setImgsCounter(imgsCounter)
            setChangeImg(product.images[imgsCounter].secure_url)
        }
    }

    const changeImgSmallImg = (i, img) => {
        setChangeImg(img)
        setImgsCounter(i)
    }

    const DescWrapper = useRef()

    useEffect(() => {
        if(product.length !== 0) DescWrapper.current.innerHTML = product.description
        
        if (allproducts.length !== 0) {    
            const rn = Math.floor(Math.random() * ((allproducts.length - 8) - 1 + 1)) + 1
            setRandomProducts(rn)
        }
    }, [product])
    
    var distX, distY, x, y, touch, startTime, endTime;
    
    const startTouching = e => {
        touch = e.changedTouches[0];
        x = touch.clientX;
        y = touch.clientY;
        distX = 0;
        distY = 0;
        startTime = new Date().getTime();
    }

    const endTouching = e => {
        touch = e.changedTouches[0];
        distX = touch.clientX - x; 
        distY = touch.clientY - y;
        endTime = new Date().getTime() - startTime;

        if(distX > 30 && distY < 100 && endTime < 200){
            leftImg()
        }
        else if(distX < -30 && distY < 100 && endTime < 200){
            rightImg()
        }
    }

    useEffect(() => {
        if(window.innerWidth > 1000) {
            setShowedProductsWidth(20)
            showedProductsCounter > 0 ? setShowPrevBtn(true) : setShowPrevBtn(false)
        }
        else if(window.innerWidth <= 1000 && window.innerWidth > 650) {
            setShowedProductsWidth(25)
            showedProductsCounter > 0 ? setShowPrevBtn(true) : setShowPrevBtn(false)
        }
        else if(window.innerWidth <= 650 && window.innerWidth > 550) {
            setShowedProductsWidth(33)
            showedProductsCounter > 0 ? setShowPrevBtn(true) : setShowPrevBtn(false)
        }
        else if(window.innerWidth <= 550) {
            setShowedProductsWidth(50)
            showedProductsCounter > 0 ? setShowPrevBtn(true) : setShowPrevBtn(false)
        }

        /*  ----------- next -----------*/
        
        if(window.innerWidth > 1000) {
            setShowedProductsWidth(20)
            showedProductsCounter < 3 ? setShowNextBtn(true) : setShowNextBtn(false)
        }
        else if(window.innerWidth <= 1000 && window.innerWidth > 650) {
            setShowedProductsWidth(25)
            showedProductsCounter < 4 ? setShowNextBtn(true) : setShowNextBtn(false)
        }
        else if(window.innerWidth <= 650 && window.innerWidth > 550) {
            setShowedProductsWidth(33)
            showedProductsCounter < 5 ? setShowNextBtn(true) : setShowNextBtn(false)
        }
        else if(window.innerWidth <= 550) {
            setShowedProductsWidth(50)
            showedProductsCounter < 6 ? setShowNextBtn(true) : setShowNextBtn(false)
        }
    
    }, [showedProductsCounter])
    
    useEffect(() => {
        if(window.innerWidth > 1000) {
            setShowedProductsWidth(20)
            similarProductsCounter > 0 ? setsimilarProductsShowPrevBtn(true) : setsimilarProductsShowPrevBtn(false)
        }
        else if(window.innerWidth <= 1000 && window.innerWidth > 650) {
            setShowedProductsWidth(25)
            similarProductsCounter > 0 ? setsimilarProductsShowPrevBtn(true) : setsimilarProductsShowPrevBtn(false)
        }
        else if(window.innerWidth <= 650 && window.innerWidth > 550) {
            setShowedProductsWidth(33)
            similarProductsCounter > 0 ? setsimilarProductsShowPrevBtn(true) : setsimilarProductsShowPrevBtn(false)
        }
        else if(window.innerWidth <= 550) {
            setShowedProductsWidth(50)
            similarProductsCounter > 0 ? setsimilarProductsShowPrevBtn(true) : setsimilarProductsShowPrevBtn(false)
        }

        /*  ----------- next -----------*/
        
        if(window.innerWidth > 1000) {
            setShowedProductsWidth(20)
            similarProductsCounter < 3 ? setShowsimilarProductsNextBtn(true) : setShowsimilarProductsNextBtn(false)
        }
        else if(window.innerWidth <= 1000 && window.innerWidth > 650) {
            setShowedProductsWidth(25)
            similarProductsCounter < 4 ? setShowsimilarProductsNextBtn(true) : setShowsimilarProductsNextBtn(false)
        }
        else if(window.innerWidth <= 650 && window.innerWidth > 550) {
            setShowedProductsWidth(33)
            similarProductsCounter < 5 ? setShowsimilarProductsNextBtn(true) : setShowsimilarProductsNextBtn(false)
        }
        else if(window.innerWidth <= 550) {
            setShowedProductsWidth(50)
            similarProductsCounter < 6 ? setShowsimilarProductsNextBtn(true) : setShowsimilarProductsNextBtn(false)
        }
    
    }, [similarProductsCounter])

    const nextProducts = () => {
        if(window.innerWidth > 1000) {
            setShowedProductsWidth(20)
            if(showedProductsCounter < 3) setShowedProductsCounter(showedProductsCounter+1)
        }
        else if(window.innerWidth <= 1000 && window.innerWidth > 650) {
            setShowedProductsWidth(25)
            if(showedProductsCounter < 4) setShowedProductsCounter(showedProductsCounter+1)
        }
        else if(window.innerWidth <= 650 && window.innerWidth > 550) {
            setShowedProductsWidth(33)
            if(showedProductsCounter < 5) setShowedProductsCounter(showedProductsCounter+1)
        }
        else if(window.innerWidth <= 550) {
            setShowedProductsWidth(50)
            if(showedProductsCounter < 6) setShowedProductsCounter(showedProductsCounter+1)
        }
    }
    
    const prevProducts = () => {
        if(window.innerWidth > 1000) {
            setShowedProductsWidth(20)
            if(showedProductsCounter > 0) {
                setShowedProductsCounter(showedProductsCounter-1)
                setShowPrevBtn(true)
            }
            else {
                setShowPrevBtn(false)
            }
        }
        else if(window.innerWidth <= 1000 && window.innerWidth > 650) {
            setShowedProductsWidth(25)
            if(showedProductsCounter > 0) setShowedProductsCounter(showedProductsCounter-1)
        }
        else if(window.innerWidth <= 650 && window.innerWidth > 550) {
            setShowedProductsWidth(33)
            if(showedProductsCounter > 0) setShowedProductsCounter(showedProductsCounter-1)
        }
        else if(window.innerWidth <= 550) {
            setShowedProductsWidth(50)
            if(showedProductsCounter > 0) setShowedProductsCounter(showedProductsCounter-1)
        }
    }

    const YMALSwiperStartTouching = e => {
        touch = e.changedTouches[0];
        x = touch.clientX;
        y = touch.clientY;
        distX = 0;
        distY = 0;
        startTime = new Date().getTime();
    }

    const YMALSwiperEndTouching = e => {
        touch = e.changedTouches[0];
        distX = touch.clientX - x; 
        distY = touch.clientY - y;
        endTime = new Date().getTime() - startTime;

        if(distX > 30 && distY < 100 && endTime < 200){
            prevProducts()
        }
        else if(distX < -30 && distY < 100 && endTime < 200){
            nextProducts()
        }
    }

    const SPSwiperStartTouching = e => {
        touch = e.changedTouches[0];
        x = touch.clientX;
        y = touch.clientY;
        distX = 0;
        distY = 0;
        startTime = new Date().getTime();
    }

    const SPSwiperEndTouching = e => {
        touch = e.changedTouches[0];
        distX = touch.clientX - x; 
        distY = touch.clientY - y;
        endTime = new Date().getTime() - startTime;

        if(distX > 30 && distY < 100 && endTime < 200){
            prevSimilarProducts()
        }
        else if(distX < -30 && distY < 100 && endTime < 200){
            nextSimilarProducts()
        }
    }

    const nextSimilarProducts = () => {
        if(window.innerWidth > 1000) {
            setSimilarProductsWidth(20)
            if(similarProductsCounter < 3) setSimilarProductsCounter(similarProductsCounter+1)
        }
        else if(window.innerWidth <= 1000 && window.innerWidth > 650) {
            setSimilarProductsWidth(25)
            if(similarProductsCounter < 4) setSimilarProductsCounter(similarProductsCounter+1)
        }
        else if(window.innerWidth <= 650 && window.innerWidth > 550) {
            setSimilarProductsWidth(33)
            if(similarProductsCounter < 5) setSimilarProductsCounter(similarProductsCounter+1)
        }
        else if(window.innerWidth <= 550) {
            setSimilarProductsWidth(50)
            if(similarProductsCounter < 6) setSimilarProductsCounter(similarProductsCounter+1)
        }
    }

    const prevSimilarProducts = () => {
        if(window.innerWidth > 1000) {
            setSimilarProductsWidth(20)
            if(similarProductsCounter > 0) setSimilarProductsCounter(similarProductsCounter-1)
        }
        else if(window.innerWidth <= 1000 && window.innerWidth > 650) {
            setSimilarProductsWidth(25)
            if(similarProductsCounter > 0) setSimilarProductsCounter(similarProductsCounter-1)
        }
        else if(window.innerWidth <= 650 && window.innerWidth > 550) {
            setSimilarProductsWidth(33)
            if(similarProductsCounter > 0) setSimilarProductsCounter(similarProductsCounter-1)
        }
        else if(window.innerWidth <= 550) {
            setSimilarProductsWidth(50)
            if(similarProductsCounter > 0) setSimilarProductsCounter(similarProductsCounter-1)
        }
    }

    const location = useLocation()
    
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [location])

    if(product.length === 0) return <Loading />

    return (
        <div className='single__product'>
            {
                isLogged && showMsg ? 
                <div id="message" className={`message ${isLogged && !productInCart && addToCart ? 'show' : ''}`}>
                    <h1>Product Added To Cart</h1>
                </div>
                :
                ''
            }
            
            <div className='page__header'>
                <motion.h1 layoutId='header'>Product Details</motion.h1>
                <motion.div layoutId='border' className="border"></motion.div>
            </div>

            <div className="back">
                <Link to='/products'>&#8592; Back</Link>
            </div>
            
            <div className="columns">
                <div className="clmn photos" onTouchStart={startTouching} onTouchEnd={endTouching}>
                    {
                        product.color && imgsCounter === 0 &&
                        <motion.div 
                            layoutId={`/main__circle/${product._id}`}
                            animate={{  borderRadius: '30%' }}
                            transition={{ duration: .7 }} 
                            className="single_product_background" 
                            style={{ backgroundColor: `${product.color}` }}
                        ></motion.div>
                    }
                    <div className="product__img__container">
                        <motion.img layoutId={product._id} transition={{ duration: 1 }} src={changeImg} alt="" />
                    </div>
                    
                    {
                        imgsCounter !== 0 &&
                        <div className="left_btn" onClick={leftImg}>
                            <img src={ImgsArrow} alt="svg arrow" />
                        </div>
                    }

                    {
                        imgsCounter !== product.images.length - 1 &&
                        <div className="right_btn" onClick={rightImg}>    
                            <img src={ImgsArrow} alt="svg arrow" />
                        </div>
                    }

                    <span className='images__number'>{imgsCounter+1 + '/' + product.images.length}</span>
                    
                    <div className="all__imgs__container">
                        {
                            product.images.map((img, i) => {
                                return <img className='small_images' style={{ opacity: `${img.secure_url === changeImg ? 1 : 0.3 }`}} key={i} src={img.secure_url} onClick={() => changeImgSmallImg(i, img.secure_url)} alt='' />
                            })
                        }
                    </div>
                </div>

                <div className="clmn info">
                    <div className="product__info">
                        <h1>{product.name}</h1>
                        <h2>${product.price.toFixed(2)}</h2>
                        <div className="border"></div>
                        <h2 style={{ marginTop: 20, marginBottom: 0, fontWeight: 500, color: '#333333' }}>Description</h2>
                        <div ref={DescWrapper} className='DescWrapper'></div>
                        {
                            productInCart ? <button className='btn disable'>Product In The Cart</button>
                            :
                            <button className='btn' onClick={() => addToCartShowMsg(product)}>Add To Cart</button>
                        }
                    </div>
                </div>
            </div>

            <div className='you_may_like' >
                <div className='you_may_like_header'>
                    <h1>You may also like</h1>
                    <div className="border"></div>
                </div>

                <div className="presented__products__container" onTouchStart={YMALSwiperStartTouching} onTouchEnd={YMALSwiperEndTouching}>
                    <div className="presented__products__absolute__container" style={{ left: `${-showedProductsCounter * showedProductsWidth}vw`}}>
                        {
                            allproducts.length !== 0 ?
                            allproducts.slice(randomProducts, randomProducts+8).map((p, i) => {
                                return <YouMayLike key={i} product={p} />
                            })

                            : <Loading />
                        }
                    </div>

                    {
                        showPrevBtn && 
                        <div className="p__btn__left" onClick={prevProducts}>
                            <img src={ImgsArrow} alt="svg arrow" />
                        </div>
                    }

                    {   showNextBtn &&   
                        <div className="p__btn__right" onClick={nextProducts}>
                            <img src={ImgsArrow} alt="svg arrow" />
                        </div>
                    }
                </div>
            </div>
            

            <div className='you_may_like'>
                <div className='you_may_like_header'>
                    <h1>See similar products</h1>
                    <div className="border"></div>
                </div>

                <div className="presented__products__container" onTouchStart={SPSwiperStartTouching} onTouchEnd={SPSwiperEndTouching}>
                    <div className="presented__products__absolute__container" style={{ left: `${-similarProductsCounter * similarProductsWidth}vw`}}>
                        {
                            allproducts.length !== 0 ?
                            allproducts.map((p, i) => {
                                return (p.brand === product.brand && p._id !== product._id) && <YouMayLike key={i} product={p} />
                            })
                            : <Loading />
                        }
                    </div>

                    {
                        similarProductsshowPrevBtn &&
                        <div className="p__btn__left" onClick={prevSimilarProducts}>
                            <img src={ImgsArrow} alt="svg arrow" />
                        </div>
                    }

                    {
                        showsimilarProductsNextBtn &&
                        <div className="p__btn__right" onClick={nextSimilarProducts}>
                            <img src={ImgsArrow} alt="svg arrow" />
                        </div>
                    }
                </div>
            </div>

            <Footer />

        </div>
    )
}

export default SingleProduct
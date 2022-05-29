import React, { useContext, useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import AddPhoto from '../../icons/AddPhoto.svg'
import axios from 'axios'
import GlobaleContext from '../../../GlobaleCotext'
import UploadIcon from '../UploadIcon/UploadIcon'
import Loading from '../Loading/Loading'

function AppProduct() {
    const state = useContext(GlobaleContext)
    const [token] = state.token
    const [callback, setCallback] = state.callback
    const [products, setProducts] = state.products.products

    const [file, setFile] = useState([])
    const [image, setImage] = useState({ public_id: '', secure_url: ''})
    const [name, setName] = useState('')
    const [prevPrice, setPrevPrice] = useState(0)
    const [price, setPrice] = useState('')
    const [description, setDescription] = useState('')
    const [quantity0, setQuantity0] = useState('')
    const [quantity1, setQuantity1] = useState('')
    const [quantity2, setQuantity2] = useState('')
    const [quantity3, setQuantity3] = useState('')
    const [quantity4, setQuantity4] = useState('')
    const [quantity5, setQuantity5] = useState('')
    const [quantity6, setQuantity6] = useState('')

    const [loading, setLoading] = useState(false)
    const [deleting, setDeleting] = useState(false)
    var [editedProduct, setEditedProduct] = useState([])

    const params = useParams()

    useEffect(() => {
        console.log(params)
        if(products) {
            const ep = products.find(p => {
                return p._id === params.id
            })
            setEditedProduct([ep])
        }
    }, [products, params])

    useEffect(() => {
        if(editedProduct.length !== 0) {
            editedProduct[0].images.length !== 0 ? setImage(editedProduct[0].images[0]) : setImage({ public_id: '', secure_url: ''})
            setName(editedProduct[0].name)
            setPrevPrice(editedProduct[0].prevPrice)
            setPrice(editedProduct[0].price)
            setDescription(editedProduct[0].description)
            setQuantity0(editedProduct[0].sizeAndQuantity[0].quantity)
            setQuantity1(editedProduct[0].sizeAndQuantity[1].quantity)
            setQuantity2(editedProduct[0].sizeAndQuantity[2].quantity)
            setQuantity3(editedProduct[0].sizeAndQuantity[3].quantity)
            setQuantity4(editedProduct[0].sizeAndQuantity[4].quantity)
            setQuantity5(editedProduct[0].sizeAndQuantity[5].quantity)
            setQuantity6(editedProduct[0].sizeAndQuantity[6].quantity)
        }
    }, [editedProduct])

    const handleAddProduct = async e => {
        e.preventDefault()

        if(Object.keys(image.public_id).length === 0 ) return alert('Please enter an image!')
        if(name.length === 0) return alert('Please enter a product name!')
        if(price.length === 0) return alert('Please enter a price!')
        if(description.length === 0) return alert('Please enter a description!')

        try {
            await axios.put(`/api/product/${editedProduct[0]._id}`, {
                name: name, 
                prevPrice: prevPrice, 
                price: price, 
                description: description, 
                sizeAndQuantity: [
                    {
                        size: 7,
                        quantity: quantity0
                    },
                    {
                        size: 7.5,
                        quantity: quantity1
                    },
                    {
                        size: 8,
                        quantity: quantity2
                    },
                    {
                        size: 8.5,
                        quantity: quantity3
                    },
                    {
                        size: 9,
                        quantity: quantity4
                    },
                    {
                        size: 9.5,
                        quantity: quantity5
                    },
                    {
                        size: 10,
                        quantity: quantity6
                    }
                ], 
                images: image
            }, {
                headers: {
                    'Authorization': token
                }
            })

            setFile('')
            setImage({ public_id: '', secure_url: ''})
            setName('')
            setPrevPrice('')
            setPrice('')
            setDescription('')
            setQuantity0('')
            setQuantity1('')
            setQuantity2('')
            setQuantity3('')
            setQuantity4('')
            setQuantity5('')
            setQuantity6('')
            
            setCallback(!callback)

            alert('Upload Successfuly!')
            window.location.href = '/products'
        } catch (err) {
            console.log(err.response.data.msg)
        }
    }

    const handleFile = (e) => {
        console.log(e.target.files)
        const file = e.target.files[0]
        try {
            setLoading(true)
            const uploadImage = async () => {
                if(file.length === 0)
                    return alert('No file uploaded!')
                
                if(file.type !== 'image/png' && file.type !== 'image/jpeg' && file.type !== 'image/webp')
                    return alert('File type no supported!')
                
                if(file.size > 2*1024*1024)
                    return alert('File size is too big!')
                
                const formData = new FormData()
                formData.append('file', file)

                const res = await axios.post('/api/upload', formData, {
                    headers: { 
                        'Authorization': token,
                        'content-type': 'multipart/form-data'
                    }
                })

                setLoading(false)
                setImage(res.data)
            }
            uploadImage()
        } catch (err) {
            setLoading(false)
            console.log(err)
        }
    }

    const removePhoto = async () => {
        if(window.confirm('Are you sure you want to delete this photo?')) {
            try {
                setDeleting(true)
                const res = await axios.post(`/api/destory`, { public_id: image.public_id }, {
                    headers: {
                        'Authorization': token
                    }
                })

                console.log(res)
                
                products.forEach(p => {
                    if(p._id === params.id) {
                        p.images = []
                    }
                })
                
                await axios.put(`/api/product/${editedProduct[0]._id}`, {
                    name: name,
                    prevPrice: prevPrice,
                    price: price,
                    description: description,
                    sizeAndQuantity: [
                        {
                            size: 7,
                            quantity: quantity0
                        },
                        {
                            size: 7.5,
                            quantity: quantity1
                        },
                        {
                            size: 8,
                            quantity: quantity2
                        },
                        {
                            size: 8.5,
                            quantity: quantity3
                        },
                        {
                            size: 9,
                            quantity: quantity4
                        },
                        {
                            size: 9.5,
                            quantity: quantity5
                        },
                        {
                            size: 10,
                            quantity: quantity6
                        }
                    ], 
                    images: [
                        {
                            public_id: '',
                            secure_url: ''
                        }
                    ]
                }, {
                    headers: {
                        'Authorization': token
                    }
                })

                setCallback(!callback)
                setDeleting(false)
                setImage({ public_id: '', secure_url: ''})
                setEditedProduct([...editedProduct, editedProduct[0].images = []])
            } catch (err) {
                setDeleting(false)
                console.log(err.message)
            }
        }
    }

    if(editedProduct.length === 0) return null

    return (
      <div className="add__product__page">  
        <div className='page__header'>
            <h1>Add Product</h1>
            <div className="border"></div>
        </div>
        
        <div className="backAdmin">
            <Link to='/products'>&#8592; Back</Link>
        </div>
        
        <div className='add__product'>
            <div className="add__photo__container">
            {
                Object.keys(image).length === 0 || image === null || image === undefined || image.secure_url.length === 0 && !loading ?
                <>
                    <input type="file" name='addimage' id='addimage' onChange={(e) => handleFile(e)} />
                    <label htmlFor="addimage" className='add__photo__Container'>
                    </label>
                    <img src={AddPhoto} alt="add photo svg" />
                </>
                :
                loading ?
                <UploadIcon />
                :
                deleting ?
                <Loading />
                :
                <>
                    <div className="upload__image__container">
                        <div id='add__photo'>
                            <img className='add__photo__img' src={image.secure_url.length > 0 && image.secure_url} alt="add photo svg" />
                            <span className="removeImage" onClick={removePhoto}>&#10006;</span>
                        </div>
                    </div>
                </>
            }
            </div>

            <div className="add__info">
                <h3>Product Information</h3>

                <form className='form' onSubmit={handleAddProduct} >
                    <div className='input__container'>
                        <input type='text' className='input' placeholder=' ' name='product_name' id='product_name' onChange={e => setName(e.target.value)} value={name} />
                        <label htmlFor='product_name' className='label'>Product name</label>  
                    </div>

                    <div className='input__container'>
                        <input type='number' className='input' placeholder=' ' name='prev_price' id='prev_price' onChange={e => setPrevPrice(parseInt(e.target.value))} value={prevPrice} />
                        <label htmlFor='prev_price' className='label'>Previous price</label>  
                    </div>

                    <div className='input__container'>
                        <input type='number' className='input' placeholder=' ' name='price' id='price' onChange={e => setPrice(parseInt(e.target.value))} value={price} />
                        <label htmlFor='price' className='label'>Price</label>  
                    </div>

                    <div className='input__container textarea'>
                        <textarea className='input textarea' placeholder=' ' name='description' onChange={e => setDescription(e.target.value)} value={description} />
                        <label htmlFor='description' className='label'>Description</label>  
                    </div>

                    <div className="sizeAndQuantity">
                        <span>Size</span>
                        <div className="boxes">
                            <div className="box">7</div>
                            <div className="box">7.5</div>
                            <div className="box">8</div>
                            <div className="box">8.5</div>
                            <div className="box">9</div>
                            <div className="box">9.5</div>
                            <div className="box">10</div>
                        </div>
                    </div>
                    
                    <div className="sizeAndQuantity">
                        <span>Quantity</span>
                        <div className="boxes">
                            <input type='number' className="box" onChange={e => setQuantity0(parseInt(e.target.value))} value={quantity0} />
                            <input type='number' className="box" onChange={e => setQuantity1(parseInt(e.target.value))} value={quantity1} />
                            <input type='number' className="box" onChange={e => setQuantity2(parseInt(e.target.value))} value={quantity2} />
                            <input type='number' className="box" onChange={e => setQuantity3(parseInt(e.target.value))} value={quantity3} />
                            <input type='number' className="box" onChange={e => setQuantity4(parseInt(e.target.value))} value={quantity4} />
                            <input type='number' className="box" onChange={e => setQuantity5(parseInt(e.target.value))} value={quantity5} />
                            <input type='number' className="box" onChange={e => setQuantity6(parseInt(e.target.value))} value={quantity6} />
                        </div>
                    </div>
                    
                    <button type='submit' className='form__button black'>Upload</button>
                </form>
            </div>
        </div>
      </div>
    )
}

export default AppProduct
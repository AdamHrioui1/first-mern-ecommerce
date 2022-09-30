import React, { useContext, useState, useEffect, useRef } from 'react'
import { Link, useParams } from 'react-router-dom'
import AddPhoto from '../../icons/AddPhoto.svg'
import axios from 'axios'
import GlobaleContext from '../../../GlobaleCotext'
import UploadIcon from '../UploadIcon/UploadIcon'
import Loading from '../Loading/Loading'
import { useQuill } from 'react-quilljs';
import 'quill/dist/quill.snow.css';

function AppProduct() {
    const state = useContext(GlobaleContext)
    const [token] = state.token
    const [callback, setCallback] = state.callback
    const [products] = state.products

    const { quill, quillRef } = useQuill();

    const [files, setFiles] = useState([])
    const [image, setImage] = useState([])
    const [name, setName] = useState('')
    const [prevPrice, setPrevPrice] = useState(0)
    const [price, setPrice] = useState('')
    const [brand, setBrand] = useState('')
    const [color, setColor] = useState('')
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
        if(products) {
            const ep = products.find(p => {
                return p._id === params.id
            })
            setEditedProduct([ep])
        }
    }, [products, params])

    useEffect(() => {
        if(editedProduct.length !== 0) {
            console.log(editedProduct)
            editedProduct[0].images.length !== 0 ? setImage(editedProduct[0].images) : setImage({ public_id: '', secure_url: ''})
            setName(editedProduct[0].name)
            setBrand(editedProduct[0].brand)
            setPrevPrice(editedProduct[0].prevPrice)
            setPrice(editedProduct[0].price)
            setColor(editedProduct[0].color)
            setDescription(editedProduct[0].description)
            setQuantity0(editedProduct[0].sizeAndQuantity[0].quantity)
            setQuantity1(editedProduct[0].sizeAndQuantity[1].quantity)
            setQuantity2(editedProduct[0].sizeAndQuantity[2].quantity)
            setQuantity3(editedProduct[0].sizeAndQuantity[3].quantity)
            setQuantity4(editedProduct[0].sizeAndQuantity[4].quantity)
            setQuantity5(editedProduct[0].sizeAndQuantity[5].quantity)
            setQuantity6(editedProduct[0].sizeAndQuantity[6].quantity)

            quillRef.current.firstChild.innerHTML = editedProduct[0].description
        }
    }, [editedProduct, products, params])

    useEffect(() => {
        if (quill) {
            quill.on('text-change', () => {
                setDescription(quillRef.current.firstChild.innerHTML)
            })
        }
    }, [quill])

    const handleAddProduct = async e => {
        e.preventDefault()

        if(image.length === 0 ) return alert('Please enter an image!')
        if(name.length === 0) return alert('Please enter a product name!')
        if(brand.length === 0) return alert('Please enter a product brand!')
        if(price.length === 0) return alert('Please enter a price!')
        if(description.length === 0) return alert('Please enter a description!')

        try {
            setLoading(true)
            const res = await axios.put(`/api/product/${editedProduct[0]._id}`, {
                name: name,
                brand: brand,
                prevPrice: prevPrice, 
                price: price, 
                description: description, 
                color: color, 
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

            res && setLoading(false)

            setFiles([])
            setImage([])
            setName('')
            setBrand('')
            setPrevPrice('')
            setPrice('')
            setColor('')
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
            setLoading(false)
            console.log(err.response.data.msg)
            alert(err.response.data.msg)
        }
    }
    
    const handleFile = async () => {
        try {
            setLoading(true)
            var filesSize = 0
            var matchedFiles = []
            var imagesUrl = []

            console.log(files)

            if(!files || files.length === 0 || Object.keys(files).length === 0 || files === null) {
                setLoading(false)
                return alert("No file uploaded!")
            }

            files.forEach(f => {
                filesSize += f.size
            });

            if(filesSize > 10 * 1024 * 1024) {
                setLoading(false)
                return alert("Files size is too big")
            }

            files.forEach(f => {
                if(f.type === 'image/png' || f.type === 'image/jpeg' || f.type === 'image/webp' || f.type === 'image/svg+xml') {
                    matchedFiles.push(f)
                }
            })

            for(let f of matchedFiles) {
                var formData = new FormData()
                formData.append('files', f)
                
                const res = await axios.post('/api/upload', formData, {
                headers: { 
                    'Authorization': token,
                    'content-type': 'multipart/form-data'
                }
                })
                imagesUrl.push(res.data)
            }
            setImage(imagesUrl)
            setLoading(false)

        } catch (err) {
            setLoading(false)
            console.log(err)
        }
    }
    
    useEffect(() => {
        files.length > 0 && handleFile()
    }, [files])

    const removeimage = async (id) => {
        var newimages = []
        try {
            await axios.post('/api/destroy', { public_id: id }, {
                headers: {
                    'Authorization': token
                }
            })

            image.forEach(i => {
                if(i.public_id !== id) {
                    newimages.push(i)
                }
            })
    
            setImage([...newimages])
            alert('Image removed successfuly!')
        } catch (err) {
            console.log(err)
        }
    }
    
    if(editedProduct.length === 0 || editedProduct[0] === 'undefined') return <Loading />

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
                 image.length === 0 && !loading ?
                <>
                    <input type="file" name='addimage' id='addimage' onChange={(e) => setFiles([...e.target.files])} multiple />
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
                    {
                        
                        image.length > 0 && image.map((i, index) => {
                            return (
                                <div className='small_img' key={i.public_id}>
                                    <img src={i.secure_url} alt="" width={70} />
                                    <p onClick={() => removeimage(i.public_id)} style={{ fontSize: 20 }} >&times;</p>
                                </div>
                            )
                        })
                        
                    }
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
                        <input type='text' className='input' placeholder=' ' name='product_Brand' id='product_Brand' onChange={e => setBrand(e.target.value)} value={brand} />
                        <label htmlFor='product_Brand' className='label'>Product brand</label>  
                    </div>

                    <div className='input__container color'>
                        <input type='color' className='input color' placeholder=' ' name='product_color' id='product_color' onChange={e => setColor(e.target.value)} value={color} />
                        <label htmlFor='product_color' className='label color'>Product color</label>  
                    </div>

                    <div className='input__container'>
                        <input type='number' className='input' placeholder=' ' name='prev_price' id='prev_price' onChange={e => setPrevPrice(parseInt(e.target.value))} value={prevPrice} />
                        <label htmlFor='prev_price' className='label'>Previous price</label>  
                    </div>

                    <div className='input__container'>
                        <input type='number' className='input' placeholder=' ' name='price' id='price' onChange={e => setPrice(parseInt(e.target.value))} value={price} />
                        <label htmlFor='price' className='label'>Price</label>  
                    </div>
                    
                    <div style={{ width: '100%', height: 200, marginBottom: window.innerWidth > 500 ? 80 : 130 }}>
                        <div ref={quillRef} />
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
                    
                    <button type='submit' className='form__button black'>{loading ? 'Updating...' : 'Update'}</button>
                </form>
            </div>
        </div>
      </div>
    )
}

export default AppProduct
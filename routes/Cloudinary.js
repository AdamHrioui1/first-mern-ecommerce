const router = require('express').Router()
const cloudinary = require('cloudinary');
const fs = require('fs');
const auth = require('../middleware/auth');
const adminAuth = require('../middleware/adminAuth');

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET 
})

router.post('/upload', auth, adminAuth, (req, res) => {
    try {
        if(!req.files) return res.status(400).json({ msg: 'No file uploaded!'})
        
        const file = req.files.file
        if(file.mimetype !== 'image/png' && file.mimetype !== 'image/jpeg' && file.mimetype !== 'image/webp') {
            removeTmp(file.tempFilePath)
            return res.status(400).json({ msg: 'File type note supported!'})
        }

        if(file.size > 1024*1024*2) {
            removeTmp(file.tempFilePath)
            return res.status(400).json({ msg: 'File size is too large!'})
        }

        cloudinary.v2.uploader.upload(file.tempFilePath, { folder: 'ecommerce_Shoes'}, (err, result) => {
            removeTmp(file.tempFilePath)
            if(err) throw err

            return res.status(200).json({
                public_id: result.public_id,
                secure_url: result.secure_url
            })
        })
        
    } catch (err) {
        res.status(500).json({ msg: err.message })
    }
})

router.post('/destory', auth, adminAuth, (req, res) => {
    try {
        const { public_id } = req.body
        if(!public_id) return res.status(400).json({ msg: 'no file selected!'})

        cloudinary.v2.uploader.destroy(public_id, (err, result) => {
            if(err) throw err

            return res.status(200).json({ msg: 'File deleted successfuly!'})
        })
    } catch (err) {
        res.status(500).json({ msg: err.message })
    }
})

const removeTmp = (path) => {
    fs.unlink(path, err => {
        if(err) throw err
    })
}

module.exports = router
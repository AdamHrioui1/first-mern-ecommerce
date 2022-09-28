require('dotenv').config()
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const fileupload = require('express-fileupload');
const connection = require('./database/connection');
const path = require('path')

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cors())
app.use(cookieParser())
app.use(fileupload({
    useTempFiles: true
}))

app.use('/user', require('./routes/UserRoutes'))
app.use('/api', require('./routes/ProductRoutes'))
app.use('/api', require('./routes/Cloudinary'))
app.use('/api', require('./routes/PaymentRoutes'))
app.use('/api', require('./routes/MailRoutes'))

connection()

if(process.env.NODE_ENV === 'production') {
    app.use(express.static('app20/build'))
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'app20', 'build', 'index.html'))
    })
}

app.listen(process.env.PORT, () => console.log(`Server is listening on port: http://localhost:${process.env.PORT}`))
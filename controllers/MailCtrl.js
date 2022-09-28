const wrapedSendMail = require("../Mail")

const MailCtrl = {
    postMail:  async (req, res) => {
        const { name, email, message } = req.body

        let date = new Date()
        let day = date.getDate() > 10 ? date.getDate() : '0'+date.getDate()
        let month = date.getMonth() > 10 ? date.getMonth() : '0'+date.getMonth()
        let year = date.getFullYear()
        let h = date.getHours() < 10 ? '0'+date.getHours() : date.getHours()
        let m = date.getMinutes() < 10 ? '0'+date.getMinutes() : date.getMinutes()
        let s = date.getSeconds() < 10 ? '0'+date.getSeconds(): date.getSeconds()

        let mailOption = {
            from: 'oneoneoneuser@gmail.com',
            to: 'oneoneoneuser@gmail.com',
            subject: 'BowWoow Shop - Message',
            text: `This message from: ${name}\nEmail: ${email}\nMessage:\n${message} \n\n\nThis message sent at: ${day + '-' + month + '-' + year + ' in ' + h + ':' + m + ':' + s }`
        }
        
        let emailMessage = await wrapedSendMail(mailOption)
    
        if (emailMessage) {
            console.log('Message sent successfuly!')
        }
        else {
            console.log('message doesn\'t sent!')
        }
    
        return res.json(emailMessage)
    }
}

module.exports = MailCtrl
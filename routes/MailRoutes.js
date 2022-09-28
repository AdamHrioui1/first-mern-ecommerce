const MailCtrl = require("../controllers/MailCtrl");
const router = require("express").Router();

router.route('/contact')
    .post(MailCtrl.postMail)

module.exports = router
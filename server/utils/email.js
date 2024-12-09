const nodemailer = require('nodemailer')
const sendEmail =async ({email, subject, text, html}) => {

    // CREATE A TRANSPORTER
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_ADMIN,
            pass: process.env.PASSWORD_EMAIL_ADMIN
        }
    })

    // DEFINE EMAIL OPTION
    const emailOptions = {
        from: 'Admin',
        to: email,
        subject: subject,
    }
    if (text) {
        emailOptions.text = text
    }
    if (html) {
        emailOptions.html = html
    }

    await transporter.sendMail(emailOptions)
}

module.exports =  sendEmail
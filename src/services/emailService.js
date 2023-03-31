const nodemailer = require('nodemailer')


const sendEmail = async (reciever) => {
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_ACCOUNT,
            pass: process.env.EMAIL_PASSWORD
        }
    })

    let msg = await transporter.sendMail({
        from: process.env.EMAIL_ACCOUNT,
        to: reciever.email,
        subject: 'EmailAPI',
        html: "<h3> Hello, its a success!</h3> \n Congrats Man " + reciever.body
    })
    return msg  
}

module.exports = {
    sendEmail
}
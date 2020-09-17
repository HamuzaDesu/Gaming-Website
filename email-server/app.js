const express = require('express')
const app = express()
const port = 3000

const nodemailer = require('nodemailer');

app.use(express.urlencoded({
    extended: true
}))


app.get('/', (req,res) => {
    res.send('Email server up!')
})

var details = {}

app.post('/mail', (req, res) => {
    details.firstName = req.body.firstName
    details.lastName = req.body.lastName
    details.email = req.body.email
    details.message = req.body.message

    sendEmail()
})

app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
})


function sendEmail (){
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'nom.nom967478@gmail.com',
            pass: 'me0wme0w'
        }
    })
    var mailOptions = {
        from: 'nom.nom967478@gmail.com',
        to: `${details.email}`,
        subject: 'This is test',
        text: `This is your message:\n\n\n${details.message}`
    }
    
    transporter.sendMail(mailOptions, function(error, info) {
        if(error){
            console.log(error)
        }
        else{
            console.log(`Email Sent: ${info.response}`)
        }
    })
}



// card onclick fires function that sends showed games array to the web server 
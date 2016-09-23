var config = require('./config')
var nodemailer = require('nodemailer')

const transportString = 'smtp://' + config.mail.host + ':' + config.mail.port
var transporter = nodemailer.createTransport(transportString)

exports.sendMail = function (reference, recipient) {
  var mailOptions = {
    from: config.mail.from,
    to: recipient,
    subject: 'APVS Application Confirmation',
    text: 'Thanks you for your application.\n\nYour reference number is: ' + reference
  }

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error)
    } else {
      console.log('Message sent: ' + info.response)
    }
  })
}

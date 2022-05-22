const { location } = require('express/lib/response');
var nodemailer = require('nodemailer');
require('dotenv').config()

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'vibingowtham.cs18@bitsathy.ac.in',
    pass: process.env.PASSWORD
  }
});




const sendMail = (bookingDetails) => {

  let confirmationHTML =
    `<body style="text-align:center">
    <h2  style="text-transform:capitalize">Congratulations <strong>${bookingDetails.name}</strong>,Your Booking id <strong>${bookingDetails.bookingId}</strong> has been Confirmed for <em> ${bookingDetails.bus}</em> <h2>
    <h4>Your confirmed seat(s) are <em>${bookingDetails.seats}</em><h4>
    <h4>Please arrive atleast 30 mins before <em>${bookingDetails.depatureTime}</em> for a hassle free experience</em></h4>
    <h3><em>"Have a safe Journey"</em></h3>
    </body>`

  var mailOptions = {
    from: 'vibingowtham.cs18@bitsathy.ac.in',
    to: 'vibingowtham.cs18@bitsathy.ac.in',
    subject: 'Booking Confirmation',
    html: confirmationHTML
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
}


module.exports = { sendMail }

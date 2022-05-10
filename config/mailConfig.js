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

const sendMail=(bookingDetails)=>{

    let confirmationHTML=
    `<body style="text-align:center">
    <h2>Hi <em>${bookingDetails.Name}</em>,Your Booking id <em>${bookingDetails.BookingId}</em> has been Confirmed for <em> ${bookingDetails.Bus}</em> <h2>
    <h4>Your confirmed seat(s) are <em>${bookingDetails.Seats}</em><h4>
    <h4>Please arrive atleast 30 mins before <em>${bookingDetails.depatureTime}</em> for a hassle free experience</em></h4>
    <h3><em>"Have a safe Journey"</em></h3>
    </body>`

    var mailOptions = {
        from: 'vibingowtham.cs18@bitsathy.ac.in',
        to: 'vibingowtham.cs18@bitsathy.ac.in',
        subject: 'Booking Confirmation',
        html:confirmationHTML
      }; 

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
}


module.exports={sendMail}

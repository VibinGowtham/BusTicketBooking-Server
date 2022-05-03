var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'vibingowtham.cs18@bitsathy.ac.in',
    pass: 'vibin123vlv'
  }
});

var mailOptions = {
  from: 'vibingowtham.cs18@bitsathy.ac.in',
  to: 'vibingowtham.cs18@bitsathy.ac.in',
  subject: 'Sending Email using Node.js',
  text: 'That was easy!'
};

module.exports={transporter,mailOptions}

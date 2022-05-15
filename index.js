const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')

const cityRoutes = require('./routes/cityRoutes')
const busRoutes = require('./routes/busRoutes')
const seatRoutes = require('./routes/seatRoutes')
const bookingRoutes = require('./routes/bookingRoutes')
const adminRoutes = require('./routes/adminRoutes')
const passport = require('passport')
const { login, register } = require('./services/userServices')

const jwt = require('jsonwebtoken')

require('dotenv').config()
require('./config/passportConfig')

app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use(passport.initialize())

app.post('/register',register)

app.post('/login',login)

let authenticationMiddleware = passport.authenticate('jwt', { session: false })

app.use('/city',authenticationMiddleware, cityRoutes)
app.use('/bus',authenticationMiddleware, busRoutes)
app.use('/seat',authenticationMiddleware, seatRoutes)
app.use('/booking', authenticationMiddleware,bookingRoutes)
app.use('/admin',authenticationMiddleware, adminRoutes)



app.get('/protected', authenticationMiddleware, (req, res) => {
  res.send("Admin")
})

app.post('/renewToken', (req, res) => {
  const { refreshToken } = req.body
  if(refreshToken){
      jwt.verify(refreshToken,process.env.REFRESH_KEY,(err,payload)=>{
        if(err) return res.sendStatus(403)
        console.log("renew");
        console.log(payload);
        // res.send("Ok")
        let accessToken=jwt.sign({id:payload.id,isAdmin:payload.isAdmin},process.env.SECRET_KEY,{expiresIn:"1m"})
        res.send({
          accessToken
        })
      })
  }
  else{
    res.send({
      status:403
    })
  }
})


app.listen(process.env.PORT, () => {
  console.log(`App is running on ${process.env.PORT}`);
})
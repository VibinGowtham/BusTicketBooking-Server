const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')

const cityRoutes = require('./routes/cityRoutes')
const busRoutes = require('./routes/busRoutes')
const seatRoutes = require('./routes/seatRoutes')
const bookingRoutes = require('./routes/bookingRoutes')
const adminRoutes = require('./routes/adminRoutes')
const payment=require('./config/razorpayConfig')
const passport = require('passport')
const { login, register,getUserName } = require('./services/userServices')


const jwt = require('jsonwebtoken')

require('dotenv').config()
require('./config/passportConfig')
require('./config/razorpayConfig')

app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use(passport.initialize())

app.post('/register',register)

app.post('/login',login)

app.post('/getUserName',getUserName)

let authenticationMiddleware = passport.authenticate('jwt', { session: false })

app.use('/payment',authenticationMiddleware,payment)
app.use('/city',authenticationMiddleware, cityRoutes)
app.use('/bus',authenticationMiddleware, busRoutes)
app.use('/seat',authenticationMiddleware, seatRoutes)
app.use('/booking',authenticationMiddleware,bookingRoutes)
app.use('/admin', authenticationMiddleware,checkAdmin,adminRoutes)


app.get('/home',(req,res)=>{
  res.send("Home")
})

app.get('/protected', authenticationMiddleware, checkAdmin,(req, res) => {
  res.send("Admin")
})

app.post('/renewToken', (req, res) => {
  const { refreshToken } = req.body
  if(refreshToken){
    try{
      jwt.verify(refreshToken,process.env.REFRESH_KEY,(err,payload)=>{
        if(err) return res.sendStatus(403)
        let accessToken=jwt.sign({id:payload.id,isAdmin:payload.isAdmin},process.env.SECRET_KEY,{expiresIn:"15s"})
        res.send({
          accessToken
        })
      })
    }catch(err){
      res.sendStatus(401)
    }
      
  }
  else{
    res.sendStatus(401)
  }
})


app.listen(process.env.PORT, () => {
  console.log(`App is running on ${process.env.PORT}`);
})
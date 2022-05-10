const express=require('express')
const app=express()
const bodyParser=require('body-parser')
const cors=require('cors')
const userRoutes=require('./routes/userRoutes')
const cityRoutes=require('./routes/cityRoutes')
const busRoutes=require('./routes/busRoutes')
const seatRoutes=require('./routes/seatRoutes')
const bookingRoutes=require('./routes/bookingRoutes')
const passport  = require('passport')
const { login, register } = require('./services/userServices')
const JwtStrategy = require('passport-jwt/lib/strategy')
const jwt = require('jsonwebtoken')

require('dotenv').config()
require('./config/passportConfig')

app.use(cors())
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())

app.use(passport.initialize())

app.post('/register',register)

app.post('/login',login)

let authenticationMiddleware=passport.authenticate('jwt',{session:false})

app.use('/user',userRoutes)
app.use('/city',cityRoutes)
app.use('/bus',busRoutes)
app.use('/seat',seatRoutes)
app.use('/booking',bookingRoutes)


app.get('/protected',authenticationMiddleware,(req,res)=>{
  if(err) console.log("errorrr");
    res.send(obj)
})

app.post('/verify',(req,res)=>{
    // console.log(req.body.token);
   jwt.verify(req.body.token,process.env.SECRET_KEY,(err,data)=>{
       console.log("111");
       console.log(data);
       if(err) res.send(false)
       else res.send(true)
   })
  })

app.listen(process.env.PORT,()=>{
    console.log(`App is running on ${process.env.PORT}`);
})
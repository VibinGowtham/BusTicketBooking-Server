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
app.use('/city',authenticationMiddleware,cityRoutes)
app.use('/bus',authenticationMiddleware,busRoutes)
app.use('/seat',authenticationMiddleware,seatRoutes)
app.use('/booking',authenticationMiddleware,bookingRoutes)


app.get('/protected',authenticationMiddleware,(req,res)=>{
    console.log(req);
    console.log(res);
    res.send(req.user)
})

app.listen(process.env.PORT,()=>{
    console.log(`App is running on ${process.env.PORT}`);
})

const express=require('express')
const app=express()
const port=3000
const bodyParser=require('body-parser')
const cors=require('cors')
const userRoutes=require('./routes/userRoutes')
const cityRoutes=require('./routes/cityRoutes')
const busRoutes=require('./routes/busRoutes')
const seatRoutes=require('./routes/seatRoutes')
const bookingRoutes=require('./routes/bookingRoutes')
app.use(cors())
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())
app.use('/user', userRoutes)
app.use('/city', cityRoutes)
app.use('/bus',busRoutes)
app.use('/seat',seatRoutes)
app.use('/booking',bookingRoutes)

app.listen(port,()=>{
    console.log(`App is running on ${port}`);
})
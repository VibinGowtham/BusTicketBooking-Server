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

app.post('/register', register)

app.post('/login', login)

let authenticationMiddleware = passport.authenticate('jwt', { session: false })

app.use('/city', cityRoutes)
app.use('/bus', busRoutes)
app.use('/seat', seatRoutes)
app.use('/booking', bookingRoutes)
app.use('/admin',adminRoutes)


app.get('/protected', authenticationMiddleware, checkAdmin, (req, res) => {
  res.send("Admin")
})


app.listen(process.env.PORT, () => {
  console.log(`App is running on ${process.env.PORT}`);
})
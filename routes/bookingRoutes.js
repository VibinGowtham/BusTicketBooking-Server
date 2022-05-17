const express = require("express")

const { addBooking, getDetailedBookings, getBookings ,getAllDetailedBookings} = require("../services/bookingServices")

const router =express.Router()

router.post('/addBooking',addBooking)

router.post('/getDetailedBookings',getDetailedBookings)

router.get('/getAllDetailedBookings', getAllDetailedBookings)

router.post('/getBookings',getBookings)


module.exports=router
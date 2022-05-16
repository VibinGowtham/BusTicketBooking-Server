const express = require("express")

const { addBooking, getDetailedBookings, getBookings ,deleteBooking} = require("../services/bookingServices")

const router =express.Router()

router.post('/addBooking',addBooking)

router.post('/getDetailedBookings',getDetailedBookings)

router.post('/getBookings',getBookings)


module.exports=router
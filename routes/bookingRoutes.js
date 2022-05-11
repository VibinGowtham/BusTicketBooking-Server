const express = require("express")

const { addBooking, getDetailedBookings, getBookings } = require("../services/bookingServices")

const router =express.Router()

router.post('/addBooking',addBooking)

router.post('/getDetailedBookings',getDetailedBookings)

router.post('/getBookings',getBookings)


module.exports=router
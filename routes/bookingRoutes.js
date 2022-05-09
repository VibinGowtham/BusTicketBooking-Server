const express = require("express")

const { getAllBookings, addBooking, getDetailedBookings, deleteAllBookings, getAllDetailedBookings, getBookings } = require("../services/bookingServices")

const router =express.Router()

router.get('/getAllBookings',getAllBookings)

router.post('/addBooking',addBooking)

router.post('/getDetailedBookings',getDetailedBookings)

router.post('/getBookings',getBookings)

router.get('/getAllDetailedBookings',getAllDetailedBookings)

router.get('/deleteAllBookings',deleteAllBookings)


module.exports=router
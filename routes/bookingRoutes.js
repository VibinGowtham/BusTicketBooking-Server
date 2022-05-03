const express = require("express")
const { deleteModel } = require("../databaseConfig/config")

const { getAllBookings, addBooking, getDetailedBookings, deleteAllBookings } = require("../services/bookingServices")

const router =express.Router()

router.get('/getAllBookings',getAllBookings)

router.post('/addBooking',addBooking)

router.get('/getDetailedBookings',getDetailedBookings)

router.get('/deleteAllBookings',deleteAllBookings)

module.exports=router
const { getAllBookings, deleteAllBookings, getAllDetailedBookings } = require("../services/bookingServices")

const { getAllBuses, addBus, addBuses, updateBus, getBus, deleteAllBuses, deleteBus } = require("../services/busServices");

const { addCity, addCities } = require('../services/cityServices')

const { getAllUsers, deleteAllUsers, getUser, deleteUser, updateUser } = require('../services/userServices')

const express = require("express");

const router = express.Router()

router.get('/getAllBookings', getAllBookings)

router.get('/deleteAllBookings', deleteAllBookings)

router.get('/getAllDetailedBookings', getAllDetailedBookings)

router.get('/getAllBuses', getAllBuses)

router.post('/addBus', addBus)

router.post('/addBuses', addBuses)

router.post('/updateBus', updateBus)

router.post('/getBus', getBus)

router.post('/addCity', addCity)

router.post('/addCities', addCities)

router.get('/getAllUsers', getAllUsers)

router.post('/getUser', getUser)

router.post('/updateUser', updateUser)

router.post('/deleteUser', deleteUser)

router.get('/deleteAll', deleteAllUsers)

router.get('/deleteAllBuses', deleteAllBuses)

router.post('/deleteBus', deleteBus)

module.exports = router
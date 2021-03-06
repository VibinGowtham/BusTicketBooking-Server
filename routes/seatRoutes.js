const express = require("express");
const { getAllSeats ,deleteAllSeats,generateSeats,deleteSeats, updateAvailability, getSeats,releaseSeats} = require("../services/seatServices");
const router=express.Router()

router.get('/getAllSeats',getAllSeats)

router.get('/deleteAllSeats',deleteAllSeats)

router.post('/deleteSeats',deleteSeats)

router.post('/generateSeats',generateSeats)

router.post('/updateAvailability',updateAvailability)

router.post('/getSeats',getSeats)

router.post('/releaseSeats',releaseSeats)

module.exports=router
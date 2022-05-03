const express = require("express");
const { getAllSeats ,deleteAllSeats,generateSeats,deleteSeats, updateAvailability} = require("../services/seatServices");
const router=express.Router()

router.get('/getAllSeats',getAllSeats)

router.get('/deleteAllSeats',deleteAllSeats)

router.post('/deleteSeats',deleteSeats)

router.post('/generateSeats',generateSeats)

router.post('/updateAvailability',updateAvailability)

module.exports=router
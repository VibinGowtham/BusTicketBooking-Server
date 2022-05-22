const express = require("express");

const { getAllBuses, addBus, addBuses, updateBus, deleteAllBuses, deleteBus, filterBus, getBus, getAllLocations } = require("../services/busServices");

const router = express.Router()


router.post('/getBus', getBus)

router.get('/getAllLocations', getAllLocations)

router.post('/filterBus', filterBus)


module.exports = router



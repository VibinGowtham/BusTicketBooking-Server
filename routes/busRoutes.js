const express = require("express");

const { getAllBuses, addBus, addBuses, updateBus, deleteAllBuses, deleteBus, filterBus, getBus } = require("../services/busServices");

const router = express.Router()


router.post('/getBus', getBus)


router.post('/filterBus', filterBus)


module.exports = router



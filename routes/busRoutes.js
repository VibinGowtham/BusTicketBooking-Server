const express = require("express");
const { getAllBuses, addBus,addBuses, updateBus, deleteAllBuses, deleteBus, filterBus, getBus } = require("../services/busServices");

const router=express.Router()

router.get('/getAllBuses',getAllBuses)

router.post('/addBus',addBus)

router.post('/addBuses',addBuses)

router.post('/updateBus',updateBus)

router.get('/getBus',getBus)

router.get('/filterBus',filterBus)

router.get('/deleteAllBuses',deleteAllBuses)

router.post('/deleteBus',deleteBus)


module.exports=router



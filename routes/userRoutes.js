const express = require("express")
const { updateOne } = require("../models/userModel")

const router =express.Router()

const {getAllUsers,deleteAllUsers,getUser,deleteUser, update}=require('../services/userServices')


router.get('/getAll',getAllUsers)

router.post('/get',getUser)

router.post('/update',update)

router.post('/delete',deleteUser)

router.get('/deleteAll',deleteAllUsers)


module.exports=router;

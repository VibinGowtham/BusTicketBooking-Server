const express = require("express")

const router =express.Router()

const {register,login,getAllUsers,deleteAllUsers,getUser,deleteUser}=require('../services/userServices')

router.post('/register',register)

router.post('/login',login)

router.get('/getAllUsers',getAllUsers)

router.get('/getUser',getUser)

router.get('/deleteUser',deleteUser)

router.get('/deleteAllUsers',deleteAllUsers)

module.exports=router;

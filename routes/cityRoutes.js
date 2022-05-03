const express = require("express")

const router =express.Router()

const {getAllCities, addCity,addCities,getCityExceptOne}=require('../services/cityServices')

router.get('/getAllCities',getAllCities)

router.post('/addCity',addCity)

router.post('/addCities',addCities)

router.get('/getCityExceptOne',getCityExceptOne)

module.exports=router
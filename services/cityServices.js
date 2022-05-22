const City = require("../models/cityModel")
const User = require("../models/userModel")

const getAllCities = async (req, res) => {
    let cities = await City.find()
    let totalCities = cities.length
    res.send({
        totalCities,
        cities
    })
}

const addCity = async (value) => {
    let alreadyExists = await City.find({ city: value })
    if (alreadyExists.length === 0) {
        let city = new City({
            city: value
        })
        city.save()
        return true
    }
    else return false
}

const count = (cities) => {
    let count = 0;
    cities.forEach(async (value) => {
        let exist = await addCity(value)
        if (exist) { count++; console.log(count); }
    })

    return count
}

const addCities = async (req, res) => {
    let cities = req.body.cities;
    let total = count(cities);
    res.send("Added Cities")
}

const getCityExceptOne = async (req, res) => {
    const results = await City.where("city").ne(req.body.city)
    res.send(results)
}
module.exports = { getAllCities, addCity, addCities, getCityExceptOne }

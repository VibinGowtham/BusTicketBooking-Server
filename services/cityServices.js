const City = require("../models/cityModel")
const User = require("../models/userModel")

const getAllCities=async(req,res)=>{
    let results=await City.find()
  let totalCities=results.length
    res.send({
        totalCities,
        results
    })
}

const addCity=async(value)=>{
    let alreadyExists=await City.find({city:value})
   if(alreadyExists.length === 0 ){
    let city=new City({
        city:value
    })
    city.save()
    return true
}
else return false
}

const count=(cities)=>{
    let count=0;
    cities.forEach(async(value)=>{
        let exist=await addCity(value)
        // console.log(value+" "+exist);
         if(exist) {count++;  console.log(count);}
    })
  
    return count
}

const addCities=async(req,res)=>{
    let cities=req.body.cities;
    let total= count(cities);
    res.send("Added Cities")
}

const getCityExceptOne=async(req,res)=>{
   const results= await City.where("city").ne(req.body.city)
   console.log(results);
   res.send(results)
}
module.exports={getAllCities,addCity,addCities ,getCityExceptOne}
const res = require('express/lib/response')
const Booking = require('../models/bookingModel')
const { deleteOne } = require('../models/busModel')
const Bus=require('../models/busModel')
const Seat = require('../models/seatModel')
const { autoGenerateSeats } = require('./seatServices')

const filterBus=async(req,res)=>{

const{boardingLocation,destinationLocation}=req.body
let buses=await Bus.find({boardingLocation,destinationLocation})
res.send(buses)
}

const getBus=async(req,res)=>{
const {name}=req.body
res.send(await Bus.findOne({name}))
}
const getAllBuses=async(req,res)=>{
    let results=await Bus.find()
  let totalBuses=results.length
    res.send({
        totalBuses,
        results
    })
}

const addValidBus=async(object)=>{
    let alreadyExists=await Bus.find({name:object.name})
    if(alreadyExists.length === 0 ){
    const {name,boardingLocation,destinationLocation,price,totalSeats,availableSeats,depatureTime,arrivalTime}=object
    let bus=new Bus({
         name,
         boardingLocation,
         destinationLocation,
         price,
         totalSeats,
         availableSeats,
         depatureTime,
         arrivalTime
     })
     await bus.save()
     bus=await Bus.findOne({name})
     await autoGenerateSeats(bus._id,bus.totalSeats)
     return true
 }
 else return false
}

const addBus=async(req,res)=>{
let valid=await addValidBus(req.body);
  if(valid){ 
     res.send("Added Bus")
    }
  else res.send("Failed to Add Bus")
}

const addBuses=async(req,res)=>{
    let count=0;
let Buses=req.body;
for(let i=0;i<Buses.length;i++){
    let valid=await addValidBus(Buses[i]);
    if(valid) count++
}
res.send(`Added ${count} Valid Buses`)
}

const updateBus=async(req,res)=>{
let busId=req.body._id
const bus=await Bus.findOne({_id:busId})
let initialTotalSeats=bus.totalSeats;
let initialAvailableSeats=bus.availableSeats
if(bus!==null){
    const{name,price,boardingLocation,destinationLocation,totalSeats,depatureTime,arrivalTime}=req.body
    await bus.updateOne({
        name,
        price,
        boardingLocation,
        destinationLocation,
        totalSeats,
        depatureTime,
        arrivalTime
    })
    if(totalSeats!==undefined && totalSeats!=initialTotalSeats){
        let diff=initialTotalSeats-totalSeats;
        console.log(diff);
        if(diff<0){
            diff=Math.abs(diff)
            console.log(initialAvailableSeats+diff);
            await bus.updateOne({
                availableSeats:initialAvailableSeats+diff
            })
            await autoGenerateSeats(busId,totalSeats,initialTotalSeats)
        }
       else{
          res.send("Cannot delete seats")
       }
    }
   
    res.send("Updated")
}
else res.send("Bus doesn't exist")
}

const deleteBus=async(req,res)=>{
let bus=await Bus.findOne({name:req.body.name})
await Bus.deleteOne({name:req.body.name})
await Seat.deleteMany({busId:bus._id})
await Booking.deleteMany({busId:bus._id})
res.send("Deleted Successfully")
}

const deleteAllBuses=async(req,res)=>{
await Bus.deleteMany()
await Seat.deleteMany()
res.redirect('getAllBuses')
}


module.exports={getAllBuses,addBus,addBuses,updateBus,deleteAllBuses,deleteBus,filterBus,getBus}
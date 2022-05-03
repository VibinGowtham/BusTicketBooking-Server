const res = require('express/lib/response')
const Bus = require('../models/busModel')
const Seat=require('../models/seatModel')

const getAllSeats=async(req,res)=>{
    let results=await Seat.find()
  let totalSeats=results.length
    res.send({
        totalSeats,
        results
    })
}

const updateAvailability=async(req,res)=>{
const {seats,busId}=req.body
for(let i=0;i<seats.length;i++){
  let seat=await Seat.findOne({busId,seatNumber:seats[i]})
  await seat.updateOne({
    availability:false
  })
  let bus=await Bus.findOne({_id:busId})
  await bus.updateOne({
    availableSeats:bus.availableSeats-1
  })
}
res.send(`${seats.length} seats updated`)
}

const autoGenerateSeats=async(busId,totalSeats)=>{
  let str="ABCDEFGHIJKLMNOPQRSTUVWXYZZZZZ"
for(var i=0;i<totalSeats;i++){
  let seatNumber=str[i]+1;
  let seat=new Seat({
   busId,
   seatNumber
 })
  await seat.save()
}
return true
}


const generateSeats=async(req,res)=>{
  let {busId,totalSeats}=req.body
  if(await autoGenerateSeats(busId,totalSeats)) res.send("Genrated seats")
  else res.send("Failed to generate seats")
}

// const addSeat=async(req,res)=>{
// let bus=await Bus.findOne({name:req.body.busName})
// if(bus!==null){
//   let busId=bus._id;
//   let remainingSeats=bus.availableSeats
//   if(remainingSeats>0){
//     let seat=new Seat({
//       busId:busId,
//       seatNumber:req.body.seatNumber
//     })
//     try{
//       await seat.save();
//       await bus.updateOne({availableSeats:remainingSeats-1})
//     res.send(`${seat.seatNumber} added to the bus ${bus.name}`)
//     }catch(e){
//       res.send("Seat Already exists")
//     }
//   }
//   else res.send("Seat Capacity is full")
// }
// else res.send("Bus doesn't exists")
// }

const deleteSeats=async(req,res)=>{
let busId=req.body.busId
console.log(busId);
await Seat.deleteMany({busId})
res.send("Successfully deleted Seats")
}
const deleteAllSeats=async(req,res)=>{
  await Seat.deleteMany();
  res.redirect('getAllSeats')
}

module.exports={getAllSeats,deleteAllSeats,generateSeats,autoGenerateSeats,deleteSeats,updateAvailability}
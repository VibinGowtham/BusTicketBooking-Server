const res = require('express/lib/response')
const Booking = require('../models/bookingModel')
const Bus = require('../models/busModel')
const Seat = require('../models/seatModel')
const { addBooking } = require('./bookingServices')

const getAllSeats = async (req, res) => {
  let results = await Seat.find()
  let totalSeats = results.length
  res.send({
    totalSeats,
    results
  })
}

const cancelBooking=async(obj)=>{
  const { busId, bookingId, seats } = obj

  for (let i = 0; i < seats.length; i++) {
    let seat = Seat.findOne({ busId, seatNumber: seats[i] })
    await seat.updateOne({
      availability: true
    })
    let bus = await Bus.findOne({ _id: busId })
    
    await bus.updateOne({
      availableSeats: bus.availableSeats + 1
    })
  }
  await Booking.deleteOne({ _id: bookingId })
  return true
}


const releaseSeats = async (req, res) => {
  if(await cancelBooking(req.body)){
    res.send({
      status: 200,
      message:"Booking Cancelled Succesfully"
    })
  }
 else{
  res.send({
    status: 409,
    message:"Booking Cancellation Failed"
  })
 }

}

const updateAvailability = async (req, res) => {
  console.log(req.body);
  const { userId, seats, busId, price, bookedDate, paymentMode } = req.body
  console.log(seats, busId);
  for (let i = 0; i < seats.length; i++) {
    let seat = await Seat.findOne({ busId, seatNumber: seats[i] })

    await seat.updateOne({
      availability: false
    })
    let bus = await Bus.findOne({ _id: busId })
    await bus.updateOne({
      availableSeats: bus.availableSeats - 1
    })
  }
  bookingDetails = await addBooking({ userId, busId, price, seats, bookedDate, paymentMode })

  res.send({
    status: 200,
    message: `Succesfully Booked ${seats.length} Seats `
  })
}


const autoGenerateSeats = async (busId, totalSeats, start = 0) => {
  let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZZZZZ"
  for (var i = start; i < totalSeats; i++) {
    let seatNumber = str[i] + 1;
    let seat = new Seat({
      busId,
      seatNumber
    })
    await seat.save()
  }
  return true
}

const generateSeats = async (req, res) => {
  let { busId, totalSeats } = req.body
  if (await autoGenerateSeats(busId, totalSeats)) res.send("Genrated seats")
  else res.send("Failed to generate seats")
}

const deleteSeats = async (req, res) => {
  let busId = req.body.busId
  console.log(busId);
  let bus=await Bus.findOne({_id:busId})
  await Seat.deleteMany({ busId })
  await generateSeats(busId,bus.totalSeats)
  res.send("Successfully deleted Seats")
}

const deleteAllSeats = async (req, res) => {
  await Seat.deleteMany();
  res.redirect('getAllSeats')
}


const getSeats = async (req, res) => {
  const { id } = req.body;
  let seats = await Seat.find({ busId: id })
  res.send(seats)
}

module.exports = { getAllSeats,cancelBooking, deleteAllSeats, generateSeats, autoGenerateSeats, deleteSeats, updateAvailability, getSeats, releaseSeats }
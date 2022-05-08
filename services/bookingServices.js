const Booking = require("../models/bookingModel");
const { sendMail } = require('../config/mailConfig')

const getAllBookings = async (req, res) => {
    let results = await Booking.find()
    let total=results.length
    res.send({total,results})
}

const getDetailedBookings = async (_id) => {
    let booking = await Booking.findOne({_id}).populate(['userId', 'busId'])
        let obj = {
            BookingId: booking._id,
            Name: booking.userId.name,
            Email: booking.userId.email,
            Contact_No: booking.userId.contactNo,
            Bus: booking.busId.name,
            Seats: booking.seats,
            Boarding_Location: booking.busId.boardingLocation,
            Destination_Location: booking.busId.destinationLocation,
            depatureTime: booking.busId.depatureTime,
            arrivalTime: booking.busId.arrivalTime,
            TotalAmount: booking.price
        }
    return obj;
}

const addBooking = async (obj) => {
    console.log(obj);
    const { userId, busId, price, seats } = obj
    let booking = new Booking({ userId, busId, price, seats })
    let bookingInstance=await booking.save()
   let bookingDetails=await getDetailedBookings(bookingInstance._id)
   sendMail(bookingDetails)
   return bookingDetails
}

const deleteAllBookings=async(req,res)=>{
    await Booking.deleteMany()
    res.redirect('getAllBookings')
}

module.exports = { getAllBookings, addBooking, getDetailedBookings,deleteAllBookings }
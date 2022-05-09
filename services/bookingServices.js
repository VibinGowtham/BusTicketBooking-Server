const Booking = require("../models/bookingModel");
const { sendMail } = require('../config/mailConfig')

const getAllBookings = async (req, res) => {
    let results = await Booking.find()
    let total = results.length
    res.send({ total, results })
}

const getDetailedBookings = async (booking) => {
    // let booking = await Booking.findOne({ _id }).populate(['userId', 'busId'])
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
        paymentMode:booking.paymentMode,
        bookedDate:booking.bookedDate,
        TotalAmount: booking.price
    }
    return obj;
}

const getAllDetailedBookings = async (req, res) => {
    res.send(await Booking.find().populate(['userId', 'busId']))
}

const getBookings = async (req, res) => {
    const { userId } = req.body
    let results = await Booking.find({ userId }).populate(['userId', 'busId'])
    let filteredResults=[]
    for(let i=0;i<results.length;i++){
        filteredResults[i]=await getDetailedBookings(results[i])
    }
    res.send({
        total: results.length,
        filteredResults
    })
}

const addBooking = async (obj) => {
    console.log(obj);
    const { userId, busId, price, seats,bookedDate,paymentMode } = obj
    let booking = new Booking({ userId, busId, price, seats,bookedDate,paymentMode })
    let bookingInstance = await booking.save()
    // console.log(await bookingInstance.populate(['userId','busId']));
    bookingInstance=await bookingInstance.populate(['userId','busId']);
    let bookingDetails = await getDetailedBookings(bookingInstance)
    sendMail(bookingDetails)
    return bookingDetails
}

const deleteAllBookings = async (req, res) => {
    await Booking.deleteMany()
    res.redirect('getAllBookings')
}

module.exports = { getAllBookings, addBooking, getDetailedBookings, deleteAllBookings, getAllDetailedBookings, getBookings }
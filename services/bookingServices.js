const Booking = require("../models/bookingModel");
const { sendMail } = require('../config/mailConfig');


const getAllBookings = async (req, res) => {
    let results = await Booking.find()
    let total = results.length
    res.send({ total, results })
}



const getDetailedBookings = async (booking) => {
    // let booking = await Booking.findOne({ _id }).populate(['userId', 'busId'])
    
    if(booking==null) return {}
    else{
    let obj = {
        busId: booking.busId._id,
        bookingId: booking._id,
        name: booking.userId.name,
        email: booking.userId.email,
        contactNo: booking.userId.contactNo,
        bus: booking.busId.name,
        busType: booking.busId.busType,
        seats: booking.seats,
        boardingLocation: booking.busId.boardingLocation,
        destinationLocation: booking.busId.destinationLocation,
        depatureTime: booking.busId.depatureTime,
        arrivalTime: booking.busId.arrivalTime,
        paymentMode: booking.paymentMode,
        pickupLocation: booking.busId.pickupLocation,
        dropLocation: booking.busId.dropLocation,
        bookedDate: booking.bookedDate,
        totalAmount: booking.price
    }
    return obj;
    }

}

const getAllDetailedBookings = async (req, res) => {
    res.send(await Booking.find().populate(['userId', 'busId']))
}

const getBookings = async (req, res) => {
    const { userId } = req.body
    let results = await Booking.find({ userId }).populate(['userId', 'busId'])
    console.log("Results");
    console.log(results);
    let filteredResults = []
    for (let i = 0; i < results.length; i++) {
        filteredResults[i] = await getDetailedBookings(results[i])
    }
    res.send({
        total: results.length,
        filteredResults
    })
}

const addBooking = async (obj) => {
    console.log(obj);
    const { userId, busId, price, seats, bookedDate, paymentMode } = obj
    let booking = new Booking({ userId, busId, price, seats, bookedDate, paymentMode })
    let bookingInstance = await booking.save()
    // console.log(await bookingInstance.populate(['userId','busId']));
    bookingInstance = await bookingInstance.populate(['userId', 'busId']);
    console.log("Booking Instance");
    let bookingDetails = await getDetailedBookings(bookingInstance)
    console.log(bookingDetails);
    sendMail(bookingDetails)
    return bookingDetails
}

const deleteAllBookings = async (req, res) => {
    await Booking.deleteMany()
    res.redirect('getAllBookings')
}

module.exports = { getAllBookings, addBooking, getDetailedBookings, deleteAllBookings, getAllDetailedBookings, getBookings }
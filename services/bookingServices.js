const Booking = require("../models/bookingModel");

const getAllBookings = async (req, res) => {
    let results = await Booking.find()
    res.send(results)
}

const getDetailedBookings = async (_id) => {
    let booking = await Booking.findOne({_id}).populate(['userId', 'busId'])
    console.log(booking);
        let obj = {
            BookingId: booking._id,
            Name: booking.userId.name,
            Email: booking.userId.email,
            Contact_No: booking.userId.contactNo,
            Bus: booking.busId.name,
            Seats: booking.seats,
            Boarding_Location: booking.busId.boardingLocation,
            Destination_Location: booking.busId.destinationLocation,
            DepatureTime: booking.busId.DepatureTime,
            ArrivalTime: booking.busId.ArrivalTime,
            TotalAmount: booking.price
        }
        console.log(obj);
    return obj;
}

const addBooking = async (req, res) => {
    const { userId, busId, price, seats } = req.body
    let booking = new Booking({ userId, busId, price, seats })
    let bookingInstance=await booking.save()
    console.log(bookingInstance._id);
   let obj=await getDetailedBookings(bookingInstance._id)
   res.send(obj)
}

const deleteAllBookings=async(req,res)=>{
    await Booking.deleteMany()
    res.redirect('getAllBookings')
}

module.exports = { getAllBookings, addBooking, getDetailedBookings,deleteAllBookings }
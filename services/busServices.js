const res = require('express/lib/response')
const Booking = require('../models/bookingModel')
const { deleteOne } = require('../models/busModel')
const Bus = require('../models/busModel')
const Seat = require('../models/seatModel')
const { autoGenerateSeats } = require('./seatServices')

const filterBus = async (req, res) => {
    const { boardingLocation, destinationLocation, depatureDate } = req.body

    let buses = await Bus.find({ boardingLocation, destinationLocation, depatureDate })

    res.send(buses)
}

const getBus = async (req, res) => {
    const { id } = req.body
    res.send(await Bus.findOne({ _id: id }))
}
const getAllBuses = async (req, res) => {
    let results = await Bus.find()
    let totalBuses = results.length
    res.send({
        totalBuses,
        results
    })
}
const getAllLocations = async (req, res) => {
    let buses = await Bus.find()
    let boardinglocations = []
    let destinationLocations = []
    for (let i = 0; i < buses.length; i++) {
        let bus = buses[i]
        boardinglocations[i]=bus.boardingLocation
        destinationLocations[i]=bus.destinationLocation
    }
    res.json({
        boardinglocations:[...new Set(boardinglocations)], 
        destinationLocations:[...new Set(destinationLocations)]
    })
}

const addValidBus = async (object) => {
    let name = object.name
    let alreadyExists = await Bus.find({ name })
    if (alreadyExists.length === 0) {
        const {
            name,
            busType,
            boardingLocation,
            destinationLocation,
            pickupLocation,
            dropLocation,
            price,
            totalSeats,
            rating,
            depatureDate,
            depatureTime,
            arrivalTime,
            totalTime
        } = object
        let bus = new Bus({
            name,
            busType,
            boardingLocation,
            destinationLocation,
            pickupLocation,
            dropLocation,
            price,
            totalSeats,
            availableSeats: totalSeats,
            rating,
            depatureDate,
            depatureTime,
            arrivalTime,
            totalTime
        })
        await bus.save()
        bus = await Bus.findOne({ name })
        await autoGenerateSeats(bus._id, bus.totalSeats)
        return true
    }
    else return false
}

const addBus = async (req, res) => {
    let valid = await addValidBus(req.body);
    if (valid) {
        res.send({
            status: 200,
            message: "Bus Succesfully Added"
        })
    }
    else res.send({
        status: 403,
        message: "Failed to Add Bus"
    })
}



const addBuses = async (req, res) => {
    let count = 0;
    let Buses = req.body;
    for (let i = 0; i < Buses.length; i++) {
        let valid = await addValidBus(Buses[i]);
        if (valid) count++
    }
    res.send(`Added ${count} Valid Buses`)
}

const updateBus = async (req, res) => {    
    let busId = req.body.busId
    const bus = await Bus.findOne({ _id: busId })

    if (bus !== null) {
        let initialTotalSeats = bus.totalSeats;
        let initialAvailableSeats = bus.availableSeats
        const {
            name,
            busType,
            boardingLocation,
            destinationLocation,
            pickupLocation,
            dropLocation,
            price,
            totalSeats,
            rating,
            depatureDate,
            depatureTime,
            arrivalTime,
            totalTime
        } = req.body
    await bus.updateOne({
            name,
            busType,
            boardingLocation,
            destinationLocation,
            pickupLocation,
            dropLocation,
            price,
            totalSeats,
            rating,
            depatureDate,
            depatureTime,
            arrivalTime,
            totalTime
        })

        if (totalSeats !== undefined && totalSeats != initialTotalSeats) {
            let diff = initialTotalSeats - totalSeats;
            if (diff < 0) {
                diff = Math.abs(diff)
                await bus.updateOne({
                    availableSeats: initialAvailableSeats + diff
                })
                await autoGenerateSeats(busId, totalSeats, initialTotalSeats)
                res.send({
                    status: 200,
                    message: "Bus Successfully Updated"
                })
            }
            else {
                res.send({
                    status: 409,
                    message: "Cannot delete seats"
                })
            }
        }
        else{
            res.send({
                status: 200,
                message: "Bus Successfully Updated"
            })
        }
    }
    else res.send("Bus doesn't exist")
}

const deleteBus = async (req, res) => {
    let bus = await Bus.findOne({ _id: req.body.busId })
    if (bus) {
        await Bus.deleteOne({ _id: req.body.busId })
        await Seat.deleteMany({ busId: bus._id })
        await Booking.deleteMany({ busId: bus._id })
        res.send({
            status: 200,
            message: "Bus deleted Successfully"
        })
    }
    else res.send({
        status: 409,
        message: "Bus not Found"
    })

}

const deleteAllBuses = async (req, res) => {
    await Bus.deleteMany()
    await Seat.deleteMany()
    await Booking.deleteMany()
    res.redirect('getAllBuses')
}


module.exports = { getAllBuses, addBus, addBuses, updateBus, deleteAllBuses, deleteBus, filterBus, getBus, getAllLocations }
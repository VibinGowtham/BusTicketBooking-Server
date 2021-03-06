const { Schema } = require('../config/dbConfig')
const mongoose=require('../config/dbConfig')

const busSchema=new Schema({
    name:{
        type:String,
        unique:true,
        required:true
    },
    busType:{
        type:String,
        default:"A/C Non-Sleeper"
    },
    boardingLocation:{
        type:String,
        required:true
    },
    destinationLocation:{
        type:String,
        required:true
    },
    pickupLocation:{
        type:String,
        required:true
    },
    dropLocation:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        default:600
    },
    totalSeats:{
        type:Number,
        default:12
    },
    availableSeats:{
        type:Number,
        default:12
    },
    depatureDate:{
        type:Number,
        default:0
    },
    rating:{
        type:String,
        default:"4.0"
    },
    depatureTime:{
        type:String,
        default:"10:30 Pm"
    },
    arrivalTime:{
        type:String,
        default:"5:00 Am"
    },
    totalTime:{
    type:String,
    default:"5h 30m"
    }
})

let Bus=mongoose.model('Bus',busSchema)
module.exports=Bus
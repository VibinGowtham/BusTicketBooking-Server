const { Schema } = require('../config/dbConfig')
const mongoose=require('../config/dbConfig')

const busSchema=new Schema({
    name:{
        type:String,
        unique:true,
        required:true
    },
    boardingLocation:{
        type:String,
        required:true
    },
    destinationLocation:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        default:600
    },
    totalSeats:{
        type:Number,
        default:10
    },
    availableSeats:{
        type:Number,
        default:10
    },
    depatureTime:{
        type:String,
        default:()=>new Date().toLocaleString()
    },
    arrivalTime:{
    type:String,
    default:()=>new Date(new Date().setDate(new Date().getDate()+1)).toLocaleString()
    }
})

let Bus=mongoose.model('Bus',busSchema)
module.exports=Bus
const mongoose=require('../databaseConfig/config');

const seatSchema=new mongoose.Schema({
    busId:{
        type:mongoose.SchemaTypes.ObjectId,
        ref:'Bus'
    },
    seatNumber:{
        type:String,
    },
    availability:{
        type:Boolean,
        default:true
    }
})

const Seat=mongoose.model('Seat',seatSchema)
module.exports=Seat;
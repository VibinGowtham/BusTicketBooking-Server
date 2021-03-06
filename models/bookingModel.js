const { Schema } = require('../config/dbConfig')
const mongoose=require('../config/dbConfig')

const BookingSchema=new Schema({
    userId:{
       type:Schema.Types.ObjectId,
       ref:'User'
    },
    busId:{
        type:Schema.Types.ObjectId,
        ref:'Bus'
    },
    bookedDate:{
        type:String,
        default:new Date().toDateString()
    },
    paymentMode:{
        type:String,
        default:'Card'
    },
    price:{
       type:Number
   },
   seats:{
       type:Array
   }
})

let Booking=mongoose.model('Booking',BookingSchema)
module.exports=Booking
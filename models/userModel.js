const { Schema } = require('../config/dbConfig')
const mongoose=require('../config/dbConfig')

const userSchema=new Schema({
    name:{
        type:String,
        required:true
    },
    contactNo:{
        type:String,
        required:true
    },
    email:{
       type:String,
       unique:true,
       required:true
    },
    password:{
        type:String,
        required:true
    },
    isAdmin:{
        type:Boolean,
        default:false
    }
})

let User=mongoose.model('User',userSchema)
module.exports=User
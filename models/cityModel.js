const mongoose=require('../databaseConfig/config')
const Schema=mongoose.Schema;

const locationSchema=new Schema({
    city:{type:String}
})

let City=mongoose.model('City',locationSchema)
module.exports=City
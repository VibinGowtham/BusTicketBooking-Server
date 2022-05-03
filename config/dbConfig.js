const mongoose= require('mongoose')
const dbUrl="mongodb+srv://root:root@busticketbooking.e8lxy.mongodb.net/busticketbooking?retryWrites=true&w=majority"

const connectionParams={
    useNewUrlParser:true,
    useUnifiedTopology:true
}

mongoose.connect(dbUrl,connectionParams)
.then(()=>console.log("connected"))
.catch(()=>console.log("Error connecting"))

module.exports=mongoose
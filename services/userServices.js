const User=require('../models/userModel.js')
// const mongoose=require('../databaseConfig/config')
const bcrypt=require('bcrypt')

const login=async(req,res)=>{
    let user=await User.findOne({email:req.body.email})
    if(user !== null){
       if(user.name == req.body.name && await bcrypt.compare(req.body.password,user.password) ) res.send("Login Succesful")
   }
   else res.send("User not found")
}

const register=async(req,res)=>{
    let alreadyExists =await  User.find({email:req.body.email})
    if(alreadyExists.length === 0){
        let salt=await bcrypt.genSalt(10)
        let hashedPassword=await bcrypt.hash(req.body.password,salt)
        let user=new User({
           name:req.body.name,
           contactNo:req.body.contactNo,
           email:req.body.email,
           password:hashedPassword
       })
       user.save().then(()=>res.send("You have been successfully registered"))
    }
   else res.send("Already registered")
}

const getUser=async(req,res)=>{
   const user=await User.findOne({email:req.body.email})
  if(user!==null)  res.send(user)
  else res.send("User doesn't exists")
}

const deleteUser=async(req,res)=>{
    const user=await User.deleteOne({email:req.body.email})
    if(user!==null)  res.send(user)
    else res.send("User doesn't exists")
 }
 

const getAllUsers=async(req,res)=>{
    res.send(await User.find())
}

const deleteAllUsers=async(req,res)=>{
     await User.deleteMany()
    User.deleteMany().then(()=>res.redirect('getAllUsers'))

}

module.exports={register,login,getAllUsers,deleteAllUsers,getUser,deleteUser}
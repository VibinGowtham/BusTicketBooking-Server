const User=require('../models/userModel.js')
// const mongoose=require('../databaseConfig/config')
const bcrypt=require('bcrypt')

const hashPassword=async(password)=>{
    let salt=await bcrypt.genSalt(10)
     return await bcrypt.hash(password,salt)
}

const login=async(req,res)=>{
    let {email,password}=req.body
    email=email.toLowerCase()
    let user=await User.findOne({email})
    
    if(user !== null){
       if(user.email == email && await bcrypt.compare(password,user.password) ) res.send("Login Succesful")
   }
   else res.send("User not found")
}

const register=async(req,res)=>{
    let alreadyExists =await User.find({email:req.body.email})
    if(alreadyExists.length === 0){
        const{name,contactNo,email,password}=req.body
        let hashedPassword=await hashPassword(password)
        let user=new User({
           name,
           contactNo,
           email,
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

const update=async(req,res)=>{
const {_id}=req.body;
let user=await User.findOne({_id})
if(user!==null){
let {name,contactNo,email,password}=req.body;
if(password!==undefined) password=await hashPassword(password)
await user.updateOne({name,contactNo,email,password})
res.send(await User.findOne({_id}))
}
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

module.exports={register,login,getAllUsers,deleteAllUsers,getUser,deleteUser,update}
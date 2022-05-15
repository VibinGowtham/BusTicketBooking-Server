const User = require('../models/userModel.js')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


const hashPassword = async (password) => {
    let salt = await bcrypt.genSalt(10)
    return await bcrypt.hash(password, salt)
}

const login = async (req, res) => {
    let { email, password } = req.body
    email = email.toLowerCase()
    let user = await User.findOne({ email })

    if (user !== null) {
        if (user.email == email && await bcrypt.compare(password, user.password)) {
            let payload = {
                id: user._id,
                isAdmin: user.isAdmin
            }
            let AccessToken = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: "1m" })
            let RefreshToken = jwt.sign(payload, process.env.REFRESH_KEY, { expiresIn: "7d" })

            res.send({
                message: "You have been Succesfully logged in",
                AccessToken: `Bearer ${AccessToken}`,
                RefreshToken: `Bearer ${RefreshToken}`,
                userId: user._id,
                status: 200
            })
        }
    }
    else res.send("User not found")
}

const register = async (req, res) => {

    let alreadyExists = await User.find({ email: req.body.email })
    if (alreadyExists.length === 0) {
        const { name, contactNo, email, password ,isAdmin} = req.body
        let hashedPassword = await hashPassword(password)
        let user = new User({
            name,
            contactNo,
            email,
            password: hashedPassword,
            isAdmin
        })
        user.save().then((user) => res.send({
            status: 200,
            message: "User Successfully Registered"
        }))
    }
    else res.send({
        status: 403,
        message: "Email is already registered"
        
    })
}

const getUser = async (req, res) => {
    const user = await User.findOne({ email: req.body.email })
    if (user !== null) res.send(user)
    else res.send("User doesn't exists")
}

const updateUser = async (req, res) => {
    const { id } = req.body;
    let user = await User.findOne({ _id:id })
    if (user !== null) {
        let { name, contactNo, email, password } = req.body;
        if (password !== undefined) password = await hashPassword(password)
        await user.updateOne({ name, contactNo, email, password })
        res.send(await User.findOne({ _id }))
    }
    else res.send("User doesn't exists")
}

const deleteUser = async (req, res) => {
    const user = await User.deleteOne({ email: req.body.email })
    if (user !== null) res.send(user)
    else res.send("User doesn't exists")
}


const getAllUsers = async (req, res) => {
    res.send(await User.find())
}

const deleteAllUsers = async (req, res) => {
    await User.deleteMany()
    User.deleteMany().then(() => res.redirect('getAll'))

}

module.exports = { register, login, getAllUsers, deleteAllUsers, getUser, deleteUser, updateUser }
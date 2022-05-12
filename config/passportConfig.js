const  passport = require('passport');
const User = require('../models/userModel');
const router = require('../routes/adminRoutes');
let JwtStrategy = require('passport-jwt').Strategy
let ExtractJwt = require('passport-jwt').ExtractJwt;

var opts = {
    jwtFromRequest : ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey : process.env.SECRET_KEY
}

passport.use(new JwtStrategy(opts,async function(jwt_payload, done) {
    console.log(jwt_payload);
     let user= await User.findOne({_id:jwt_payload.id})
     console.log(user);
     if(user!=null){
         done(null,user)
     }else{
         done(err,false)
     }
})
);

checkAdmin = (req,res,next) => {
    if (req.user.isAdmin !== true) return res.sendStatus(401)
    next()
}


module.exports=checkAdmin

const  passport = require('passport');
const User = require('../models/userModel');
let JwtStrategy = require('passport-jwt').Strategy
let ExtractJwt = require('passport-jwt').ExtractJwt;

var opts = {
    jwtFromRequest : ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey : process.env.SECRET_KEY
}

passport.use(new JwtStrategy(opts,async function(jwt_payload, done) {
    console.log(jwt_payload);
     let user= await User.findOne({id:jwt_payload.id})
     console.log(user);
     if(user!=null){
         done(null,user)
     }else{
         done(err,false)
     }
}));

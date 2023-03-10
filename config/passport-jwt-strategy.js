const passport=require('passport');
const JWTStrategy=require('passport-jwt').Strategy;
// this helps us to extract jwt from header
const ExtractJWT=require('passport-jwt').ExtractJwt;
// we are estabilishing the user identity so we also require model user
const User=require('../models/user');

let opts={
    jwtFromRequest:ExtractJWT.fromAuthHeaderAsBearerToken,
    secretOrKey: 'codeial'
}
// tell passport to use jwt strategy
// storing whole user information in jwtPayLoad 
// in this user is alredy present in jwtPayLoad and you are fetching the id and matches that if user exists or not
// we are not authenticated the user
passport.use(new JWTStrategy(opts,function(jwtPayLoad,done){
 User.findById(jwtPayLoad._id,function(err,user){
   if(err){
    console.log('Error in finding user from JWT');
    return;
   }
   if(user){
    // there is no error but user found
    return done(null,user);
 }
 else{
    // null means no error and false means user not found
    return done(null,false);
 }
 });
}));

module.exports=passport;
const passport=require('passport');
const LocalStrategy=require('passport-local').Strategy;
//import user model
const User=require('../models/user');
// we have to tell passport to use this local strategy and we are defining what userName is and it also takes  function which takes 
// 3 arguments (email,password and done) and done is a call back function which is reporting back to passport.js.
//whenever the LocalStrategy called email and password atomatically passed into that function.

// authentication using passport

passport.use(new LocalStrategy({
    usernameField:'email',
    
}, function(email,password,done){
    // find the user and establish the identity
     User.findOne({email:email},function(err,user){
            if(err){
                console.log('Error in finding user-->passport');
                return done(err);
            }
            if(!user || user.password!= password){
              console.log('invalis username/password');
              // there is no error but user not found so in done method it takes two argument,one is null means no error,false means authentication not done
              return done(null ,false);

            }
            //if user is found,null meaning there is no error
            return done(null,user);
        });
}
));
// serializing the user to decide which key to be kept in the cookies
// this function sets the id as cookie and sent it back to browser
// serializeUser or deserializeuser both are inbuilt passport function
passport.serializeUser(function(user,done){
 done(null,user.id);
});
//deserializing the user from the key in the cookies
// when the req goes it finds the user from key the key
passport.deserializeUser(function(id,done){
  User.findById(id,function(err,user){
   if(err){
    console.log('Error in finding user-->passport');
    return done(err);
    }
    return done(null,user);
  });
});
//check if the user is authenticated 
// it is a middleware function which checks whether the
passport.checkAuthentication=function(req,res,next){
    // if the user is signed in pass on the request to the next function which is my next function(controller's function)
     if(req.isAuthenticated()){
        return next();
     }
     // if the user is not signed in
     return res.redirect('/users/sign-in');
}
passport.setAuthenticatedUser=function(req,res,next){
    if(req.isAuthenticated()){
       
        // req.user contains the current signed in user from the session and we are just sending this to the locals to the views
        res.locals.user=req.user
    }
    next();
}
// now we need to export it we only export passport
module.exports=passport;
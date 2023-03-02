// import model
const User=require('../models/user')
module.exports.profile= function(req,res){
  return res.render('user_profile',{
    title:"userProfile"
  });
}
// render the sign up page
module.exports.signUp=function(req,res){
  // if the user is already signed-in and wants to access the sign-up page it will redirect to profile page  
  if(req.isAuthenticated()){
    return res.redirect('/users/profile');
  }
  return res.render('user_sign_up',{
    title:"codeail|Sign Up"
  })
}
// render the sign In page
module.exports.signIn=function(req,res){
   // if the user is already signed-in and wants to access the sign-in page again it will redirect to profile page  
   if(req.isAuthenticated()){
    return res.redirect('/users/profile');
  }
   return res.render('user_sign_in',{
    title:"codeail|Sign In"
  })
}

// get the sign up data
module.exports.create=function(req,res){
  if(req.body.password!=req.body.confirm_password){
    return res.redirect('back');
  }
  User.findOne({email:req.body.email},function(err,user){
    if(err){
      console.log('error in finding user in singing up');
      return;
    }
    //console.log(user);
    // if user not exist
    if(!user){
      User.create(req.body,function(err,user){
        if(err){
          console.log('error in creating user while signing up');
        return;
        }
       return res.redirect('/users/sign-in');
      })
    }
    else{
      res.redirect('back');
    }
  });

}
// sign in and create the session for the user
module.exports.createSession=function(req,res){
   return res.redirect('/');
}

module.exports.destroySession=function(req,res){
  // this logout fun is given by passport.js
  req.logout(req.user, err => {
    if(err)
     return next(err);
    res.redirect("/");
  });
}
 
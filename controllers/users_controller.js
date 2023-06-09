// import model
const User=require('../models/user')
//lets keep it same as before
module.exports.profile= function(req,res){
  // find the user
  User.findById(req.params.id,function(err,user){
    if(user){
      return res.render('user_profile',{
        title:"userProfile",
        //we can not use key as user cuz user key is present in locals
        profile_user:user
      });
    }
    else{

    }
  });
 
}

//update user deatils
// module.exports.update=function(req,res){
//   // it is a check that verifies the login user with the user id that he/she wants to update data 
//   if(req.user.id==req.params.id){
//     // you can only write req.body instead of {name:req.body.name,email:req.body.email}
//    User.findByIdAndUpdate(req.params.id,{name:req.body.name,email:req.body.email},function(err,user){

//      return res.redirect('back');
//    });
//   }
//   else{
//     return res.status(401).send('Unauthorized')
//   }
// }
module.exports.update= async function(req,res){
  if(req.user.id==req.params.id){
     try{
        //you can only write req.body instead of {name:req.body.name,email:req.body.email}
        let user= await User.findById(req.params.id);
       User.uploadedAvatar(req,res,function(err){
        if(err){
          console.log('***Multer Error: ',err);
          //return res.redirect('back');
        }
        console.log(req.file);
        user.name=req.body.name;
        user.email=req.body.email;
        // you need to check wthether a 
        if(req.file){
          // this is just saving the path of uploaded file into thr avatar field in the user
          user.avatar=User.avatarPath+'/'+req.file.filename;
        }
        user.save();
        
       });
        req.flash('success','updated');
        return res.redirect('back');
     }catch(err){
        req.flash('error',err);
        return res.redirect('back');
     }
      }
      else{
        req.flash('error','unauthorized');
        return res.status(401).send('Unauthorized');
      }
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
  // set up the messages
  req.flash('success','Logged In Sucessfully');
   return res.redirect('/');
}

module.exports.destroySession=function(req,res){
  // this logout fun is given by passport.js

  req.logout(req.user, err => {
    if(err)
     return next(err);
     req.flash('success','you have logged out!');
    res.redirect("/");
  });
  
 

}
 

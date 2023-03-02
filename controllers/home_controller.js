const Post=require('../models/post');
// export the controller func so that It can be accessible in the project , routes can use it
module.exports.home= async function(req,res){
  
  // Post.find({},function(err,posts){
       
  //       return res.render('home',{
  //         title:"Codeial | Home",
  //         posts:posts
  //     });
  //     })
  // populate the user of each post
  let posts=await Post.find({}).populate('user');
  return res.render('home',{
            title:"Codeial | Home",
            posts:posts
        });
  
     
}
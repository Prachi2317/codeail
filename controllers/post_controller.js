const Post=require('../models/post');
const Comment=require('../models/comment');
module.exports.create= async function(req,res){
  try{
    let post = await Post.create({
      content:req.body.content,
      user:req.user._id
    });
     let newPost=await post.populate('user');
    //type of ajax request is xml ,http
    if(req.xhr){
      return res.status(200).json({
        data:{
          post:newPost
        },
        message:"post created!"
      })
    }
    req.flash('success','post published');
    return res.redirect('back');
    
  }catch(err){
    //  console.log('Error',err);
    req.flash('error','err');
     return res.redirect('back');
  }

}
// // destroy the post
// module.exports.destroy=function(req,res){
//   Post.findById(req.params.id,function(err,post){
    
//     //.id means converting the object id into string
//     if(post.user==req.user.id){
//       post.remove();
//       // used for delete multiple documents 
//       Comment.deleteMany({
//         post:req.params.id
//       },function(err){
//         return res.redirect('back');
//       });

//     } 
//     else{
//       return res.redirect('back');
//     }
//   });
// }
// destroy the post
module.exports.destroy=async function(req,res){
  try{
    let post=await Post.findById(req.params.id);
    if(post.user==req.user.id){
     post.remove();
       // used for delete multiple documents 
      await Comment.deleteMany({ post:req.params.id});
      if(req.xhr){
        return res.status(200).json({
          data:{
            post_id:req.params.id
          },message:"post deleted"
        })
      }
      req.flash('success','post and associated comments deleted');
       return res.redirect('back');
      }
      else{
        req.flash('error','you can not delete post')
        return res.redirect('back');
      }
  } catch(err){
    // console.log('Error',err);
    req.flash('error',err);
    return res.redirect('back');
     
    }
  
  }
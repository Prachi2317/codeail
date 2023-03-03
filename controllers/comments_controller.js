const Comment=require('../models/comment');
const Post=require('../models/post');
module.exports.create=  function(req,res){
 
  
   Post.findById(req.body.post, function(err,post){
    if(post){
          Comment.create({
            content:req.body.content,
            post:req.body.post,
            user:req.user._id

        },function(err,comment){
          
          
          
          //handle error
          // it automatically find the id of comment and push that in Post.comment
          post.comments.push(comment);
          // whenever i am updating anything we need to save this so after that it is save permanetly in db
          post.save();
          
          res.redirect('/');
        });
    }
 });
}

module.exports.destroy=function(req,res){
  // req.params.id contains the id of comment which suppossed to be deleted and which we set in home.ejs in delete button href
  Comment.findById(req.params.id,function(err,comment){
   if(comment.user==req.user.id){
    let id=comment.id;
    let postId=comment.post;
      comment.remove();
      //$ pull is the inbuilt function which pulls out this id(req.params.id ) from comments 
      Post.findByIdAndUpdate(postId,{$pull:{comments:req.params.id}},function(err,post){
        return res.redirect('back');
      })
   }
   else{
    return res.redirect('back');
   }
  });
}
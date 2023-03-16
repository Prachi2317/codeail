const Post=require('../../../models/post');
const Comment=require('../../../models/comment');
module.exports.index= async function(req,res){
  console.log("p")
    let posts=await Post.find({}).sort('-createdAt').populate('user').populate({
        path:'comments',
        populate:{
          path:'user'
        }
      });
     return res.status(200).json({
        message:"list of posts",
        posts:posts
     });
}
module.exports.destroy=async function(req,res){
  console.log(req.params.id);
    try{
      let post=await Post.findById(req.params.id);
      console.log(post);
      if(post.user==req.user.id){
        post.remove();
        // used for delete multiple documents 
       await Comment.deleteMany({ post:req.params.id});
       
       
        return res.json(200,{
           message:"Post and associated comment deleted sucessfully"
        });
      
      }
      else{
        return res.json(401,{
          message:"you can not not delete this post"
        })
      }
     
       
    } catch(err){
      return res.json(500,{
      message:"internal server error"
      });
       
      }
    
    }
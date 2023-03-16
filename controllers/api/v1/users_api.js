const User=require('../../../models/user');
const jwt=require('jsonwebtoken');
module.exports.createSession= async function(req,res){
   
    try{
        let user=await User.findOne({email:req.body.email});
        if(!user|| user.password!=req.body.password){
            return res.json(422,{
                message:'invalid username or password'})

        }
       return res.json(200,{
        message:'sign in sucessful ,here is your token,please keep it safe',
         // token expires in 10 secs and token created consists three things header,payload and signature
         // we are encrypted the token using key (codeail)
         data:{
          token:jwt.sign(user.toJSON(),'codeial',{expiresIn:'100000'})
      }
       })
    } catch(err){
      console.log('*****',err);
      return res.json(500,{
        message:"Internal server error"
      })
    }
     
  }

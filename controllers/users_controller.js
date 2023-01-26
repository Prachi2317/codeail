module.exports.profile= function(req,res){
 console.log(req);
  return res.render('user_profile',{
    title:"userProfile"
  });
}
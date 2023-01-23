module.exports.profile= function(req,res){
 console.log(req);
  return res.end('<h1>User profile<h1>');
}
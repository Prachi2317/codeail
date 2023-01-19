// export the controller func so that It can be accessible in the project , routes can use it
module.exports.home= function(req,res){
    return res.end('<h1>Express is up </h1>')
}
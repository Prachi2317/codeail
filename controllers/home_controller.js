// export the controller func so that It can be accessible in the project , routes can use it
module.exports.home= function(req,res){
    //cookie goes with every request you made
    console.log(req.cookies);
    //you can change the value of cookie through response and see the chnage in browser.
    // cookie sent through requests and comes back through respnse unless it is change at the server or browser
    res.cookie('user_id',25)
    return res.render('home',{
        title:"Home"
    });
}
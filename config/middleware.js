// it set the flsh msg in the response
module.exports.setFlash=function(req,res,next){
// setting flash to the locals of the response
    res.locals.flash={
        'success':req.flash('success'),
        'error':req.flash('error')
    }
    // next() is imp cuz it sets the flash msg in resonse for the next req comming from browser
    next();
}
const mongoose=require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/codeail_devlopment');

// setting up the connection with database
const db=mongoose.connection;
// if there is an error it ,console.error display console.log like an error
db.on('error',console.error.bind(console,"error connecting to momgodb"));
db.once('open',function(){
    console.log('connected to database:: Mongodb');

});

// to make this file useable I need to export it
module.exports=db;
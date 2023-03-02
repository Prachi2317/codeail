const express= require('express');
const cookieParser=require('cookie-parser');
const app= express();
const port=8000;
// we have to reuire and use this express layout before the router 
const expressLayouts=require('express-ejs-layouts');
// when I requiring mongoose.js in index.js then this will run the code that is in mongoose.js
const db=require('./config/mongoose');
// used for session cookie
const session=require('express-session');
const passport=require('passport');
const passportLocal=require('./config/passport-local-strategy');
const MongoStore=require('connect-mongo');
const sass = require('sass');



// app.use(express.urlencoded);
// for reading data through post request
app.use(express.urlencoded({
    extended: true
  }));
// tell our app to use cookieParser
  app.use(cookieParser());
app.use(expressLayouts);
app.use(express.static('./assets'));
//extract style and scripts from subpages into the layout
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);

// set up the view engine
app.set('view engine','ejs');
// we are using ./ beacuse both are in same level our index.js and views folder . you can do it without using ./
app.set('views','./views');

// after views setting we need
// mongo store is used to store the session cookie in the db
app.use(session({
  name:'codeail',
  // to do change the secret before deployment in production mode
   secret:'blahsomething',
   saveUninitialized:false,
   resave:false,
   cookie:{
    maxAge:(1000*60*100)
   },
   store: MongoStore.create({
     mongoUrl:'mongodb://127.0.0.1:27017/codeail_devlopment',
    autoRemove:'disabled'
   }, function(err){
    console.log(err || 'connect-mongodb setup ok');
   })
}));
//you need to tell to app to use passport
app.use(passport.initialize());
app.use(passport.session());
// when the app is intialized passport is also getting intialized and setAuthenticatedUser function called automatically cuz it is middleawre and they get called automatically
// this function checked whether the session cookie is present or not
app.use(passport.setAuthenticatedUser);
// use express router

app.use('/',require('./routes'));


app.listen(port, function(err){
    if(err){
        console.log(`Error in running the server: ${err}`);
    }
    console.log(`server is running on port: ${port}`);
})
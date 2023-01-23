const express= require('express');
const app= express();
const port=8000;
// use express router

app.use('/',require('./routes'));
// set up the view engine
app.set('view engine','ejs');
// we are using ./ beacuse both are in same level our index.js and views folder . you can do it without using ./
app.set('views','./views');
app.listen(port, function(err){
    if(err){
        console.log(`Error in running the server: ${err}`);
    }
    console.log(`server is running on port: ${port}`);
})
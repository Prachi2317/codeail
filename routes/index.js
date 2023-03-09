// every time when I aquiring the express.It will not create the new instance of express it just pass the existing one
const express=require('express');
const router=express.Router();
const homeController=require('../controllers/home_controller');

// just for checking is our router index.js file is vailable in entry file ie index.js
console.log('router loaded');
// It will call the home function joki home_controller.js file mein h
router.get('/',homeController.home);
// if there is any other route after localhost:8000/users...... is redirect to users.js
router.use('/users',require('./users'));
// we have import the posts.js in in this file
router.use('/posts',require('./posts'));
router.use('/comments',require('./comments'));
router.use('/api',require('./api'));
// we are exporting this so it is available to index.js i.e our entry point file
module.exports=router;  

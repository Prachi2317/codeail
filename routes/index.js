// every time when I aquiring the express.It will not create the new instance of express it just pass the existing one
const express=require('express');
const router=express.Router();
const homeController=require('../controllers/home_controller');

// just for checking is our router index.js file is vailable in entry file ie index.js
console.log('router loaded');
// It will call the home function joki home_controller.js file mein h
router.get('/',homeController.home);
// we are exporting this so it is available to index.js i.e our entry point file
module.exports=router;

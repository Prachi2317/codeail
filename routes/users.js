const express= require('express');
const router=express.Router();
 const usersController=require('../controllers/users_controller');
 router.get('/profile',usersController.profile);
 console.log('router loaded 2');

module.exports=router;
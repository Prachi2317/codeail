const express= require('express');
const router=express.Router();
const postsController=require('../controllers/post_controller');
const passport=require('passport');
// we apply a check if the user is not authenticated that user can not create post
router.post('/create',passport.checkAuthentication,postsController.create);
module.exports=router;
const express= require('express');
const router=express.Router();
const passport=require('passport');
 const usersController=require('../controllers/users_controller');
 // user can not access the profile page until user is signed in or authenticated
 router.get('/profile/:id',passport.checkAuthentication,usersController.profile);
 console.log('router loaded 2');
 router.get('/sign-up',usersController.signUp);
 router.get('/sign-in',usersController.signIn);
 router.post('/create',usersController.create);
 //use passport as a middleware to authenticate
 // when this req goes first it is authenticate the user if authenticate then  it calls the function createSession otherwise redirect to sign-in page
 router.post('/create-session',passport.authenticate(
    'local',
    {failureRedirect:'/users/sign-in'},
 ),usersController.createSession);
 router.get('/sign-out',usersController.destroySession);

module.exports=router;
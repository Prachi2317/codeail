const express= require('express');
const router=express.Router();
const passport=require('passport');
const postApi=require('../../../controllers/api/v1/posts_api');
router.get('/',postApi.index);
// this is the autnentication check over passport
// I do not want session cookie to be generated so I put session cookie as false
router.delete('/:id',passport.authenticate('jwt',{session:false}),postApi.destroy);
module.exports=router;
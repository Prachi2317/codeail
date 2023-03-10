const express= require('express');
const router=express.Router();
const postApi=require('../../../controllers/api/v1/users_api');
router.post('/create-session',postApi.createSession);
module.exports=router;
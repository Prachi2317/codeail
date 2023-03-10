// import mongoose
const mongoose= require('mongoose');
// we are importing multer in user multer bcuz we are importing multer for user now
const multer=require('multer');
const path=require('path');
const AVATAR_PATH=path.join('/uploads/users/avatars')
const userSchema=new mongoose.Schema({
 email:{
    type:String,
    required:true,
    unique:true
 },
 password:{
    type:String,
    required:true

 },
 name:{
    type:String,
    required:true
 },
 avatar:{
   type:String
 }

},{
    timestamps:true
});
let storage = multer.diskStorage({
  // there is req and file from req and callback function.for call back first argument is null and other is path where the file is stored
   destination: function (req, file, cb) {
     cb(null, path.join(__dirname,'..',AVATAR_PATH));
   },
   filename: function (req, file, cb) {
     //const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
     cb(null, file.fieldname + '-' + Date.now());
   }
 });
 //static function
 //.single means we aew sending just one file...we can send multiple files as well
 userSchema.statics.uploadedAvatar=multer({storage:storage}).single('avatar');
 userSchema.statics.avatarPath=AVATAR_PATH;
 const upload = multer({ storage: storage })
const User=mongoose.model('User',userSchema);
module.exports=User;
const moongoose=require('moongoose');
const postSchema = new moongoose.Schema({
    content:{
        tyep:String,
        required:true
    },
    user:{
        type:moongoose.Schema.Types.objectId,
        ref:'user'

    }
    },{
        timestamps:true
    });

    const Post=moongoose.model('post',postSchema);
    module.exports=Post;
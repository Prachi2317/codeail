{    // method to submit the form data for new post using AJAX
    let createPost=function(){
        let newPostForm=$('#new-post-form');
        newPostForm.submit(function(e){
               e.preventDefault();
               $.ajax({
                type:'post',
                url:'/posts/create',
                data:newPostForm.serialize(),
                success:function(data){
                    // console.log(data.data.post);
                let newPost=newPostDom(data.data.post);
                // prepend means putting it in the first position
                $('#posts-list-conatainer>ul').prepend(newPost);
                deletePost($(' .delete-post-button',newPost));
                },
                error:function(error){
                console.log(error.responseText);
                }
               });
        });
    }
    // method to create a post in dom
    let newPostDom=function(post){
      return $(`<li id="post-${post._id}">
      <p>
          
          
        
          <small>
              <a class="delete-post-button" href="/posts/destroy/${post._id}">Delete</a>
          </small>
          
      ${post.content}<br>
      <small>${post.user.name }</small>
      </p>
      <diV class="post-comments">
          
              <form action="/comments/create" method="post">
                 <input type="text" name="content" placeholder="Type Here To add Comments" required>
                 <input type="hidden" name="post" value="${post._id}">
                 <input type="submit" value="Add comment">
              </form>
              
              <div class="post-comments-list">
                  <ul id="post-comments-${post._id}">
                      
                  </ul>
              </div>
              
      </diV>
  </li>`)
    }
    // method to delete a post from dom
    let deletePost=function(deleteLink){
        $(deleteLink).click(function(e){
         e.preventDefault();
         $.ajax({
            type:'get',
            url:$(deleteLink).prop('href'),
            success:function(data){
             $(`#post-${data.data.post_id}`).remove();
            },
            error:function(error){
                console.log(error.responseText);
            }

         });
        })
    }
    createPost();
}
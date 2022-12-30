{
    //method to submit the form data for new post using Ajax.
    let createPost = function () {
        let newPostForm = $('#new-post-form');

        newPostForm.submit(function (e) {
            e.preventDefault();

            $.ajax({
                type: 'post',
                url: "/posts/create",
                data: newPostForm.serialize(),
                success: function (data) {
                    let newPost = newPostDom(data.data.post);
                    $('#post-list-container>ul').prepend(newPost)
                }, error: function (error) {
                    console.log(error.responseText);
                }
            });
        });
    };

    //method to create a post in DOM 
    let newPostDom = function (post) {
        return $(`<li id="post-${post._id}">
        <p>
            <!-- ///delete button -->
            <small>
                <a class="delete-post-button" href="/posts/destroy/${post._id}">X</a>
            </small>
            ${post.content}
            <br />
            <small>${post.user.name}</small>
        </p>
        <div class="comment-box">
           
            <form action="/comments/create" method="post">
                <input type="text" name="content" placeholder="Enter your comment here" id="" />
                <br />
                <input type="hidden" name="post" value="${post._id}" id="" />
                <br />
                <button type="submit">Add Comment</button>
            </form>
           
        <div class="comment-list">
          <ul id="post-comments-${post._id}">
           
            </ul>
        </div>
        </div>
    </li>`)
    }




    //method to delete a post from dom.
    let deletePost = function (deleteLink) {
        $(deleteLink).click(function (e) {
            e.preventDefault();

            $.ajax({
                type: 'get',
                url: $(deleteLink).prop('href'),
                success: function (data) {
                    $(`#post-${data.data.post._id}`).remove();
                },
                error: function (err) {
                    console.log(err.responseText)
                }

            })
        })
    }



    createPost();
};


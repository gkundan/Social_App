class CreateComment {
  // constructor is used to initialize the instance of the class whenever a new instance is created
  constructor(postId) {
    this.postId = postId;
    this.postContainer = $(`#post-${postId}`);
    this.newCommentForm = $(`#new-${postId}-comment-form`);
    this.createComment(postId);
    // console.log('rere',this.newCommentForm )
    let self = this;
    // call for all the existing comments
    $(" .delete-comment-btn", this.postContainer).each(function () {
      self.deleteComment($(this));
    });
  }

  createComment(postId) {
    let pSelf = this;
    this.newCommentForm.submit(function (e) {
      e.preventDefault();
      let self = this;

      $.ajax({
        type: "post",
        url: "/comments/create",
        data: $(self).serialize(),
        success: function (data) {
          let newComment = pSelf.newCommentDom(
            data.data.comment,
            data.data.user
          );
          $(`#post-comments-${postId}`).prepend(newComment);
          pSelf.deleteComment($(" .delete-comment-btn", newComment));

          // CHANGE :: enable the functionality of the toggle like btn on the new comment
          // new ToggleLike($(' .toggle-like-btn', newComment));
          new Noty({
            theme: "relax",
            text: "Comment published!",
            type: "success",
            layout: "topRight",
            timeout: 1500,
          }).show();
        },
        error: function (error) {
          console.log(error.responseText);
        },
      });
    });
  }

  newCommentDom(comment, user) {
    // CHANGE :: show the count of zero likes on this comment

    return $(`<li id="list-${comment._id}">
                        <p>
                            
                            <small>
                                <a class="delete-comment-btn" href="/comments/destroy/${comment._id}">X</a>
                            </small>
                            
                            ${comment.content}
                            <br>
                            <small>
                                ${user.name}
                            </small>
                                <br>
                            <small>
                                
                                    <a class="toggle-like-button" data-likes="0" href="/likes/toggle/?id=${post._id}&type=Post">
                                        0 Likes
                                    </a>
                                
                            </small>
                        </p>    

                </li>`);
  }

  deleteComment(deleteLink) {
    console.log("232", $(deleteLink));
    $(deleteLink).click(function (e) {
      e.preventDefault();

      $.ajax({
        type: "get",
        url: $(deleteLink).prop("href"),
        success: function (data) {
          console.log("2323230", data.data.comment_id);
          $(`#list-${data.data.comment_id}`).remove();

          new Noty({
            theme: "relax",
            text: "Comment Deleted",
            type: "success",
            layout: "topRight",
            timeout: 1500,
          }).show();
        },
        error: function (error) {
          console.log(error.responseText);
        },
      });
    });
  }
}

{
  //method to submit the form data for new post using Ajax.
  let createPost = function () {
    let newPostForm = $("#new-post-form");

    newPostForm.submit(function (e) {
      e.preventDefault();

      $.ajax({
        type: "post",
        url: "/posts/create",
        data: newPostForm.serialize(),
        success: function (data) {
          let newPost = newPostDom(data.data.post, data.data.user);
          $("#post-ul").prepend(newPost);
          deletePost($(" .delete-post-button", newPost));
          new CreateComment(data.data.post._id);
          new Noty({
            theme: "relax",
            text: data.message,
            type: "success",
            layout: "topRight",
            timeout: 1500,
          }).show();
        },
        error: function (error) {
          console.log(error.responseText);
        },
      });
    });
  };

  //method to create a post in DOM
  let newPostDom = function (post, user) {
    return $(`<li id="post-${post._id}">
        <p>
            <small>
                <a class="delete-post-button" href="/posts/destroy/${post._id}">X</a>
            </small>
            ${post.content}
            <br />
            <small>${user.name}</small>
        </p>
        <div class="comment-box">
            <form action="/comments/create" id="new-${post._id}-comment-form" method="post">
                <input type="text" name="content" placeholder="Enter your comment here"  />
                <br />
                <input type="hidden" name="post" value="${post._id}"  />
                <br />
                <button type="submit">Add Comment</button>
            </form>
            <div class="comment-list">
                <ul id="post-comments-${post._id}">
                
                </ul>
            </div>
        </div>
    </li>`);
  };

  //method to delete a post from dom.
  let deletePost = function (deleteLink) {
    $(deleteLink).click(function (e) {
      e.preventDefault();

      $.ajax({
        type: "get",
        url: $(deleteLink).prop("href"),
        success: function (data) {
          // console.log(data);
          $(`#post-${data.data.post_id}`).remove();
          new Noty({
            theme: "relax",
            text: data.message,
            type: "success",
            layout: "topRight",
            timeout: 1500,
          }).show();
        },
        error: function (err) {
          console.log(err.responseText);
        },
      });
    });
  };

  let convertPostToAjax = function () {
    $("#post-ul > li").each(function () {
      deletePost($(" .delete-post-button", $(this)));
      let postID = $(this).prop("id").split("-")[1];
      new CreateComment(postID);
    });
  };

  createPost();
  convertPostToAjax();
}

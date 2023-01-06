class CreateComment{

    // constructor is used to initialize the instance of the class whenever a new instance is created
    constructor(postId){
        this.postId = postId;
        this.postContainer = $(`#post-${postId}`);
        this.newCommentForm = $(`#new-${postId}-comment-form`);
        this.createComment(postId);
        console.log('rere',this.newCommentForm )
        let self = this;
        // call for all the existing comments
        $(' .delete-comment-btn', this.postContainer).each(function(){
            self.deleteComment($(this));
        });
    }


    createComment(postId){
        let pSelf = this;
        this.newCommentForm.submit(function(e){
            e.preventDefault();
            let self = this;

            $.ajax({
                type: 'post',
                url: '/comments/create',
                data: $(self).serialize(),
                success: function(data){
                    let newComment = pSelf.newCommentDom(data.data.comment, data.data.user);
                    $(`#post-comments-${postId}`).prepend(newComment);
                    pSelf.deleteComment($(' .delete-comment-btn', newComment));

                    // CHANGE :: enable the functionality of the toggle like btn on the new comment
                    // new ToggleLike($(' .toggle-like-btn', newComment));
                    new Noty({
                        theme: 'relax',
                        text: "Comment published!",
                        type: 'success',
                        layout: 'topRight',
                        timeout: 1500
                        
                    }).show();

                }, error: function(error){
                    console.log(error.responseText);
                }
            });


        })
    }


    newCommentDom(comment,user){
        // CHANGE :: show the count of zero likes on this comment

        return $(`<li id="li-${ comment._id }">
                        <p>
                            
                            <small>
                                <a class="delete-comment-btn" href="/comments/destroy/${comment._id}">X</a>
                            </small>
                            
                            ${comment.content}
                            <br>
                            <small>
                                ${user.name}
                            </small>

                        </p>    

                </li>`)
    }


    deleteComment(deleteLink){
        console.log('232', $(deleteLink))
        $(deleteLink).click(function(e){
            e.preventDefault();

            $.ajax({
                type: 'get',
                url: $(deleteLink).prop('href'),
                success: function(data){
                    $(`#list-${data.data.comment_id}`).remove();

                    new Noty({
                        theme: 'relax',
                        text: "Comment Deleted",
                        type: 'success',
                        layout: 'topRight',
                        timeout: 1500
                        
                    }).show();
                },error: function(error){
                    console.log(error.responseText);
                }
            });

        })
    }
}

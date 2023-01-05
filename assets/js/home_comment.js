// //comment createsign
// {
//     /// //method to submit the form data for new post using Ajax.
//     let createComment = function () {
//         let newCommentForm = $('#new-comment-form');

//         newCommentForm.submit(function (e) {
//             e.preventDefault();
//             //ajax submission
//             $.ajax({
//                 type: 'post',
//                 url: "/comments/create",
//                 data: newCommentForm.serialize(),
//                 success: function (data) {
//                     console.log(data);
//                     let newComment = newCommentDom(data.data.comment, data.data.user
//                     );
//                     $('#comment-container>ul').prepend(newComment);
//                     deleteComment($(' .delete-comment-btn', newComment))
//                     new Noty({
//                         theme: 'relax',
//                         text: "New Comment Added!",
//                         type: 'success',
//                         layout: "topRight",
//                         timeout: 1500

//                     }).show();
//                 }, error: function (error) {
//                     console.log(error.responseText);
//                 }
//             })
//         })
//     }

//     //method to create comment in dom
//     let newCommentDom = function (comment, user) {
//         return $(`<li id="list-${comment._id}">
//          <p>             
//             <small>
//                 <a class="delete-comment-btn" href="/comments/destroy/${comment._id}">X</a>
//             </small>
//                 ${comment.content}>
//             <br />
//             <small>${user.name} </small>
//         </p>
//     </li> `)

//     };

//     //method to delete a comment .
//     let deleteComment = function (deleteComment) {
//         $(deleteComment).click(function (e) {
//             e.preventDefault();
//             console.log("Ajax Clicked from delete btn");

//             $.ajax({
//                 type: 'get',
//                 url: $(deleteComment).prop('href'),
//                 success: function (data) {
//                     console.log(data);
//                     $(`#list-${data.comment_id}`).remove();
//                     new Noty({
//                         theme: 'relax',
//                         text: data.message,
//                         type: 'success',
//                         layout: "topRight",
//                         timeout: 1500

//                     }).show();
//                 }, error: function (err) {
//                     console.log(err.responseText);
//                 }
//             })
//         })
//     }




//     createComment();
// }

class PostComments{
    // constructor is used to initialize the instance of the class whenever a new instance is created
    constructor(postId){
        this.postId = postId;
        this.postContainer = $(`#post-${post.id}`);
        this.newCommentForm = $(`#post-comments-${post._id}`);

        this.createComment(postId);

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
                    let newComment = pSelf.newCommentDom(data.data.comment);
                    $(`#post-comments-${post._id}`).prepend(newComment);
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


        });
    }


    newCommentDom(comment){
        // CHANGE :: show the count of zero likes on this comment

        return $(`<li id="li-${ comment._id }">
                        <p>
                            
                            <small>
                                <a class="delete-comment-btn" href="/comments/destroy/${comment._id}">X</a>
                            </small>
                            
                            ${comment.content}
                            <br>
                            <small>
                                ${comment.user.name}
                            </small>

                        </p>    

                </li>`);
    }


    deleteComment(deleteLink){
        $(deleteLink).click(function(e){
            e.preventDefault();

            $.ajax({
                type: 'get',
                url: $(deleteLink).prop('href'),
                success: function(data){
                    $(`#li-${data.data.comment_id}`).remove();

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

        });
    }
}


//comment createsign
{
    /// //method to submit the form data for new post using Ajax.
    let createComment = function () {
        let newCommentForm = $('#new-comment-form');

        newCommentForm.submit(function (e) {
            e.preventDefault();

            //ajax submission
            $.ajax({
                type: 'post',
                url: "/comments/create",
                data: newCommentForm.serialize(),
                success: function (data) {
                    let newComment = newCommentDom(data.data.comment);
                    $('#comment-container>ul').prepend(newComment); 
                }, error: function (error) {
                    console.log(error.responseText);
                }
            })
        })
    }

    //method to create comment in dom
    let newCommentDom = function (comment) {
         return $(`<li id="list-${comment._id }">
         <p>
             
             <small>
                 <a class="delete-post-button" href="/comments/destroy/${comment.id}">X</a>
             </small>
          
                     ${comment.content}>
             <br />
             <small> ${comment.user.name }> </small>
     
         </p>
     </li> `)
    
    }





    createComment();
}





///

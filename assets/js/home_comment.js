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
                    console.log(data);
                    let newComment = newCommentDom(data.data.comment
                        );
                    $('#comment-container>ul').prepend(newComment);
                    deleteComment($('.delete-comment-btn', newComment))
                    new Noty({
                        theme: 'relax',
                        text: "New Comment Added!",
                        type: 'success',
                        layout: "topRight",
                        timeout: 1500

                    }).show();
                }, error: function (error) {
                    console.log(error.responseText);
                }
            })
        })
    }

    //method to create comment in dom
    let newCommentDom = function (comment) {
        return $(`<li id="list-${comment._id}">
         <p>             
            <small>
                <a class="delete-comment-btn" href="/comments/destroy/${comment._id}">X</a>
            </small>
                ${comment.content}>
            <br />
            <small>${comment.user.name} </small>
        </p>
    </li> `)

    };

    //method to delete a comment .
    let deleteComment = function (deleteLink) {
        $(deleteLink).click(function (e) {
            e.preventDefault();
            console.log("Ajax Clicked");
            $.ajax({
                type: 'get',
                url: $(deleteLink).prop('href'),
                success: function (data) {
                    console.log(data);
               
                },
                error: function (err) {
                    console.log(err.responseText)
                }

            })
        })
    }




    createComment();
}





///

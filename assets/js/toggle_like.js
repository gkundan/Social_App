//:: create a class to toggle like when a link is clicked
class ToggleLike {
  constructor(toggleElement) {
    this.toggler = toggleElement;
    this.toggleLike();
  }

  toggleLike() {
    $(this.toggler).click(function (e) {
      e.preventDefault();
      let self = this;

      // this is a new way of writing ajax which you might've studied, it looks like the same as promises
      $.ajax({
        type: "POST",
        url: $(self).attr("href"),
      })
        .done(function (data) {
          let likeCount = parseInt($(self).attr("data-likes"));
          console.log(likeCount);

          if (data.data.deleted == true) {
            likeCount -= 1;
          } else {
            likeCount += 1;
          }

          $(self).attr("data-likes", likeCount);
          $(self).html(`${likeCount} Likes`);
        })
        .fail(function (errData) {
          console.log(`error in completing the request`);
        });
    });
  }
}

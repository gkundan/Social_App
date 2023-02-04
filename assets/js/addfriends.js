$(document).ready(function () {
  $(".follow-button").click(function () {
    const type = $(this).data("type");
    const followerId = $(this).data("follower-id");
    const followingId = $(this).data("following-id");

    $.ajax({
      type: "POST",
      url: "/follow",
      data: { type, followerId, followingId },
      success: function (data) {
        // Update the follower count on the profile page
        const followingUsers = data.followingUsers;
      },
      error: function (error) {
        console.error(error);
      },
    });
  });
});

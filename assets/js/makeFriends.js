///
console.log("make friends");

//
const followBtn = document.getElementById("followBtn");

followBtn.addEventListener("click", () => {
  const followerId = followBtn.getAttribute("data-follower-id");
  const followingId = followBtn.getAttribute("data-following-id");

  ///

  console.log("the user whose going to follow", followerId);
  console.log("the user whose being followed", followingId);

  const request = new XMLHttpRequest();
  request.open("POST", "/follow");
  request.setRequestHeader("Content-Type", "application/json");
  request.onload = () => {
    const response = JSON.parse(request.responseText);
    // Update the follower's information on the profile page
    $("#follower-count").text(response.followerCount);
    if (type === "follow") {
      $(".follow-button").text("Unfollow");
      $(".follow-button").data("type", "unfollow");
    } else {
      $(".follow-button").text("Follow");
      $(".follow-button").data("type", "follow");
    }
    // ...
  };
  request.send(
    JSON.stringify({
      followerId: followerId,
      followingId: followingId,
    })
  );
});

//create a controller and send on route ans use as request route..
module.exports.home = function (req, res) {
  return res.render("home", {
    title: "Home",
  });
};

//create a controller and send on route ans use as request route..
module.exports.home = function (req, res) {
  console.log(req.cookies);
  return res.render("home", {
    title: "Home",
  });
};

const User = require("../models/user");
const randomString = require("randomstring");
const jwt = require("jsonwebtoken");
const transporter = require("../config/nodemailer");
const nodeMailer = require("../config/nodemailer");

const JWT_SECRET = randomString.generate();
//render get email for reset password
module.exports.getMail = (req, res) => {
  return res.render("_forget-password", {
    title: "Codeial | Forget Password.",
  });
};

module.exports.forgetPassword = async (req, res) => {
  try {
    const email = req.body.email;
    const userData = await User.findOne({ email: email });
    if (userData) {
      const secret = JWT_SECRET;
      const payload = {
        email: userData.email,
        id: userData._id,
      };
      const token = jwt.sign(payload, secret, { expiresIn: "15m" });

      const link = `http://localhost:8000/forget-password/reset-password/${userData._id}/${token}`;
      // console.log(" reset links", link);
      //send link as  mail
      nodeMailer.transporter.sendMail(
        {
          from: "codeial@mail.com",
          to: userData.email,
          subject: "Your Password Reset eMail!",
          html: `<p>Click <a href=${link}>here</a> to reset your password</p>`,
        },
        (err, info) => {
          if (err) {
            console.log("Error in sending mail", err);
            return;
          }

          console.log("Message sent", info);

          return;
        }
      );
      req.flash("success", "The Mail us delivered in Your Inbox!");
      res.redirect("back");
    } else {
      res.send("Invalid User eMail");
    }
  } catch (error) {
    console.log("Error", error.message);
  }
};

///reset password
module.exports.resetPassword = async (req, res) => {
  // console.log(req.body);

  try {
    const { id, token } = req.params;
    //find the user
    let tokenData = await User.findOne({ _id: id });
    if (tokenData) {
      res.render("_resetPassword", {
        title: "Reset Password",
        user_id: tokenData._id,
      });
    } else {
      res.status(404, { message: "Invalid Activity" });
    }
  } catch (error) {
    console.log("Error", error.message);
  }
};

//update password
module.exports.updatePassword = async (req, res) => {
  try {
    const password = req.body.password;
    const user_id = req.body.user_id;
    console.log("User id", user_id);
    //update password
    const updatedData = await User.findByIdAndUpdate(
      { _id: user_id },
      { $set: { password: password, token: "" } }
    );
    console.log("new Password", updatedData);
    req.flash("success", "Password has been update sign-in now. !");
    res.redirect("/users/sign-in");
  } catch (error) {
    console.log("Error", error.message);
  }
};

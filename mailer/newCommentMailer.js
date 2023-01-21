const nodeMailer = require("../config/nodemailer");

// this is another way of exporting a method
exports.newComment = (comment) => {
  console.log("from mailer", comment);
  //.. render mail template //
  let HtmlString = nodeMailer.renderTemplate(
    { comment: comment },
    "/comment/new_comment.ejs"
  );

  nodeMailer.transporter.sendMail(
    {
      from: "codeial@mail.com",
      to: comment.user.email,
      subject: "New Comment Published!",
      html: HtmlString,
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
};

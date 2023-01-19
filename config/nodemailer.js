const nodemailer = require("nodemailer");
const ejs = require("ejs");
const path = require("path");

//define the transport for nodemailer{the person whose sending the mails..}
let transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: "codiealsocial@gmail.com",
    pass: "nnfmvkkcypuundjk",
  },
});

//template for mail{the mail which is show in mailbox}
let renderTemplate = (data, relativePath) => {
  let mailHTML;
  ejs.renderFile(
    path.join(__dirname, "../views/mailers", relativePath),
    data,
    function (err, template) {
      if (err) {
        console.log("error in rendering template", err);
        return;
      }

      mailHTML = template;
    }
  );

  return mailHTML;
};

module.exports = {
  transporter: transporter,
  renderTemplate: renderTemplate,
};

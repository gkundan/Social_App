const queue = require("../config/kue");

const commentMailer = require("../mailer/newCommentMailer");

//
queue.process("emails", function (job, done) {
  console.log("Email worker is processing a job", job.data);
  commentMailer.newComment(job.data);
  done();
});

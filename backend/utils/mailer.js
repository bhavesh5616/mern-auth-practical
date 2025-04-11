const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS
  }
});

exports.sendVerificationMail = async (email, code) => {
  await transporter.sendMail({
    from: process.env.MAIL_USER,
    to: email,
    subject: 'Verify your email',
    text: `Your verification code is: ${code}`
  });
};


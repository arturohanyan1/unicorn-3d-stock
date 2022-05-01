const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport(
  {
    host: 'smtp.mail.ru',
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: '3dstockunicorn@mail.ru',
      pass: 'byErv5TzkJtdPRFzUN5j',
    },
  },
  {
    from: 'Mailer Test <3dstockunicorn@mail.ru>',
  },
);

const mailer = (message) => {
  transporter.sendMail(message, (err, info) => {
    if (err) return console.log(err);
    console.log('Email sent: ', info);
  });
};

module.exports = mailer;

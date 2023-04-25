import nodemailer from 'nodemailer';

let transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER, // generated ethereal user
    pass: process.env.SMTP_PASSWORD, // generated ethereal password
  },
});

// send mail with defined transport object
export function send({email, subject, html}) {
  return transporter.sendMail({
    from: '"Chuck Norris" <kotlotorg.com.ua@gmail.com>', // sender address
    to: email, // list of receivers
    subject: subject, // Subject line
    text: '', // plain text body
    html: html, // html body
  });
}

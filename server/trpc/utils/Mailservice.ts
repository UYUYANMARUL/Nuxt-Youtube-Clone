const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp-mail.outlook.com",
  port: 587,
  secure: true,
  auth: {
    // TODO: replace `user` and `pass` values from <https://forwardemail.net>
    user: "cislimendil@hotmail.com",
    pass: "Ata5923-",
  },
});

interface SendMailObject {
  from: String;
  to: String | String[];
  subject: String;
  text: String;
  html: String;
}

interface SendMultipleMailObject {}

export function sendMail(mailObjet: SendMailObject) {
  if (typeof mailObjet.to == object)
    const info = await transporter.sendMail({
      from: '"Fred Foo 👻" <foo@example.com>', // sender address
      to: "bar@example.com, baz@example.com", // list of receivers
      subject: "Hello ✔", // Subject line
      text: "Hello world?", // plain text body
      html: "<b>Hello world?</b>", // html body
    });
}

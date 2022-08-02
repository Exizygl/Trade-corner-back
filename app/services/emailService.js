const Util = require("../utils/processing");
const jwt = require("jsonwebtoken");
const CryptoJS = require("crypto-js");
const nodemailer = require("nodemailer");

const sendEmail = (email, key, user, subject, bodyMessage) => {

  if (Util.emptyString(email))
    throw "Could not send mail: 'email' parameter is missing";
  if (Util.emptyString(key))
    throw "Could not send mail: 'key' parameter is missing";

  const mailTransporter = nodemailer.createTransport({
    service: "gmail",
    secure: false,
    tls: { rejectUnauthorized: false },
    auth: {
      user: "incubateurnumerique@gmail.com",
      pass: "mtrnkbwzpdvrmknz",
    },
  });

  const mailOptions = {
    from: process.env.SENDER_EMAIL_ADDRESS,
    to: email,
    subject: subject,
    html: bodyMessage,
  };
  mailTransporter.sendMail(mailOptions, function (err, data) {
    if (err) {
      console.log("Error Occurs");
      console.log(err);
      throw "Email no send";
    } else {
      console.log("Email sent successfully");
    }
  });
};

const sendEmailForConfirmation = (email, key, user) => {
  const emailCrypt = CryptoJS.AES.encrypt(
    email,
    process.env.MAILING_SERVICE_CLIENT_SECRET
  ).toString();
  const subject = "verify your email";
  const bodyMessage = `<h2> ${user.pseudo}! Merci pour l'inscription sur le site e-commerce </h2>
    <h4> Veuillez cliquer sur le lien ci dessous</h4>
    <a href="http://localhost:3000/confirm-register/${emailCrypt}"> Activez votre compte </a>`;

  sendEmail(email, key, user, subject, bodyMessage);
};

const sendEmailAfterDeleteAdmin = (email, key, user) => {
  const emailCrypt = CryptoJS.AES.encrypt(
    email,
    process.env.MAILING_SERVICE_CLIENT_SECRET
  ).toString();
  const subject = "Supression de votre compte e-commerce";
  const bodyMessage = `<h2> ${user.pseudo} ! Votre compte sur le site e-commerce a été supprimé</h2>
    <h4> Un administrateur a supprimé votre compte sur le site e-commerce. Vos données personnelles ont été supprimées et votre compte cloturé.
    Si vous avez des questions, vous pouvez nous contacter via le formulaire de contact</h4>
    <a href=""> lien vers la page contact </a>`;

  sendEmail(email, key, user, subject, bodyMessage);
};

const sendEmailForPasswordRecovery = (email, key, user) => {
  const emailCrypt = CryptoJS.AES.encrypt(
    email,
    process.env.MAILING_SERVICE_CLIENT_SECRET
  ).toString();
  const subject = "Changement de mot de passe";
  const bodyMessage = `<h2> Demande de changement de mot de passe sur le site e-commerce </h2>
    <h4> Veuillez cliquer sur le lien ci dessous</h4>
    <a href="http://localhost:3000/password-change/${emailCrypt}"> Modifiez votre mot de passe </a>`;

  sendEmail(email, key, user, subject, bodyMessage);
};


const decryptEmail = (emailCrypt) => {
  const emailBytes = CryptoJS.AES.decrypt(
    emailCrypt,
    process.env.MAILING_SERVICE_CLIENT_SECRET
  );
  return emailBytes.toString(CryptoJS.enc.Utf8);
};

module.exports = {
  sendEmail,
  sendEmailForConfirmation,
  sendEmailAfterDeleteAdmin,
  sendEmailForPasswordRecovery,
  decryptEmail,
};

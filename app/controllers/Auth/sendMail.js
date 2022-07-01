const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const { OAuth2 } = google.auth;
const OAUTH_PLAYGROUND = "https://developers.google.com/oauthplayground";

const {
  MAILING_SERVICE_CLIENT_ID,
  MAILING_SERVICE_CLIENT_SECRET,
  MAILING_SERVICE_REFRESH_TOKEN,
  SENDER_EMAIL_ADDRESS,
} = process.env;

const oauth2Client = new OAuth2(
  MAILING_SERVICE_CLIENT_ID,
  MAILING_SERVICE_CLIENT_SECRET,
  MAILING_SERVICE_REFRESH_TOKEN,

  OAUTH_PLAYGROUND
);

const sendEmail = (to, url, txt) => {
  const smtpTransport = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "incubateurnumerique@gmail.com",
      pass: "mtrnkbwzpdvrmknz",
    },
  });

  const mailOptions = {
    from: SENDER_EMAIL_ADDRESS,
    to: to,
    subject: "E-commerce",
    html: `
        <div>
            <h2>Bienvenue sur E-commerce SHOP</h2>
            <p>Toutes nos félicitations! Vous êtes presque prêt à commencer à utiliser E-Commerce ✮ SHOP.
            Cliquez simplement sur le bouton ci-dessous pour valider votre adresse e-mail.
            </p>
        
        <a href=${url} style="background: crimson; text-decoration: none; color: white; padding: 10px 20px; margin: 10px 0; display: inline-block;">${txt}</a>

        <p>Si le bouton ne fonctionne pas pour une raison quelconque, vous pouvez également cliquer sur le lien ci-dessous :</p>

        <div>${url}</div>
        </div>
    `,
  };

  smtpTransport.sendMail(mailOptions, (err, infor) => {
    if (err) return err;
    return infor;
  });
};

module.exports = sendEmail;

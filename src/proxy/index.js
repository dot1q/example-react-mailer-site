// include dependencies
import express from 'express';
import proxy from 'http-proxy-middleware';
import fallback from 'express-history-api-fallback';
import path from 'path';
import nodemailer from 'nodemailer';
import bodyparser from 'body-parser';

const app = express();
app.use(bodyparser.json());

let fmsBackendUrl = 'https://prod.example.com/public-api/';

if (process.env.NODE_ENV !== 'production') {
  console.log('**** Development mode enabled ****');
  fmsBackendUrl = 'https://dev.example.com/public-api/';
}

const mailConnection = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'mail.example.org',
  port: process.env.SMTP_PORT || 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER || 'relay@example.org',
    pass: process.env.SMTP_PASS || 'smtpRelayPass',
  },
});

// This is a fake api example, which could be used if you have a backend service
// that will handle the posting of the form. Additional form section for redirection information
// One plus to this route, is you can scale your deployment if you get a lot of traffic to another API
app.use('/fakeApi', proxy({
  target: fmsBackendUrl,
  headers: {
    'x-api-key': process.env.API_KEY || 'FAKEAPIKEY',
  },
  pathRewrite: { '^/fakeApi': '' },
  changeOrigin: false,
  secure: false,
}));


app.post('/send-mail', async (req, res) => {
  try {
    await mailConnection.sendMail({
      from: '"Example Team" <noreply@example.org>',
      to: req.body.toaddress,
      subject: req.body.subject,
      text: req.body.text,
      html: req.body.html,
    });
    res.status(200).json({ status: 'success' });
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

app.use('/', express.static(__dirname));
app.use(fallback(path.join(__dirname, 'index.html')));

app.listen(80);

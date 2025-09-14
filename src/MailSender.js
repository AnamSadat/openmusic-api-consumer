import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

class MailSender {
  constructor() {
    this._transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });
  }

  sendEmail(targetEmail, content) {
    console.log('masuk ke mailsender');
    const message = {
      from: 'Openmusic API',
      to: targetEmail,
      subject: 'Ekspor Playlist',
      text: 'Terlampir hasil dari ekspor playlist',
      attachments: [
        {
          filename: 'playlist.json',
          content,
        },
      ],
    };
    console.log('🚀 ~ MailSender ~ sendEmail ~ message:', message);

    return this._transporter.sendMail(message);
  }
}

export default MailSender;

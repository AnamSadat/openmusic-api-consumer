import nodemailer from 'nodemailer';
import config from './utils/config.js';

class MailSender {
  constructor() {
    this._transporter = nodemailer.createTransport({
      host: config.nodemailer.smtp_host,
      port: config.nodemailer.smtp_port,
      auth: {
        user: config.nodemailer.smtp_user,
        pass: config.nodemailer.smtp_password,
      },
    });
  }

  sendEmail(targetEmail, content) {
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

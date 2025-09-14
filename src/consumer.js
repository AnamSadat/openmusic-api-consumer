import dotenv from 'dotenv';
import amqplib from 'amqplib';
import PlaylistService from './PlaylistService.js';
import MailSender from './MailSender.js';
import Listener from './listener.js';

dotenv.config();

const init = async () => {
  const playlistService = new PlaylistService();
  console.log('🚀 ~ init ~ playlistService:');
  const mailSender = new MailSender();
  console.log('🚀 ~ init ~ mailSender:');
  const listener = new Listener(playlistService, mailSender);
  console.log('🚀 ~ init ~ listener:');

  const connection = await amqplib.connect(process.env.RABBITMQ_SERVER);
  console.log('🚀 ~ init ~ connection:');
  const channel = await connection.createChannel();
  console.log('🚀 ~ init ~ channel:');

  await channel.assertQueue('export:playlists', {
    durable: true,
  });
  console.log('🚀 ~ init ~ assertQueue:');

  channel.consume('export:playlists', listener.listen, { noAck: true });
  console.log('🚀 ~ init ~ consume:');
};

init();

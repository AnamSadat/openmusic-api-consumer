import amqplib from 'amqplib';
import PlaylistService from './PlaylistService.js';
import MailSender from './MailSender.js';
import Listener from './listener.js';
import config from './utils/config.js';

const init = async () => {
  const playlistService = new PlaylistService();
  const mailSender = new MailSender();
  const listener = new Listener(playlistService, mailSender);

  const connection = await amqplib.connect(config.rabbitMq.server);
  const channel = await connection.createChannel();

  await channel.assertQueue('export:playlists', {
    durable: true,
  });

  channel.consume('export:playlists', listener.listen, { noAck: true });
};

init();

import autoBind from 'auto-bind';

class Listener {
  constructor(playlistService, mailSender) {
    this._playlistService = playlistService;
    this._mailSender = mailSender;

    autoBind(this);
  }

  async listen(message) {
    try {
      console.log('masuk ke lister');
      const { playlistId, targetEmail } = JSON.parse(message.content.toString());
      console.log('🚀 ~ Listener ~ listen ~ targetEmail:', targetEmail);
      console.log('🚀 ~ Listener ~ listen ~ userId:', playlistId);

      const playlists = await this._playlistService.getPlaylists(playlistId);
      const result = await this._mailSender.sendEmail(targetEmail, JSON.stringify(playlists));
      console.log('🚀 ~ Listener ~ listen ~ result:', result);
    } catch (error) {
      console.log('masuk ke error listen');
      console.error('Error: ', error);
      throw new Error(error);
    }
  }
}

export default Listener;

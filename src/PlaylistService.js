import { Pool } from 'pg';

class PlaylistService {
  constructor() {
    this._pool = new Pool();
  }

  async getPlaylists(playlistId) {
    if (!playlistId) throw new Error('User ID is required');

    const query = {
      text: `SELECT playlists.id, playlists.name, users.username,
            songs.id AS song_id, songs.title, songs.performer
      FROM playlists
      JOIN users ON users.id = playlists.owner
      LEFT JOIN playlist_songs ON playlist_songs.playlist_id = playlists.id
      LEFT JOIN songs ON songs.id = playlist_songs.song_id
      WHERE playlists.id = $1
      LIMIT 2`,
      values: [playlistId],
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) throw new Error('Playlist tidak ditemukan');

    const playlist = {
      id: result.rows[0].id,
      name: result.rows[0].name,
      songs: result.rows
        .filter((row) => row.song_id)
        .map((row) => ({
          id: row.song_id,
          title: row.title,
          performer: row.performer,
        })),
    };

    return { playlist };
  }
}

export default PlaylistService;

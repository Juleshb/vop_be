const Song = require('../models/song');
const upload = require('../config/multerConfig');

// Controller actions for songs
exports.uploadSong = (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ message: err });
    }

    if (!req.file) {
      return res.status(400).json({ message: 'No file selected!' });
    }

    try {
      const song = await Song.create({
        title: req.body.title,
        artist: req.body.artist,
        duration: req.body.duration,
        filePath: req.file.path,
        albumId: req.body.albumId || null // Handle optional albumId
      });

      res.status(201).json(song);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
};

exports.getAllSongs = async (req, res) => {
  try {
    const songs = await Song.findAll();
    res.json(songs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getSongById = async (req, res) => {
  try {
    const song = await Song.findByPk(req.params.id);
    if (!song) {
      return res.status(404).json({ message: 'Song not found' });
    }
    res.json(song);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateSong = async (req, res) => {
  try {
    const song = await Song.findByPk(req.params.id);
    if (!song) {
      return res.status(404).json({ message: 'Song not found' });
    }

    song.title = req.body.title || song.title;
    song.artist = req.body.artist || song.artist;
    song.duration = req.body.duration || song.duration;
    song.albumId = req.body.albumId || song.albumId;

    await song.save();
    res.json(song);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteSong = async (req, res) => {
  try {
    const song = await Song.findByPk(req.params.id);
    if (!song) {
      return res.status(404).json({ message: 'Song not found' });
    }

    await song.destroy();
    res.status(204).json({ message: 'Song deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

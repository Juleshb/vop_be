const Album = require('../models/album');
const Song = require('../models/song'); // To include associated songs if needed

// Controller actions for albums
exports.createAlbum = async (req, res) => {
  try {
    const album = await Album.create({
      title: req.body.title,
      artist: req.body.artist,
      releaseDate: req.body.releaseDate,
    });

    res.status(201).json(album);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getAllAlbums = async (req, res) => {
  try {
    const albums = await Album.findAll({
      include: [{ model: Song }] // Include associated songs
    });
    res.json(albums);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getAlbumById = async (req, res) => {
  try {
    const album = await Album.findByPk(req.params.id, {
      include: [{ model: Song }] // Include associated songs
    });
    if (!album) {
      return res.status(404).json({ message: 'Album not found' });
    }
    res.json(album);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateAlbum = async (req, res) => {
  try {
    const album = await Album.findByPk(req.params.id);
    if (!album) {
      return res.status(404).json({ message: 'Album not found' });
    }

    album.title = req.body.title || album.title;
    album.artist = req.body.artist || album.artist;
    album.releaseDate = req.body.releaseDate || album.releaseDate;

    await album.save();
    res.json(album);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteAlbum = async (req, res) => {
  try {
    const album = await Album.findByPk(req.params.id);
    if (!album) {
      return res.status(404).json({ message: 'Album not found' });
    }

    await album.destroy();
    res.status(204).json({ message: 'Album deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

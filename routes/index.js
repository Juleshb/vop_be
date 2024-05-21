const express = require('express');
const router = express.Router();
const songController = require('../controllers/songController');
const albumController = require('../controllers/albumController');

// Routes for songs
router.get('/songs', songController.getAllSongs);
router.get('/songs/:id', songController.getSongById); // Route to get a song by ID
router.post('/songs/upload', songController.uploadSong); // Route for uploading songs
router.put('/songs/:id', songController.updateSong); // Route to update a song
router.delete('/songs/:id', songController.deleteSong); // Route to delete a song

// Routes for albums
router.get('/albums', albumController.getAllAlbums);
router.get('/albums/:id', albumController.getAlbumById); // Route to get an album by ID
router.post('/albums', albumController.createAlbum); // Route to create an album
router.put('/albums/:id', albumController.updateAlbum); // Route to update an album
router.delete('/albums/:id', albumController.deleteAlbum); // Route to delete an album

module.exports = router;

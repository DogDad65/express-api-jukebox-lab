const express = require('express');
const Track = require('../models/Track');
const router = express.Router();

// Create a new track
router.post('/', async (req, res) => {
  try {
    const { title, artist } = req.body;
    const track = new Track({ title, artist });
    await track.save();
    res.status(201).json(track);
  } catch (err) {
    res.status(500).json({ message: 'Internal Server Error', error: err.message });
  }
});

// Get all tracks
router.get('/', async (req, res) => {
  try {
    const tracks = await Track.find();
    res.status(200).json(tracks);
  } catch (err) {
    res.status(500).json({ message: 'Internal Server Error', error: err.message });
  }
});

// Get a single track by ID
router.get('/:id', async (req, res) => {
  try {
    const track = await Track.findById(req.params.id);
    if (!track) return res.status(404).json({ message: 'Track not found' });
    res.status(200).json(track);
  } catch (err) {
    res.status(500).json({ message: 'Internal Server Error', error: err.message });
  }
});

// Update a track by ID
router.put('/:id', async (req, res) => {
  try {
    const { title, artist } = req.body;
    const track = await Track.findByIdAndUpdate(req.params.id, { title, artist }, { new: true });
    if (!track) return res.status(404).json({ message: 'Track not found' });
    res.status(200).json(track);
  } catch (err) {
    res.status(500).json({ message: 'Internal Server Error', error: err.message });
  }
});

// Delete a track by ID
router.delete('/:id', async (req, res) => {
  try {
    const track = await Track.findByIdAndDelete(req.params.id);
    if (!track) return res.status(404).json({ message: 'Track not found' });
    res.status(200).json({ message: 'Track deleted', track });
  } catch (err) {
    res.status(500).json({ message: 'Internal Server Error', error: err.message });
  }
});

module.exports = router;

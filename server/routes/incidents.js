const express = require('express');
const router = express.Router();
const Incident = require('../models/Incident');

// Alle Vorfälle abrufen
router.get('/', async (req, res) => {
  try {
    const incidents = await Incident.findAll({
      order: [['timestamp', 'DESC']]
    });
    res.json(incidents);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Neuen Vorfall erstellen
router.post('/', async (req, res) => {
  try {
    const incident = await Incident.create(req.body);
    res.status(201).json(incident);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Vorfall aktualisieren
router.put('/:id', async (req, res) => {
  try {
    const incident = await Incident.findByPk(req.params.id);
    if (incident) {
      await incident.update(req.body);
      res.json(incident);
    } else {
      res.status(404).json({ message: 'Vorfall nicht gefunden' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Vorfall löschen
router.delete('/:id', async (req, res) => {
  try {
    const incident = await Incident.findByPk(req.params.id);
    if (incident) {
      await incident.destroy();
      res.json({ message: 'Vorfall gelöscht' });
    } else {
      res.status(404).json({ message: 'Vorfall nicht gefunden' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router; 
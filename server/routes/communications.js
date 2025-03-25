const express = require('express');
const router = express.Router();
const Communication = require('../models/Communication');

// Alle Kommunikationsnachrichten abrufen
router.get('/', async (req, res) => {
  try {
    const communications = await Communication.findAll({
      order: [['timestamp', 'DESC']]
    });
    res.json(communications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Neue Kommunikationsnachricht erstellen
router.post('/', async (req, res) => {
  try {
    const communication = await Communication.create(req.body);
    res.status(201).json(communication);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Kommunikationsnachricht aktualisieren
router.put('/:id', async (req, res) => {
  try {
    const communication = await Communication.findByPk(req.params.id);
    if (communication) {
      await communication.update(req.body);
      res.json(communication);
    } else {
      res.status(404).json({ message: 'Kommunikationsnachricht nicht gefunden' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Kommunikationsnachricht löschen
router.delete('/:id', async (req, res) => {
  try {
    const communication = await Communication.findByPk(req.params.id);
    if (communication) {
      await communication.destroy();
      res.json({ message: 'Kommunikationsnachricht gelöscht' });
    } else {
      res.status(404).json({ message: 'Kommunikationsnachricht nicht gefunden' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router; 
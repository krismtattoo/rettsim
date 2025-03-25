const express = require('express');
const router = express.Router();
const Statistics = require('../models/Statistics');

// Alle Statistiken abrufen
router.get('/', async (req, res) => {
  try {
    const statistics = await Statistics.findAll({
      order: [['timestamp', 'DESC']]
    });
    res.json(statistics);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Neue Statistik erstellen
router.post('/', async (req, res) => {
  try {
    const statistic = await Statistics.create(req.body);
    res.status(201).json(statistic);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Statistik aktualisieren
router.put('/:id', async (req, res) => {
  try {
    const statistic = await Statistics.findByPk(req.params.id);
    if (statistic) {
      await statistic.update(req.body);
      res.json(statistic);
    } else {
      res.status(404).json({ message: 'Statistik nicht gefunden' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Statistik löschen
router.delete('/:id', async (req, res) => {
  try {
    const statistic = await Statistics.findByPk(req.params.id);
    if (statistic) {
      await statistic.destroy();
      res.json({ message: 'Statistik gelöscht' });
    } else {
      res.status(404).json({ message: 'Statistik nicht gefunden' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router; 
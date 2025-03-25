const express = require('express');
const router = express.Router();
const prisma = require('../prisma');

// Alle Statistiken abrufen
router.get('/', async (req, res) => {
  try {
    const statistics = await prisma.statistics.findMany({
      orderBy: {
        timestamp: 'desc'
      }
    });
    res.json(statistics);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Neue Statistik erstellen
router.post('/', async (req, res) => {
  try {
    const statistic = await prisma.statistics.create({
      data: req.body
    });
    res.status(201).json(statistic);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Statistik aktualisieren
router.put('/:id', async (req, res) => {
  try {
    const statistic = await prisma.statistics.update({
      where: { id: parseInt(req.params.id) },
      data: req.body
    });
    res.json(statistic);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Statistik löschen
router.delete('/:id', async (req, res) => {
  try {
    await prisma.statistics.delete({
      where: { id: parseInt(req.params.id) }
    });
    res.json({ message: 'Statistik gelöscht' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router; 
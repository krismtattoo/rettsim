const express = require('express');
const router = express.Router();
const prisma = require('../prisma');

// Alle Vorfälle abrufen
router.get('/', async (req, res) => {
  try {
    const incidents = await prisma.incident.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    });
    res.json(incidents);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Neuen Vorfall erstellen
router.post('/', async (req, res) => {
  try {
    const incident = await prisma.incident.create({
      data: req.body
    });
    res.status(201).json(incident);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Vorfall aktualisieren
router.put('/:id', async (req, res) => {
  try {
    const incident = await prisma.incident.update({
      where: { id: parseInt(req.params.id) },
      data: req.body
    });
    res.json(incident);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Vorfall löschen
router.delete('/:id', async (req, res) => {
  try {
    await prisma.incident.delete({
      where: { id: parseInt(req.params.id) }
    });
    res.json({ message: 'Vorfall gelöscht' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router; 
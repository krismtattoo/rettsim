const express = require('express');
const router = express.Router();
const prisma = require('../prisma');

// Alle Kommunikationsnachrichten abrufen
router.get('/', async (req, res) => {
  try {
    const communications = await prisma.communication.findMany({
      orderBy: {
        timestamp: 'desc'
      }
    });
    res.json(communications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Neue Kommunikationsnachricht erstellen
router.post('/', async (req, res) => {
  try {
    const communication = await prisma.communication.create({
      data: req.body
    });
    res.status(201).json(communication);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Kommunikationsnachricht aktualisieren
router.put('/:id', async (req, res) => {
  try {
    const communication = await prisma.communication.update({
      where: { id: parseInt(req.params.id) },
      data: req.body
    });
    res.json(communication);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Kommunikationsnachricht löschen
router.delete('/:id', async (req, res) => {
  try {
    await prisma.communication.delete({
      where: { id: parseInt(req.params.id) }
    });
    res.json({ message: 'Kommunikationsnachricht gelöscht' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router; 
const express = require('express');
const router = express.Router();
const prisma = require('../prisma');

// Alle Ressourcen abrufen
router.get('/', async (req, res) => {
  try {
    const resources = await prisma.resource.findMany();
    res.json(resources);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Neue Ressource erstellen
router.post('/', async (req, res) => {
  try {
    const resource = await prisma.resource.create({
      data: req.body
    });
    res.status(201).json(resource);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Ressource aktualisieren
router.put('/:id', async (req, res) => {
  try {
    const resource = await prisma.resource.update({
      where: { id: parseInt(req.params.id) },
      data: req.body
    });
    res.json(resource);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Ressource löschen
router.delete('/:id', async (req, res) => {
  try {
    await prisma.resource.delete({
      where: { id: parseInt(req.params.id) }
    });
    res.json({ message: 'Ressource gelöscht' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router; 
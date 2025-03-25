const express = require('express');
const router = express.Router();
const Resource = require('../models/Resource');

// Alle Ressourcen abrufen
router.get('/', async (req, res) => {
  try {
    const resources = await Resource.findAll();
    res.json(resources);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Neue Ressource erstellen
router.post('/', async (req, res) => {
  try {
    const resource = await Resource.create(req.body);
    res.status(201).json(resource);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Ressource aktualisieren
router.put('/:id', async (req, res) => {
  try {
    const resource = await Resource.findByPk(req.params.id);
    if (resource) {
      await resource.update(req.body);
      res.json(resource);
    } else {
      res.status(404).json({ message: 'Ressource nicht gefunden' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Ressource löschen
router.delete('/:id', async (req, res) => {
  try {
    const resource = await Resource.findByPk(req.params.id);
    if (resource) {
      await resource.destroy();
      res.json({ message: 'Ressource gelöscht' });
    } else {
      res.status(404).json({ message: 'Ressource nicht gefunden' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router; 
const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Datenbankverbindung
const sequelize = require('./config/database');

// Routen
app.use('/api/resources', require('./routes/resources'));
app.use('/api/incidents', require('./routes/incidents'));
app.use('/api/communications', require('./routes/communications'));
app.use('/api/statistics', require('./routes/statistics'));

// Statische Dateien im Produktionsmodus
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
  
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client/build/index.html'));
  });
}

const PORT = process.env.PORT || 5000;

// Datenbank synchronisieren und Server starten
sequelize.sync()
  .then(() => {
    console.log('Datenbank synchronisiert');
    app.listen(PORT, () => {
      console.log(`Server läuft auf Port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('Fehler beim Synchronisieren der Datenbank:', err);
  }); 
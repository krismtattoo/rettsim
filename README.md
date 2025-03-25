# Rettungssimulator

Ein interaktiver Simulator für Rettungseinsätze, entwickelt mit React und Node.js.

## Features

- Echtzeit-Multiplayer-Funktionalität
- Interaktive Karte basierend auf OpenStreetMap
- Eigene Leitstelle aufbauen und verwalten
- Verschiedene Einsatzszenarien
- Ressourcenmanagement
- Kommunikation zwischen Spielern
- Echtzeit-Ressourcenverwaltung
- Interaktive Karte für Einsätze
- Kommunikationssystem
- Statistik-Dashboard
- Responsive Design

## Installation

1. Repository klonen
2. Abhängigkeiten installieren:
   ```bash
   npm install
   cd client
   npm install
   ```
3. Umgebungsvariablen einrichten:
   - Erstellen Sie eine `.env`-Datei im Hauptverzeichnis
   - Fügen Sie folgende Variablen hinzu:
     ```
     MONGODB_URI=ihre_mongodb_uri
     PORT=5000
     ```

## Entwicklung

Starten Sie die Entwicklungsumgebung:
```bash
npm run dev:full
```

Dies startet sowohl den Backend-Server als auch den Frontend-Entwicklungsserver.

## Technologie-Stack

- Frontend: React, TypeScript, Material-UI
- Backend: Node.js, Express, MySQL
- Deployment: Hostinger
- Version Control: GitHub

## Technologien

- Frontend: React, TypeScript, Leaflet
- Backend: Node.js, Express, Socket.IO
- Datenbank: MongoDB
- Karten: OpenStreetMap

## Lizenz

MIT

## Deployment
Die Anwendung wird automatisch auf Hostinger deployed, wenn Änderungen in den main-Branch gepusht werden.
Deployment-Konfiguration: Neue Git-Integration mit Hostinger. 
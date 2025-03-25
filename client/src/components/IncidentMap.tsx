import React, { useState, useEffect } from 'react';
import { Box, Paper, Typography, IconButton, Tooltip, styled } from '@mui/material';
import {
  ZoomIn as ZoomInIcon,
  ZoomOut as ZoomOutIcon,
  MyLocation as MyLocationIcon,
  Layers as LayersIcon,
} from '@mui/icons-material';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { MapContainer as LeafletMapContainer, TileLayer, useMap } from 'react-leaflet';

const MapWrapper = styled(Paper)(({ theme }) => ({
  position: 'relative',
  width: '100%',
  height: '100%',
  overflow: 'hidden',
  borderRadius: theme.shape.borderRadius,
  background: theme.palette.background.paper,
}));

const MapControls = styled(Box)(({ theme }) => ({
  position: 'absolute',
  right: theme.spacing(1),
  bottom: theme.spacing(1),
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(0.5),
  zIndex: 1000,
}));

const ControlButton = styled(IconButton)(({ theme }) => ({
  background: theme.palette.background.paper,
  color: theme.palette.primary.main,
  '&:hover': {
    background: theme.palette.action.hover,
  },
}));

interface IncidentMapProps {
  incidents: Array<{
    id: string;
    type: 'fire' | 'medical' | 'other';
    title: string;
    location: string;
    timestamp: string;
  }>;
  selectedIncident: {
    id: string;
    type: 'fire' | 'medical' | 'other';
    title: string;
    location: string;
    timestamp: string;
  } | null;
  onIncidentSelect: (incident: any) => void;
}

const getIncidentIcon = (type: string): L.Icon => {
  const iconUrl = type === 'fire' 
    ? '/fire-icon.png' 
    : type === 'medical' 
      ? '/medical-icon.png' 
      : '/other-icon.png';
  
  return L.icon({
    iconUrl,
    iconSize: [32, 32],
    iconAnchor: [16, 32],
  });
};

const MapComponent: React.FC<{
  incidents: IncidentMapProps['incidents'];
  selectedIncident: IncidentMapProps['selectedIncident'];
  onIncidentSelect: IncidentMapProps['onIncidentSelect'];
}> = ({ incidents, selectedIncident, onIncidentSelect }) => {
  const map = useMap();
  const [markers, setMarkers] = useState<L.Marker[]>([]);

  useEffect(() => {
    // Bestehende Marker entfernen
    markers.forEach(marker => marker.remove());
    const newMarkers: L.Marker[] = [];

    // Neue Marker für alle Vorfälle hinzufügen
    incidents.forEach(incident => {
      const marker = L.marker([51.1657, 10.4515], {
        icon: getIncidentIcon(incident.type),
      })
        .bindPopup(`
          <div style="color: #333;">
            <strong>${incident.title}</strong><br>
            ${incident.location}<br>
            <small>${incident.timestamp}</small>
          </div>
        `)
        .on('click', () => onIncidentSelect(incident));

      marker.addTo(map);
      newMarkers.push(marker);
    });

    setMarkers(newMarkers);
  }, [map, incidents, selectedIncident, onIncidentSelect]);

  return null;
};

const IncidentMap: React.FC<IncidentMapProps> = ({ incidents, selectedIncident, onIncidentSelect }) => {
  return (
    <MapWrapper>
      <LeafletMapContainer
        center={[51.1657, 10.4515]}
        zoom={6}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <MapComponent
          incidents={incidents}
          selectedIncident={selectedIncident}
          onIncidentSelect={onIncidentSelect}
        />
      </LeafletMapContainer>

      <MapControls>
        <Tooltip title="Vergrößern">
          <ControlButton size="small">
            <ZoomInIcon />
          </ControlButton>
        </Tooltip>
        <Tooltip title="Verkleinern">
          <ControlButton size="small">
            <ZoomOutIcon />
          </ControlButton>
        </Tooltip>
        <Tooltip title="Auf Position zentrieren">
          <ControlButton size="small">
            <MyLocationIcon />
          </ControlButton>
        </Tooltip>
        <Tooltip title="Kartenebenen">
          <ControlButton size="small">
            <LayersIcon />
          </ControlButton>
        </Tooltip>
      </MapControls>
    </MapWrapper>
  );
};

export default IncidentMap; 
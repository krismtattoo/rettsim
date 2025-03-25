import React, { useEffect, useRef, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { Box, Paper, TextField, IconButton, Typography } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { styled } from '@mui/material/styles';

// Leaflet Icon Fix
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

const StyledPaper = styled(Paper)(({ theme }) => ({
  position: 'absolute',
  top: 10,
  left: 300,
  zIndex: 1000,
  padding: theme.spacing(1),
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
  background: '#ffffff',
  border: '1px solid rgba(25, 118, 210, 0.2)',
  borderRadius: '12px',
  boxShadow: '0 2px 8px rgba(25, 118, 210, 0.1)',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: '0 4px 12px rgba(25, 118, 210, 0.15)',
  },
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    background: '#ffffff',
    borderRadius: '20px',
    '&:hover': {
      background: '#fafafa',
    },
    '&.Mui-focused': {
      background: '#ffffff',
      '& .MuiOutlinedInput-notchedOutline': {
        borderColor: '#1976d2',
      },
    },
  },
  '& .MuiInputLabel-root': {
    color: '#666666',
    '&.Mui-focused': {
      color: '#1976d2',
    },
  },
  '& .MuiOutlinedInput-input': {
    color: '#333333',
  },
}));

interface GameMapProps {
  center: [number, number];
  zoom: number;
}

const SearchBox: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const map = useMap();

  const handleSearch = () => {
    // Hier später: Implementierung der Adresssuche
    console.log('Suche nach:', searchQuery);
  };

  return (
    <StyledPaper>
      <StyledTextField
        size="small"
        placeholder="Adresse eingeben..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        fullWidth
      />
      <IconButton 
        onClick={handleSearch} 
        size="small"
        sx={{
          backgroundColor: 'rgba(79, 195, 247, 0.2)',
          '&:hover': {
            backgroundColor: 'rgba(79, 195, 247, 0.3)',
          },
        }}
      >
        <SearchIcon />
      </IconButton>
    </StyledPaper>
  );
};

const GameMap: React.FC<GameMapProps> = ({ center, zoom }) => {
  const mapRef = useRef<L.Map>(null);
  const [markers, setMarkers] = useState<Array<{ position: [number, number], title: string }>>([]);

  useEffect(() => {
    // Hier später: Socket.IO Verbindung und Event-Handling
  }, []);

  return (
    <Box sx={{ 
      height: '100vh',
      width: '100vw',
      position: 'relative',
      '& .leaflet-container': {
        height: '100%',
        width: '100%',
      },
      '& .leaflet-popup-content-wrapper': {
        background: '#ffffff',
        border: '1px solid rgba(25, 118, 210, 0.2)',
        borderRadius: '12px',
        boxShadow: '0 2px 8px rgba(25, 118, 210, 0.1)',
      },
      '& .leaflet-popup-content': {
        color: '#333333',
        margin: '8px 12px',
      },
      '& .leaflet-popup-tip': {
        background: '#ffffff',
      },
      '& .leaflet-control-zoom': {
        background: '#ffffff',
        border: '1px solid rgba(25, 118, 210, 0.2)',
        borderRadius: '8px',
        boxShadow: '0 2px 8px rgba(25, 118, 210, 0.1)',
      },
      '& .leaflet-control-zoom-in, & .leaflet-control-zoom-out': {
        background: 'transparent',
        border: 'none',
        color: '#1976d2',
        '&:hover': {
          background: 'rgba(25, 118, 210, 0.08)',
        },
      },
      '& .leaflet-control-attribution': {
        background: '#ffffff',
        border: '1px solid rgba(25, 118, 210, 0.2)',
        borderRadius: '8px',
        padding: '4px 8px',
        '& a': {
          color: '#1976d2',
        },
      }
    }}>
      <MapContainer
        center={center}
        zoom={zoom}
        style={{ height: '100%', width: '100%' }}
        ref={mapRef}
        zoomControl={true}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        />
        <SearchBox />
        {markers.map((marker, index) => (
          <Marker key={index} position={marker.position}>
            <Popup>
              <Box sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: 1
              }}>
                <LocationOnIcon />
                <Typography variant="body1">{marker.title}</Typography>
              </Box>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </Box>
  );
};

export default GameMap; 
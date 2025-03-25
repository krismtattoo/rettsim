import React, { useState } from 'react';
import { Box, CssBaseline, ThemeProvider, createTheme, styled, IconButton, Typography, Tooltip } from '@mui/material';
import Draggable from 'react-draggable';
import IncidentList from './components/IncidentList';
import ResourceOverview from './components/ResourceOverview';
import CommunicationPanel from './components/CommunicationPanel';
import StatisticsPanel from './components/StatisticsPanel';
import { MapContainer as LeafletMapContainer, TileLayer } from 'react-leaflet';
import {
  Dashboard as DashboardIcon,
  LocalHospital as EmergencyIcon,
  DirectionsCar as DirectionsCarIcon,
  Notifications as NotificationsIcon,
  Radio as RadioIcon,
  AccountCircle as AccountCircleIcon,
} from '@mui/icons-material';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Leaflet Icon Fix
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#00B4D8',
    },
    secondary: {
      main: '#90E0EF',
    },
    background: {
      default: '#0A1929',
      paper: '#132F4C',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h6: {
      fontWeight: 600,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
        },
      },
    },
  },
});

const AppContainer = styled(Box)({
  height: '100vh',
  display: 'flex',
  flexDirection: 'column',
  background: '#0A1929',
  overflow: 'hidden',
});

const ModernHeader = styled(Box)(({ theme }) => ({
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  zIndex: 1100,
  padding: theme.spacing(1.5),
  background: 'rgba(19, 47, 76, 0.8)',
  backdropFilter: 'blur(10px)',
  borderBottom: '1px solid rgba(0, 180, 216, 0.2)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
}));

const HeaderLeft = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(2),
}));

const HeaderLogo = styled(Typography)(({ theme }) => ({
  fontSize: '1.5rem',
  fontWeight: 700,
  background: 'linear-gradient(135deg, #00B4D8 0%, #90E0EF 100%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  textShadow: '0 2px 4px rgba(0, 180, 216, 0.2)',
}));

const HeaderNav = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
}));

const NavButton = styled(IconButton)(({ theme }) => ({
  background: 'rgba(0, 180, 216, 0.1)',
  color: '#00B4D8',
  width: '40px',
  height: '40px',
  '&:hover': {
    background: 'rgba(0, 180, 216, 0.2)',
  },
}));

const HeaderRight = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(2),
}));

const StatusBadge = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
  padding: theme.spacing(0.5, 1),
  background: 'rgba(0, 180, 216, 0.1)',
  borderRadius: '20px',
  color: '#00B4D8',
  fontSize: '0.875rem',
}));

const MainContent = styled(Box)(({ theme }) => ({
  position: 'relative',
  height: '100vh',
  padding: theme.spacing(2),
  paddingTop: '80px',
  overflow: 'hidden',
}));

const MapBackground = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  background: '#132F4C',
  borderRadius: theme.spacing(1),
  border: '1px solid rgba(0, 180, 216, 0.2)',
  overflow: 'hidden',
  '& .leaflet-container': {
    height: '100%',
    width: '100%',
  },
}));

const DraggableWindow = styled(Box)(({ theme }) => ({
  position: 'absolute',
  width: '360px',
  height: '280px',
  zIndex: 1000,
  background: 'rgba(19, 47, 76, 0.85)',
  borderRadius: theme.spacing(1),
  border: '1px solid rgba(0, 180, 216, 0.2)',
  overflow: 'hidden',
  cursor: 'move',
  transition: 'all 0.3s ease',
  backdropFilter: 'blur(8px)',
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
  '&:hover': {
    boxShadow: '0 8px 30px rgba(0, 180, 216, 0.2)',
    transform: 'translateY(-2px)',
  },
  '&.react-draggable-dragging': {
    boxShadow: '0 12px 40px rgba(0, 180, 216, 0.3)',
    zIndex: 1001,
  },
}));

// Typen definieren
interface Incident {
  id: string;
  type: 'fire' | 'medical' | 'other';
  title: string;
  location: string;
  priority: 'high' | 'medium' | 'low';
  timestamp: string;
}

interface Resource {
  id: string;
  type: 'firetruck' | 'ambulance' | 'car' | 'personnel';
  name: string;
  status: 'available' | 'in_use' | 'maintenance';
  location: string;
  capacity: number;
}

interface Message {
  id: string;
  sender: string;
  content: string;
  timestamp: string;
  type: 'text' | 'voice' | 'radio';
}

interface Statistics {
  activeIncidents: number;
  availableResources: number;
  responseTime: string;
  successRate: string;
}

// Mock-Daten mit korrekten Typen
const mockIncidents: Incident[] = [
  {
    id: '1',
    type: 'fire',
    title: 'Brand in Wohnhaus',
    location: 'Hauptstraße 123',
    priority: 'high',
    timestamp: '10:30',
  },
  {
    id: '2',
    type: 'medical',
    title: 'Verkehrsunfall',
    location: 'Bundesstraße 45',
    priority: 'medium',
    timestamp: '10:25',
  },
];

const mockResources: Resource[] = [
  {
    id: '1',
    type: 'firetruck',
    name: 'LF 20',
    status: 'available',
    location: 'Wache 1',
    capacity: 9
  },
  {
    id: '2',
    type: 'ambulance',
    name: 'RTW',
    status: 'in_use',
    location: 'Wache 2',
    capacity: 2
  },
];

const mockMessages: Message[] = [
  {
    id: '1',
    sender: 'Einsatzleitung',
    content: 'Neuer Einsatz: Brand in Wohnhaus',
    timestamp: '10:30',
    type: 'radio',
  },
  {
    id: '2',
    sender: 'Funkzentrale',
    content: 'RTW 1 ist unterwegs',
    timestamp: '10:28',
    type: 'radio',
  },
];

const mockStats: Statistics = {
  activeIncidents: 2,
  availableResources: 5,
  responseTime: '4.2',
  successRate: '98%',
};

const mockStatistics = [
  {
    id: '1',
    title: 'Aktive Einsätze',
    value: mockStats.activeIncidents,
    total: 5,
    icon: 'fire' as const,
    trend: 20,
  },
  {
    id: '2',
    title: 'Verfügbare Ressourcen',
    value: mockStats.availableResources,
    total: 10,
    icon: 'warning' as const,
    trend: -10,
  },
  {
    id: '3',
    title: 'Durchschnittliche Reaktionszeit',
    value: parseFloat(mockStats.responseTime),
    total: 5,
    icon: 'trending' as const,
    trend: 5,
  },
  {
    id: '4',
    title: 'Erfolgsrate',
    value: parseFloat(mockStats.successRate),
    total: 100,
    icon: 'medical' as const,
    trend: 2,
  },
];

const App: React.FC = () => {
  const [credits] = useState(10000);
  const [activeIncidents] = useState<Incident[]>(mockIncidents);
  const [selectedIncident, setSelectedIncident] = useState<Incident | null>(null);
  const [positions, setPositions] = useState({
    resources: { x: 20, y: 20 },
    incidents: { x: 400, y: 20 },
    communication: { x: 20, y: 320 },
    statistics: { x: 400, y: 320 },
  });

  const handleIncidentSelect = (incident: Incident) => {
    setSelectedIncident(incident);
  };

  const handleResourceSelect = (resource: Resource) => {
    console.log('Ressource hinzufügen');
  };

  const handleSendMessage = (content: string) => {
    console.log('Nachricht hinzufügen');
  };

  const handleRefreshStatistics = () => {
    console.log('Statistiken aktualisieren');
  };

  const handleDragStop = (key: string) => (e: any, data: { x: number; y: number }) => {
    setPositions(prev => ({
      ...prev,
      [key]: { x: data.x, y: data.y },
    }));
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppContainer>
        <ModernHeader>
          <HeaderLeft>
            <HeaderLogo>Leitstelle</HeaderLogo>
            <HeaderNav>
              <Tooltip title="Dashboard">
                <NavButton size="small">
                  <DashboardIcon />
                </NavButton>
              </Tooltip>
              <Tooltip title="Einsätze">
                <NavButton size="small">
                  <EmergencyIcon />
                </NavButton>
              </Tooltip>
              <Tooltip title="Ressourcen">
                <NavButton size="small">
                  <DirectionsCarIcon />
                </NavButton>
              </Tooltip>
              <Tooltip title="Kommunikation">
                <NavButton size="small">
                  <RadioIcon />
                </NavButton>
              </Tooltip>
            </HeaderNav>
          </HeaderLeft>
          <HeaderRight>
            <StatusBadge>
              <span>Online</span>
              <span>•</span>
              <span>{credits.toLocaleString()} Credits</span>
            </StatusBadge>
            <Tooltip title="Benachrichtigungen">
              <NavButton size="small">
                <NotificationsIcon />
              </NavButton>
            </Tooltip>
            <Tooltip title="Profil">
              <NavButton size="small">
                <AccountCircleIcon />
              </NavButton>
            </Tooltip>
          </HeaderRight>
        </ModernHeader>

        <MainContent>
          <MapBackground>
            <LeafletMapContainer
              center={[51.1657, 10.4515]}
              zoom={6}
              style={{ height: '100%', width: '100%' }}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
            </LeafletMapContainer>
          </MapBackground>

          <Draggable
            defaultPosition={positions.resources}
            onStop={handleDragStop('resources')}
            bounds="parent"
          >
            <DraggableWindow>
              <ResourceOverview
                resources={mockResources}
                onResourceSelect={handleResourceSelect}
                onAddResource={() => {}}
              />
            </DraggableWindow>
          </Draggable>

          <Draggable
            defaultPosition={positions.incidents}
            onStop={handleDragStop('incidents')}
            bounds="parent"
          >
            <DraggableWindow>
              <IncidentList
                incidents={activeIncidents}
                selectedIncident={selectedIncident}
                onIncidentSelect={handleIncidentSelect}
              />
            </DraggableWindow>
          </Draggable>

          <Draggable
            defaultPosition={positions.communication}
            onStop={handleDragStop('communication')}
            bounds="parent"
          >
            <DraggableWindow>
              <CommunicationPanel
                messages={mockMessages}
                onSendMessage={handleSendMessage}
              />
            </DraggableWindow>
          </Draggable>

          <Draggable
            defaultPosition={positions.statistics}
            onStop={handleDragStop('statistics')}
            bounds="parent"
          >
            <DraggableWindow>
              <StatisticsPanel
                statistics={mockStatistics}
                onRefresh={handleRefreshStatistics}
              />
            </DraggableWindow>
          </Draggable>
        </MainContent>
      </AppContainer>
    </ThemeProvider>
  );
};

export default App; 
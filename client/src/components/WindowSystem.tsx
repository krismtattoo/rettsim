import React, { useState } from 'react';
import {
  Box,
  Paper,
  IconButton,
  Typography,
  Grid,
  styled,
} from '@mui/material';
import {
  Close as CloseIcon,
  Minimize as MinimizeIcon,
  CropSquare as MaximizeIcon,
  DragIndicator as DragIcon,
} from '@mui/icons-material';

interface WindowProps {
  title: string;
  children: React.ReactNode;
  defaultPosition?: { x: number; y: number };
  defaultSize?: { width: number; height: number };
  isMinimized?: boolean;
  isMaximized?: boolean;
}

const WindowContainer = styled(Paper)(({ theme }) => ({
  position: 'absolute',
  background: '#1a1a1a',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  borderRadius: '8px',
  overflow: 'hidden',
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '2px',
    background: 'linear-gradient(90deg, #4FC3F7 0%, #81D4FA 50%, #4FC3F7 100%)',
    zIndex: 1,
  }
}));

const WindowHeader = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: theme.spacing(1),
  background: 'rgba(79, 195, 247, 0.05)',
  cursor: 'move',
  userSelect: 'none',
}));

const WindowTitle = styled(Typography)(({ theme }) => ({
  color: '#ffffff',
  fontWeight: 500,
  fontSize: '0.9rem',
  marginLeft: theme.spacing(1),
}));

const WindowControls = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(0.5),
}));

const WindowButton = styled(IconButton)(({ theme }) => ({
  padding: theme.spacing(0.5),
  color: '#ffffff',
  '&:hover': {
    background: 'rgba(79, 195, 247, 0.1)',
  },
  '&.close': {
    '&:hover': {
      background: 'rgba(79, 195, 247, 0.2)',
    },
  },
}));

const WindowContent = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  color: '#ffffff',
  height: 'calc(100% - 48px)',
  overflow: 'auto',
}));

const Window: React.FC<WindowProps> = ({
  title,
  children,
  defaultPosition = { x: 100, y: 100 },
  defaultSize = { width: 400, height: 300 },
  isMinimized = false,
  isMaximized = false,
}) => {
  const [position, setPosition] = useState(defaultPosition);
  const [size, setSize] = useState(defaultSize);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      setPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y,
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <WindowContainer
      sx={{
        left: position.x,
        top: position.y,
        width: size.width,
        height: size.height,
        display: isMinimized ? 'none' : 'flex',
      }}
    >
      <WindowHeader
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <DragIcon sx={{ color: '#ffffff', fontSize: '1.2rem' }} />
        <WindowTitle>{title}</WindowTitle>
        <WindowControls>
          <WindowButton size="small">
            <MinimizeIcon fontSize="small" />
          </WindowButton>
          <WindowButton size="small">
            <MaximizeIcon fontSize="small" />
          </WindowButton>
          <WindowButton size="small" className="close">
            <CloseIcon fontSize="small" />
          </WindowButton>
        </WindowControls>
      </WindowHeader>
      <WindowContent>{children}</WindowContent>
    </WindowContainer>
  );
};

const WindowSystem: React.FC = () => {
  return (
    <Box sx={{ width: '100%', height: '100%', position: 'relative' }}>
      {/* Einsatzübersicht - Hauptfenster */}
      <Window 
        title="Einsatzübersicht" 
        defaultPosition={{ x: 20, y: 20 }}
        defaultSize={{ width: 800, height: 600 }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>
              Aktive Einsätze
            </Typography>
            <Box sx={{ 
              p: 2, 
              bgcolor: 'rgba(79, 195, 247, 0.1)', 
              borderRadius: 1,
              border: '1px solid rgba(79, 195, 247, 0.2)'
            }}>
              <Typography>Keine aktiven Einsätze</Typography>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>
              Letzte Einsätze
            </Typography>
            <Box sx={{ 
              p: 2, 
              bgcolor: 'rgba(79, 195, 247, 0.1)', 
              borderRadius: 1,
              border: '1px solid rgba(79, 195, 247, 0.2)'
            }}>
              <Typography>Keine letzten Einsätze</Typography>
            </Box>
          </Grid>
        </Grid>
      </Window>

      {/* Funkverkehr - Rechtes Fenster */}
      <Window 
        title="Funkverkehr" 
        defaultPosition={{ x: 840, y: 20 }}
        defaultSize={{ width: 400, height: 600 }}
      >
        <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
          <Box sx={{ 
            p: 2, 
            bgcolor: 'rgba(79, 195, 247, 0.1)', 
            borderRadius: 1,
            border: '1px solid rgba(79, 195, 247, 0.2)',
            mb: 2
          }}>
            <Typography variant="subtitle1" gutterBottom>
              Aktiver Kanal
            </Typography>
            <Typography variant="h6" color="primary">
              Kanal 1 - Einsatzleitung
            </Typography>
          </Box>
          
          <Box sx={{ 
            flexGrow: 1, 
            bgcolor: 'rgba(0, 0, 0, 0.2)', 
            borderRadius: 1,
            p: 2,
            overflow: 'auto'
          }}>
            <Typography variant="body2" color="text.secondary">
              Keine Funkmeldungen
            </Typography>
          </Box>
        </Box>
      </Window>

      {/* Fahrzeugstatus - Unteres Fenster */}
      <Window 
        title="Fahrzeugstatus" 
        defaultPosition={{ x: 20, y: 640 }}
        defaultSize={{ width: 1220, height: 300 }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>
              Verfügbare Fahrzeuge
            </Typography>
            <Box sx={{ 
              p: 2, 
              bgcolor: 'rgba(79, 195, 247, 0.1)', 
              borderRadius: 1,
              border: '1px solid rgba(79, 195, 247, 0.2)'
            }}>
              <Typography>Keine Fahrzeuge verfügbar</Typography>
            </Box>
          </Grid>
        </Grid>
      </Window>
    </Box>
  );
};

export default WindowSystem; 
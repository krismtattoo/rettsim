import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  styled,
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  LocalHospital as EmergencyIcon,
  DirectionsCar as DirectionsCarIcon,
  People as PeopleIcon,
  Settings as SettingsIcon,
  LocalFireDepartment as FireIcon,
  LocalPolice as PoliceIcon,
  LocalPharmacy as PharmacyIcon,
  Notifications as NotificationsIcon,
  Timeline as TimelineIcon,
  Assessment as AssessmentIcon,
  Warning as WarningIcon,
  Add as AddIcon,
  Map as MapIcon,
  Radio as RadioIcon,
  Phone as PhoneIcon,
  Chat as ChatIcon,
  Build,
} from '@mui/icons-material';

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  background: '#1a1a1a',
  color: '#ffffff',
  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
  borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
  '&::after': {
    content: '""',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '2px',
    background: 'linear-gradient(90deg, #4FC3F7 0%, #81D4FA 50%, #4FC3F7 100%)',
    opacity: 0.8,
  }
}));

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  minHeight: '64px',
  padding: '0 24px',
  borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
}));

const Logo = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
  fontSize: '1.5rem',
  background: 'linear-gradient(135deg, #4FC3F7 0%, #81D4FA 100%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  marginRight: theme.spacing(4),
  textShadow: '0 2px 4px rgba(79, 195, 247, 0.2)',
}));

const IconButtonStyled = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
  padding: theme.spacing(1),
  borderRadius: theme.spacing(1),
  cursor: 'pointer',
  color: '#ffffff',
  '&:hover': {
    background: 'rgba(79, 195, 247, 0.1)',
  },
  '& svg': {
    fontSize: '1.5rem',
  },
}));

interface MainMenuProps {
  credits: number;
  onBuildStationClick: () => void;
}

const MainMenu: React.FC<MainMenuProps> = ({ credits, onBuildStationClick }) => {
  return (
    <StyledAppBar position="static">
      <StyledToolbar>
        <Logo>Leitstelle</Logo>
        <Box sx={{ flexGrow: 1 }} />
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <IconButtonStyled onClick={onBuildStationClick}>
            <Build />
            <Typography variant="body2">Neue Wache</Typography>
          </IconButtonStyled>
        </Box>
      </StyledToolbar>
    </StyledAppBar>
  );
};

export default MainMenu; 
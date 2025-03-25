import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  Dialog as MuiDialog,
  DialogTitle as MuiDialogTitle,
  DialogContent as MuiDialogContent,
  DialogActions as MuiDialogActions,
  TextField,
  IconButton,
  styled,
} from '@mui/material';
import {
  AccountBalance,
  LocalFireDepartment,
  DirectionsCar,
  Group,
  Close as CloseIcon,
} from '@mui/icons-material';

const StyledCard = styled(Card)(({ theme }) => ({
  background: '#132F4C',
  border: '1px solid rgba(79, 195, 247, 0.1)',
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: '0 8px 24px rgba(79, 195, 247, 0.2)',
    borderColor: '#4FC3F7',
  },
}));

const StationImage = styled(Box)(({ theme }) => ({
  height: 160,
  background: 'linear-gradient(135deg, #4FC3F7 0%, #81D4FA 100%)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  '& .MuiSvgIcon-root': {
    fontSize: 64,
    color: '#ffffff',
  },
}));

const StationInfo = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
}));

const StationTitle = styled(Typography)(({ theme }) => ({
  color: '#ffffff',
  fontWeight: 600,
  marginBottom: theme.spacing(1),
}));

const StationDescription = styled(Typography)(({ theme }) => ({
  color: 'rgba(255, 255, 255, 0.7)',
  fontSize: '0.9rem',
  marginBottom: theme.spacing(2),
}));

const StationCost = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  color: '#4FC3F7',
  '& .MuiSvgIcon-root': {
    marginRight: theme.spacing(0.5),
  },
}));

const StationCapacity = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  color: '#4FC3F7',
  marginTop: theme.spacing(1),
  '& .MuiSvgIcon-root': {
    marginRight: theme.spacing(0.5),
  },
}));

const DialogTitle = styled(MuiDialogTitle)(({ theme }) => ({
  color: '#ffffff',
  fontWeight: 600,
  marginBottom: theme.spacing(2),
}));

const DialogContent = styled(MuiDialogContent)(({ theme }) => ({
  color: '#ffffff',
}));

const DialogActions = styled(MuiDialogActions)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: '1px solid rgba(255, 255, 255, 0.1)',
}));

const ConfirmButton = styled(Button)(({ theme }) => ({
  background: 'linear-gradient(135deg, #4FC3F7 0%, #81D4FA 100%)',
  color: '#ffffff',
  '&:hover': {
    background: 'linear-gradient(135deg, #81D4FA 0%, #4FC3F7 100%)',
  },
}));

interface FireStationType {
  id: string;
  name: string;
  description: string;
  cost: number;
  capacity: number;
  image: string;
}

interface BuildFireStationProps {
  credits: number;
  onBuild: (type: string) => void;
  onClose: () => void;
}

const fireStationTypes: FireStationType[] = [
  {
    id: 'small',
    name: 'Kleine Wache',
    description: 'Ideal für den Start. Bietet Platz für 2 Fahrzeuge und 8 Einsatzkräfte.',
    cost: 5000,
    capacity: 8,
    image: '',
  },
  {
    id: 'medium',
    name: 'Mittlere Wache',
    description: 'Gut ausgestattete Wache mit Platz für 4 Fahrzeuge und 16 Einsatzkräfte.',
    cost: 8000,
    capacity: 16,
    image: '',
  },
  {
    id: 'large',
    name: 'Große Wache',
    description: 'Professionelle Wache mit Platz für 6 Fahrzeuge und 24 Einsatzkräfte.',
    cost: 12000,
    capacity: 24,
    image: '',
  },
];

const BuildFireStation: React.FC<BuildFireStationProps> = ({
  credits,
  onBuild,
  onClose,
}) => {
  const [selectedType, setSelectedType] = useState<FireStationType | null>(null);
  const [stationName, setStationName] = useState('');
  const [open, setOpen] = useState(false);

  const handleSelectType = (type: FireStationType) => {
    setSelectedType(type);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleConfirm = () => {
    if (selectedType) {
      onBuild(selectedType.id);
      setOpen(false);
      onClose();
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        mb: 3 
      }}>
        <Typography variant="h4" gutterBottom>
          Feuerwache bauen
        </Typography>
        <IconButton onClick={onClose} color="inherit">
          <CloseIcon />
        </IconButton>
      </Box>

      <Box sx={{ 
        display: 'flex', 
        alignItems: 'center',
        mb: 4,
        p: 2,
        background: 'rgba(79, 195, 247, 0.1)',
        borderRadius: 1,
        border: '1px solid rgba(79, 195, 247, 0.2)',
      }}>
        <AccountBalance sx={{ color: '#4FC3F7', mr: 1 }} />
        <Typography>
          Verfügbare Credits: <strong>{credits.toLocaleString()}</strong>
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {fireStationTypes.map((type) => (
          <Grid item xs={12} md={4} key={type.id}>
            <StyledCard onClick={() => handleSelectType(type)}>
              <StationImage>
                <LocalFireDepartment />
              </StationImage>
              <StationInfo>
                <StationTitle>{type.name}</StationTitle>
                <StationDescription>{type.description}</StationDescription>
                <StationCost>
                  <AccountBalance />
                  <Typography>{type.cost.toLocaleString()} Credits</Typography>
                </StationCost>
                <StationCapacity>
                  <Group />
                  <Typography>{type.capacity} Einsatzkräfte</Typography>
                </StationCapacity>
              </StationInfo>
            </StyledCard>
          </Grid>
        ))}
      </Grid>

      <MuiDialog 
        open={open} 
        onClose={handleClose}
        PaperProps={{
          sx: {
            background: '#132F4C',
            border: '1px solid rgba(79, 195, 247, 0.1)',
            borderRadius: '12px',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '2px',
              background: 'linear-gradient(90deg, #4FC3F7 0%, #81D4FA 50%, #4FC3F7 100%)',
              borderRadius: '12px 12px 0 0',
            }
          }
        }}
      >
        <DialogTitle>
          Feuerwache bauen
        </DialogTitle>
        <DialogContent>
          <Typography variant="body1" gutterBottom>
            Möchten Sie die Feuerwache "{stationName}" vom Typ "{selectedType?.name}" bauen?
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Kosten: {selectedType?.cost.toLocaleString()} Credits
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Abbrechen</Button>
          <ConfirmButton onClick={handleConfirm}>Bestätigen</ConfirmButton>
        </DialogActions>
      </MuiDialog>
    </Box>
  );
};

export default BuildFireStation; 
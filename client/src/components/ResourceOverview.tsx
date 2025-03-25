import React from 'react';
import { Box, Typography, IconButton, Tooltip, styled } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

interface Resource {
  id: string;
  type: 'firetruck' | 'ambulance' | 'car' | 'personnel';
  name: string;
  status: 'available' | 'in_use' | 'maintenance';
  location: string;
  capacity: number;
}

interface ResourceOverviewProps {
  resources: Resource[];
  onResourceSelect: (resource: Resource) => void;
  onAddResource: () => void;
}

const Container = styled(Box)({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
});

const Header = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: theme.spacing(1),
  borderBottom: '1px solid rgba(79, 195, 247, 0.2)',
  minHeight: '40px',
}));

const Title = styled(Typography)({
  fontSize: '0.9rem',
  fontWeight: 600,
});

const Content = styled(Box)(({ theme }) => ({
  flex: 1,
  overflowY: 'auto',
  padding: theme.spacing(1),
}));

const ResourceCard = styled(Box)(({ theme }) => ({
  background: 'linear-gradient(45deg, rgba(19, 47, 76, 0.6), rgba(19, 47, 76, 0.8))',
  borderRadius: theme.spacing(0.5),
  padding: theme.spacing(1),
  marginBottom: theme.spacing(1),
  cursor: 'pointer',
  border: '1px solid rgba(79, 195, 247, 0.1)',
  '&:hover': {
    background: 'linear-gradient(45deg, rgba(19, 47, 76, 0.8), rgba(19, 47, 76, 1))',
    borderColor: 'rgba(79, 195, 247, 0.3)',
  },
}));

const ResourceInfo = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  fontSize: '0.8rem',
});

const ResourceName = styled(Typography)({
  fontSize: '0.85rem',
  fontWeight: 600,
  marginBottom: '4px',
});

const ResourceStatus = styled(Typography)<{ status: string }>(({ status, theme }) => ({
  fontSize: '0.75rem',
  padding: '2px 6px',
  borderRadius: '4px',
  display: 'inline-block',
  backgroundColor: status === 'available' 
    ? 'rgba(76, 175, 80, 0.2)' 
    : status === 'in_use' 
    ? 'rgba(255, 152, 0, 0.2)' 
    : 'rgba(244, 67, 54, 0.2)',
  color: status === 'available' 
    ? '#81c784' 
    : status === 'in_use' 
    ? '#ffb74d' 
    : '#e57373',
}));

const ResourceOverview: React.FC<ResourceOverviewProps> = ({
  resources,
  onResourceSelect,
  onAddResource,
}) => {
  return (
    <Container>
      <Header>
        <Title variant="h6">Ressourcen</Title>
        <Box>
          <Tooltip title="Ressource hinzufügen">
            <IconButton size="small" onClick={onAddResource}>
              <AddIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Box>
      </Header>
      <Content>
        {resources.map((resource) => (
          <ResourceCard key={resource.id} onClick={() => onResourceSelect(resource)}>
            <ResourceName>{resource.name}</ResourceName>
            <ResourceInfo>
              <span>{resource.type}</span>
              <ResourceStatus status={resource.status}>
                {resource.status === 'available' ? 'Verfügbar' : 
                 resource.status === 'in_use' ? 'Im Einsatz' : 'Wartung'}
              </ResourceStatus>
            </ResourceInfo>
            <ResourceInfo>
              <span>{resource.location}</span>
              <span>Kapazität: {resource.capacity}</span>
            </ResourceInfo>
          </ResourceCard>
        ))}
      </Content>
    </Container>
  );
};

export default ResourceOverview; 
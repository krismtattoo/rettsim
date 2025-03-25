import React from 'react';
import { Box, Typography, styled } from '@mui/material';
import ListItem from '@mui/material/ListItem';

interface Incident {
  id: string;
  type: 'fire' | 'medical' | 'other';
  title: string;
  location: string;
  priority: 'high' | 'medium' | 'low';
  timestamp: string;
}

interface IncidentListProps {
  incidents: Incident[];
  selectedIncident: Incident | null;
  onIncidentSelect: (incident: Incident) => void;
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

const StyledListItem = styled(ListItem)<{ selected?: boolean; priority: string }>(({ selected, priority, theme }) => ({
  background: selected 
    ? 'linear-gradient(45deg, rgba(25, 118, 210, 0.4), rgba(25, 118, 210, 0.6))'
    : 'linear-gradient(45deg, rgba(19, 47, 76, 0.6), rgba(19, 47, 76, 0.8))',
  borderRadius: theme.spacing(0.5),
  marginBottom: theme.spacing(1),
  padding: theme.spacing(1),
  cursor: 'pointer',
  border: '1px solid rgba(79, 195, 247, 0.1)',
  borderLeft: `3px solid ${
    priority === 'high' 
      ? '#f44336' 
      : priority === 'medium' 
      ? '#ff9800' 
      : '#4caf50'
  }`,
  '&:hover': {
    background: selected
      ? 'linear-gradient(45deg, rgba(25, 118, 210, 0.6), rgba(25, 118, 210, 0.8))'
      : 'linear-gradient(45deg, rgba(19, 47, 76, 0.8), rgba(19, 47, 76, 1))',
    borderColor: 'rgba(79, 195, 247, 0.3)',
  },
}));

const IncidentInfo = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  gap: '4px',
  width: '100%',
});

const IncidentTitle = styled(Typography)({
  fontSize: '0.85rem',
  fontWeight: 600,
});

const IncidentDetails = styled(Typography)({
  fontSize: '0.75rem',
  color: 'rgba(255, 255, 255, 0.7)',
  display: 'flex',
  justifyContent: 'space-between',
});

const IncidentList: React.FC<IncidentListProps> = ({
  incidents,
  selectedIncident,
  onIncidentSelect,
}) => {
  return (
    <Container>
      <Header>
        <Title>Aktive Einsätze</Title>
      </Header>
      <Content>
        {incidents.map((incident) => (
          <StyledListItem
            key={incident.id}
            selected={selectedIncident?.id === incident.id}
            priority={incident.priority}
            onClick={() => onIncidentSelect(incident)}
          >
            <IncidentInfo>
              <IncidentTitle>{incident.title}</IncidentTitle>
              <IncidentDetails>
                <span>{incident.location}</span>
                <span>{incident.timestamp}</span>
              </IncidentDetails>
            </IncidentInfo>
          </StyledListItem>
        ))}
      </Content>
    </Container>
  );
};

export default IncidentList; 
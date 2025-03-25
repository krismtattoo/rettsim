import React from 'react';
import { Box, Typography, IconButton, Tooltip, styled } from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';

interface StatisticItem {
  id: string;
  title: string;
  value: number;
  total: number;
  icon: 'fire' | 'warning' | 'trending' | 'medical';
  trend: number;
}

interface StatisticsPanelProps {
  statistics: StatisticItem[];
  onRefresh: () => void;
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
  display: 'grid',
  gridTemplateColumns: 'repeat(2, 1fr)',
  gap: theme.spacing(1),
}));

const StatCard = styled(Box)(({ theme }) => ({
  background: 'linear-gradient(45deg, rgba(19, 47, 76, 0.6), rgba(19, 47, 76, 0.8))',
  borderRadius: theme.spacing(0.5),
  padding: theme.spacing(1),
  display: 'flex',
  flexDirection: 'column',
  gap: '4px',
}));

const StatTitle = styled(Typography)({
  fontSize: '0.75rem',
  color: 'rgba(255, 255, 255, 0.7)',
});

const StatValue = styled(Typography)({
  fontSize: '1.1rem',
  fontWeight: 600,
});

const StatTrend = styled(Box)<{ trend: number }>(({ trend }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '4px',
  fontSize: '0.75rem',
  color: trend >= 0 ? '#4caf50' : '#f44336',
}));

const StatisticsPanel: React.FC<StatisticsPanelProps> = ({
  statistics,
  onRefresh,
}) => {
  return (
    <Container>
      <Header>
        <Title>Statistiken</Title>
        <Box>
          <Tooltip title="Aktualisieren">
            <IconButton size="small" onClick={onRefresh}>
              <RefreshIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Box>
      </Header>
      <Content>
        {statistics.map((stat) => (
          <StatCard key={stat.id}>
            <StatTitle>{stat.title}</StatTitle>
            <StatValue>
              {stat.value.toLocaleString()}
              {stat.title.includes('rate') ? '%' : ''}
            </StatValue>
            <StatTrend trend={stat.trend}>
              {stat.trend >= 0 ? <TrendingUpIcon fontSize="small" /> : <TrendingDownIcon fontSize="small" />}
              {Math.abs(stat.trend)}%
            </StatTrend>
          </StatCard>
        ))}
      </Content>
    </Container>
  );
};

export default StatisticsPanel; 
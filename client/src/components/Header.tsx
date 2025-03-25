import React, { useState, useEffect } from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Box,
  Avatar,
  LinearProgress,
  Tooltip,
  Menu,
  MenuItem,
  styled,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Notifications as NotificationsIcon,
  Settings as SettingsIcon,
  Person as PersonIcon,
  EmojiEvents as EmojiEventsIcon,
} from '@mui/icons-material';

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  background: '#132F4C',
  borderBottom: '1px solid rgba(79, 195, 247, 0.1)',
  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
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

const UserInfo = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(2),
  marginLeft: 'auto',
}));

const RankDisplay = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
  padding: theme.spacing(1, 2),
  background: 'rgba(79, 195, 247, 0.1)',
  borderRadius: '20px',
  border: '1px solid rgba(79, 195, 247, 0.2)',
}));

const XPProgress = styled(Box)(({ theme }) => ({
  width: 200,
  marginRight: theme.spacing(2),
}));

const Header: React.FC = () => {
  const [time, setTime] = useState(new Date());
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <StyledAppBar position="fixed">
      <Toolbar>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>

        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Leitstelle
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Typography variant="body2">
            {time.toLocaleTimeString()}
          </Typography>

          <RankDisplay>
            <EmojiEventsIcon color="primary" />
            <Typography variant="body2">
              Rang 5
            </Typography>
          </RankDisplay>

          <XPProgress>
            <Typography variant="caption" gutterBottom>
              XP: 750/1000
            </Typography>
            <LinearProgress 
              variant="determinate" 
              value={75} 
              sx={{ 
                height: 6, 
                borderRadius: 3,
                backgroundColor: 'rgba(79, 195, 247, 0.1)',
                '& .MuiLinearProgress-bar': {
                  background: 'linear-gradient(90deg, #4FC3F7 0%, #81D4FA 100%)',
                }
              }} 
            />
          </XPProgress>

          <UserInfo>
            <Tooltip title="Benachrichtigungen">
              <IconButton color="inherit">
                <NotificationsIcon />
              </IconButton>
            </Tooltip>

            <Tooltip title="Einstellungen">
              <IconButton color="inherit">
                <SettingsIcon />
              </IconButton>
            </Tooltip>

            <Tooltip title="Profil">
              <IconButton
                onClick={handleMenuOpen}
                color="inherit"
              >
                <Avatar 
                  sx={{ 
                    width: 32, 
                    height: 32, 
                    bgcolor: '#4FC3F7',
                    border: '2px solid rgba(79, 195, 247, 0.3)',
                  }}
                >
                  <PersonIcon />
                </Avatar>
              </IconButton>
            </Tooltip>
          </UserInfo>
        </Box>

        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          PaperProps={{
            sx: {
              mt: 1.5,
              borderRadius: '12px',
              background: '#132F4C',
              border: '1px solid rgba(79, 195, 247, 0.1)',
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
          <MenuItem onClick={handleMenuClose}>
            <PersonIcon sx={{ mr: 1 }} /> Profil
          </MenuItem>
          <MenuItem onClick={handleMenuClose}>
            <SettingsIcon sx={{ mr: 1 }} /> Einstellungen
          </MenuItem>
          <MenuItem onClick={handleMenuClose}>
            <EmojiEventsIcon sx={{ mr: 1 }} /> Rang & Fortschritt
          </MenuItem>
        </Menu>
      </Toolbar>
    </StyledAppBar>
  );
};

export default Header; 
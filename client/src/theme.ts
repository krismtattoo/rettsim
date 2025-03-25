import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#4FC3F7',
      light: '#81D4FA',
      dark: '#0288D1',
    },
    secondary: {
      main: '#81D4FA',
      light: '#B3E5FC',
      dark: '#4FC3F7',
    },
    background: {
      default: '#0A1929',
      paper: '#132F4C',
    },
    text: {
      primary: '#ffffff',
      secondary: 'rgba(255, 255, 255, 0.7)',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 700,
      background: 'linear-gradient(135deg, #4FC3F7 0%, #81D4FA 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 600,
    },
    h3: {
      fontSize: '1.75rem',
      fontWeight: 600,
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 500,
    },
    h5: {
      fontSize: '1.25rem',
      fontWeight: 500,
    },
    h6: {
      fontSize: '1rem',
      fontWeight: 500,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
          fontWeight: 500,
          padding: '8px 16px',
          '&.gradient': {
            background: 'linear-gradient(135deg, #4FC3F7 0%, #81D4FA 100%)',
            '&:hover': {
              background: 'linear-gradient(135deg, #81D4FA 0%, #4FC3F7 100%)',
            },
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          background: '#132F4C',
          borderRadius: 12,
          border: '1px solid rgba(79, 195, 247, 0.1)',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
          transition: 'all 0.3s ease',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: '0 8px 24px rgba(79, 195, 247, 0.2)',
            borderColor: '#4FC3F7',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          background: '#132F4C',
        },
      },
    },
  },
}); 
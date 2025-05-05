import { createTheme } from '@mui/material/styles';
import colors from './colors';

const theme = createTheme({
  palette: {
    primary: {
      main: colors.primary, // your custom primary color
    },
    secondary: {
      main: colors.secondary, // optional: secondary color
    },
    // You can also define your own color slot
    accent: {
      main: colors.accent,
    },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 15,
          transition: 'transform 0.3s ease-in-out', // Smooth transition
          '&:hover': {
            transform: 'scale(1.03)', // Slightly enlarges the card on hover
            boxShadow: '0px 6px 12px rgba(0, 0, 0, 0.3)', // Optional: adds shadow on hover
          },
        },
      },
    },
  },
});

export default theme;

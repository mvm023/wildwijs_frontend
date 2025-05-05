import { createTheme } from '@mui/material/styles';
import colors from '../theme/colors';

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
        },
      },
    },
  },
});

export default theme;

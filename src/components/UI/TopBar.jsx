import * as React from 'react';
import { Link } from 'react-router';
import SignupForm from '../User/SignupForm';
import LoginForm from '../User/LoginForm';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import CloseIcon from '@mui/icons-material/Close';
import API_BASE_URL from '../../config/config';
import AxiosInstance from '../../config/axios';



const pages = [
  { name: 'Studeren', path: '/StudyMode' },
  // { name: 'Encyclopedie', path: '/Encyclopedia' }
];

const settings = ['Uitloggen'];


function ResponsiveAppBar({ user, setUser }) {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [showLoginDialog, setShowLoginDialog] = React.useState(false);
  const [showSignupDialog, setShowSignupDialog] = React.useState(false);



  const handleOpenNavMenu = (event) => setAnchorElNav(event.currentTarget);
  const handleOpenUserMenu = (event) => setAnchorElUser(event.currentTarget);
  const handleCloseNavMenu = () => setAnchorElNav(null);
  const handleCloseUserMenu = () => setAnchorElUser(null);

  const handleOpenLoginDialog = () => setShowLoginDialog(true);
  const handleCloseLoginDialog = () => setShowLoginDialog(false);

  const handleOpenSignupDialog = () => setShowSignupDialog(true);
  const handleCloseSignupDialog = () => setShowSignupDialog(false);

  const handleUserMenuClick = (setting) => {
    if (setting === 'Uitloggen') {
      handleLogOutClick();
    }
    handleCloseUserMenu();
  };

  const handleSwitchToSignup = () => {
    handleCloseLoginDialog();
    handleOpenSignupDialog();
  };

  const handleLogOutClick = async () => {
    AxiosInstance.post(`logout/`, {
    })
    .then(
      () => {
        setUser(null);
        localStorage.removeItem("Token");
        // Force page reload after login
      window.location.reload();
  })
    .catch((error) => {
      console.error("Error during logout", error);
    })
  };
  
  React.useEffect(() => {
    console.log('User state updated:', user);
  }, [user])

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component={Link}
            to="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            WildWijs
          </Typography>

          {/* Mobile Menu */}
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="menu"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
              keepMounted
              transformOrigin={{ vertical: 'top', horizontal: 'left' }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
            >
              {pages.map(({ name, path }) => (
                <MenuItem key={name} onClick={handleCloseNavMenu}>
                  <Typography component={Link} to={path} sx={{ textDecoration: 'none', color: 'inherit' }}>
                    {name}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component={Link}
            to="/"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            WildWijs
          </Typography>

          {/* Desktop Menu */}
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map(({ name, path }) => (
              <Button
                key={name}
                component={Link}
                to={path}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {name}
              </Button>
            ))}
          </Box>

          {/* User Menu */}
          <Box sx={{ flexGrow: 0 }}>
            {user ? (
              <>
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt={user.name} src="/static/images/avatar/2.jpg" />
                </IconButton>
                <Menu
                  sx={{ mt: '45px' }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                  keepMounted
                  transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  {settings.map((setting) => (
                    <MenuItem key={setting} onClick={() => handleUserMenuClick(setting)}>
                      <Typography textAlign="center">{setting}</Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </>
            ) : (
              <Button color="inherit" onClick={() => handleOpenLoginDialog()}>Aanmelden</Button>
            )}
          </Box>
        </Toolbar>
      </Container>

      {/* Login Dialog */}
      <Dialog open={showLoginDialog} 
        onClose={(event, reason) => {
          if (reason !== 'backdropClick') {
            handleCloseSignupDialog();
          }
        }}
        slotProps={{
          paper: {
            sx: { width: '100%', maxWidth: 500 }, // Adjust as needed
          },
        }}>
      <DialogTitle sx={{ m: 0, p: 2 }}>
          Inloggen
          <IconButton
            aria-label="close"
            onClick={handleCloseLoginDialog}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <LoginForm onClose={handleCloseLoginDialog} onSwitchToSignup={handleSwitchToSignup} setUser={setUser} />        
        </DialogContent>
      </Dialog>

      {/* Signup Dialog */}
      <Dialog open={showSignupDialog} 
        onClose={(event, reason) => {
          if (reason !== 'backdropClick') {
            handleCloseSignupDialog();
          }
        }}
        slotProps={{
          paper: {
            sx: { width: '100%', maxWidth: 500 }, // Adjust as needed
          },
        }}>
        <DialogTitle sx={{ m: 0, p: 2 }}>
          Account aanmaken
          <IconButton
            aria-label="close"
            onClick={handleCloseSignupDialog}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent>
          <SignupForm onClose={handleCloseSignupDialog} />
        </DialogContent>
      </Dialog>


    </AppBar>
  );
}


export default ResponsiveAppBar;

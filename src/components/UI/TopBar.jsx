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
import DialogActions from '@mui/material/DialogActions';




const pages = [
  { name: 'Studeren', path: '/StudyMode' },
  { name: 'Encyclopedie', path: '/Encyclopedia' }
];

const settings = ['Uitloggen'];


function ResponsiveAppBar() {
  const [user, setUser] = React.useState(null);
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [showLoginDialog, setShowLoginDialog] = React.useState(false);
  const [showSignupDialog, setShowSignupDialog] = React.useState(false);
  const loginFormRef = React.useRef();
  const signupFormRef = React.useRef();


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

  const handleLoginClick = () => {
    loginFormRef.current?.submit(); // Triggers the form submission
  };

  const handleSignupClick = () => {
    signupFormRef.current?.submit(); // Triggers the form submission
  };

  const handleLogOutClick = async () => {
    const userData = JSON.parse(localStorage.getItem('user'));
    const token = userData?.token;
  
    try {
      await fetch(`${API_BASE_URL}/logout/`, {
        method: 'POST',
        headers: {
          'Authorization': `Token ${token}`, 
          'Content-Type': 'application/json',
        },
      });
    } catch (error) {
      console.error('Logout failed:', error);
    }
  
    localStorage.removeItem('user');
    setUser(null);
  };

  React.useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);
  

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
      <Dialog open={showLoginDialog} onClose={handleCloseLoginDialog}>
        <DialogTitle>Log in</DialogTitle>
        <DialogContent>
          <LoginForm ref={loginFormRef} onClose={handleCloseLoginDialog} onSwitchToSignup={handleSwitchToSignup} setUser={setUser} />        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseLoginDialog}>Annuleren</Button>
          <Button onClick={handleLoginClick} variant="contained">
            Log in
          </Button>
        </DialogActions>
      </Dialog>

      {/* Signup Dialog */}
      <Dialog open={showSignupDialog} onClose={handleCloseSignupDialog}>
        <DialogTitle>Account aanmaken</DialogTitle>
        <DialogContent>
          <SignupForm ref={signupFormRef} onClose={handleCloseSignupDialog} setUser={setUser} />        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseSignupDialog}>Annuleren</Button>
          <Button onClick={handleSignupClick} variant="contained">
            Aanmelden
          </Button>
        </DialogActions>
      </Dialog>


    </AppBar>
  );
}


export default ResponsiveAppBar;

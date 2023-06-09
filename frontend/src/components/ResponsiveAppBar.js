import * as React from 'react';
import { useState } from 'react';
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
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import logo from '../logo.png'
import avatar from '../avatar.jpg'
import { useNavigate } from 'react-router-dom';
import {useIsAuthenticated, useSignOut, useAuthUser} from 'react-auth-kit';


function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const isLoggedIn = useIsAuthenticated();
  let nav = useNavigate();
  const logOut = useSignOut();
  let pages = [];
  let settings = [];

  let authState = useAuthUser();
  let userID;
  let accessLevel;
  let path;
  let privateDestPath;
  if (isLoggedIn()) {
    pages = ['Public Destinations', 'Private Destinations'];
    userID = authState().id;
    accessLevel = authState().accessLevel;

    if(accessLevel === 0)
      settings = ['My Bucket List', 'Logout'];
    else {
      settings = ['Logout'];
      pages = ['Public Destinations'];
    }
    
    path = `/bucketList/${userID}`;
    privateDestPath = `/privateDestinationList/${userID}`;
  }
  else
    pages = ['Public Destinations'];

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = (page) => {
    setAnchorElNav(null);
    if (page === 'Public Destinations') {
      nav('/');
    } else if (page === 'Private Destinations') {
      nav(privateDestPath);
    }
  };

  const handleCloseUserMenu = (setting) => {
    setAnchorElUser(null);
    if (setting === 'Logout') {
      logOut();
      nav('/');
    }
    else {
      if(setting === 'My Bucket List'){
        nav(path);
      }
    }
};


  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
        <Avatar src={logo} alt="Logo" left='0px' sx={{ display: { xs: 'none', md: 'flex' }, marginRight: '8px', marginLeft: { md: '-6em' }, width: '65px', height: '65px'}} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
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
            Time to Travel
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
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
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={() => handleCloseNavMenu(page)}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
           {pages.map((page) => (
            <Button
              key={page}
              onClick={() => handleCloseNavMenu(page)}
              sx={{ my: 2, color: 'white', display: 'block' }}
            >
              {page}
            </Button>
          ))}
          </Box>

          {isLoggedIn() ? (
            <Box sx={{ flexGrow: 0, marginRight: { md: '-6em' }}}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="Andrei Havirneanu" src={avatar} />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: '50px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem key={setting} onClick={() => handleCloseUserMenu(setting)}>
                    <Button>{setting}</Button>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          ) : (
            <Box>
            <Button color="inherit" onClick={() => {nav('/login')}}>Log In</Button>
            <Button color="inherit" onClick={() => {nav('/register')}}>Register</Button>
          </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
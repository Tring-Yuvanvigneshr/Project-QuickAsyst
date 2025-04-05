import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import IconButton from '@mui/material/IconButton';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import ListItemIcon from '@mui/material/ListItemIcon';
import ManageAccountsOutlinedIcon from '@mui/icons-material/ManageAccountsOutlined';
import LockResetOutlinedIcon from '@mui/icons-material/LockResetOutlined';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom'
import './headder.css'

export default function Header() {
  const [anchorEl, setAnchorEl] = useState(null);
  const username = "Quickasyst Admin";
  const navigate = useNavigate();

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleProfile = () => {
    navigate('profile')
    setAnchorEl(null)
  }

  return (
    <Box>
      <AppBar position="static" className="header-appBar">
        <Toolbar className="header-toolbar">
          <div className="header-search">
            <div className="header-searchIconWrapper">
              <SearchIcon className="header-searchIcon" />
            </div>
            <InputBase
              placeholder="Search…"
              className="header-searchInput"
            />
          </div>

          <Box className="header-userBox">
            <IconButton onClick={handleMenu} disableRipple className="header-iconButton">
              <AccountCircle className="header-accountIcon" />
              <Typography onClick={handleMenu} className="header-username">{username}</Typography>
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleClose}
              className="header-menu"
              PaperProps={{
                className: 'header-menuPaper',
              }}
            >
              <MenuItem disableRipple onClick={handleProfile} className="header-menuItem">
                <ListItemIcon>
                  <ManageAccountsOutlinedIcon className="header-menuIcon" />
                </ListItemIcon>
                My Account
              </MenuItem>

              <MenuItem disableRipple onClick={handleClose} className="header-menuItem">
                <ListItemIcon>
                  <LockResetOutlinedIcon className="header-menuIcon" />
                </ListItemIcon>
                Change Password
              </MenuItem>

              <MenuItem disableRipple onClick={handleClose} className="header-menuItem">
                <ListItemIcon>
                  <LogoutIcon className="header-menuIcon" />
                </ListItemIcon>
                Sign out
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

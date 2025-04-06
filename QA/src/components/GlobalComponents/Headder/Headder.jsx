import React, { useState, useEffect } from 'react';
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

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import { signOut } from 'aws-amplify/auth';

import { GETUSERPROFILE } from './../../../Graphql/User/userQuery.js';
import { useQuery } from '@apollo/client';
import { toast } from 'react-toastify';
import { CircularProgress } from '@mui/material';

import ListItemIcon from '@mui/material/ListItemIcon';
import ManageAccountsOutlinedIcon from '@mui/icons-material/ManageAccountsOutlined';
import LockResetOutlinedIcon from '@mui/icons-material/LockResetOutlined';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom'
import './headder.css'

export default function Header() {
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const username = "Quickasyst Admin";

  const { loading, error, data } = useQuery(GETUSERPROFILE);

  useEffect(() => {
    if (error) {
      toast.error('Failed to load user profile');
    }
  }, [error]);
  
  const fullName = data ? `${data.getUserProfile.u_first_name} ${data.getUserProfile.u_last_name}` : username;

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handledialogClose = () => {
    setOpen(false);
  };


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

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/login');
    } catch (error) {
      toast.error('Failed to sign out');
    }
  };

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
            { loading ? (
              <CircularProgress />
            ) : (
              <IconButton onClick={handleMenu} disableRipple className="header-iconButton">
              <AccountCircle className="header-accountIcon" />
              <Typography onClick={handleMenu} className="header-username">{fullName}</Typography>
            </IconButton>
            )}
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

              <MenuItem
                disableRipple
                onClick={handleClickOpen}
                sx={{
                  color: '#475569',
                  fontFamily: 'glegoo',
                  fontSize: '14px',
                  marginBottom: '20px',
                  '&:hover': {
                    backgroundColor: 'transparent',
                  },
                }}
              >
                <ListItemIcon>
                  <LockResetOutlinedIcon className="header-menuIcon" />
                </ListItemIcon>
                Change Password
              </MenuItem>

              <Dialog
                open={open}
                keepMounted
                onClose={handledialogClose}
                className="password-dialog"
                PaperProps={{
                  sx: {
                    width: '550px',
                    padding: '10px 20px 10px 20px'
                  }
                }}
              >
                <DialogTitle>
                  <h3 className='Change_password_h3'>Change Password</h3>
                  <h5 className='Change_password_h5'>Enter your new password</h5>
                </DialogTitle>

                <DialogContent>
                  <DialogContentText className='Dialog-content'>
                    Old password <br />
                    <div className='old-password-container'>
                      <input type="text" placeholder='Enter old password' /><br />
                    </div>

                    New password <br />
                    <div className='new-password-container'>
                      <input type="text" placeholder='Enter new password' /><br />
                    </div>

                    Confirm password <br />
                    <div className='new-password-container'>
                      <input type="text" placeholder='Enter retype password' />
                    </div>
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button disableRipple variant="outlined" size="small" className="password-reset-btn">
                    Reset
                  </Button>
                  <Button disableRipple variant="contained" size="small" className="password-apply-btn">
                    Apply
                  </Button>
                </DialogActions>
              </Dialog>

              <MenuItem
                disableRipple
                onClick={handleSignOut}
                sx={{
                  color: '#475569',
                  fontFamily: 'glegoo',
                  fontSize: '14px',
                  marginBottom: '20px',
                  '&:hover': {
                    backgroundColor: 'transparent',
                  },
                }}
              >
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

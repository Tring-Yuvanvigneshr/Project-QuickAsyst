import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
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

import ListItemIcon from '@mui/material/ListItemIcon';
import ManageAccountsOutlinedIcon from '@mui/icons-material/ManageAccountsOutlined';
import LockResetOutlinedIcon from '@mui/icons-material/LockResetOutlined';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';


import './headder.css'

const Search = styled('div')(() => ({
  position: 'relative',
  width: '342px',
  height: '44px',
  backgroundColor: '#F3F4F6'
}));

const SearchIconWrapper = styled('div')(() => ({
  padding: '12px',
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(() => ({
  color: 'black',
  width: '100%',
  fontFamily: 'glegoo',
  fontSize: '14px',
  '& .MuiInputBase-input': {
    padding: '12px',
    paddingLeft: '44px',
  },
}));

export default function Hedder() {
  const [anchorEl, setAnchorEl] = useState(null);
  const username = "Quickasyst Admin";
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);

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

  return (
    <Box>
      <AppBar position="static" sx={{ backgroundColor: "#FFFFFF", height: "77px", boxShadow: 'none', borderBottom: '1px solid #E3E5E8', padding: '0px 10px 0px 10px' }}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', marginTop: '7px' }}>
          <Search>
            <SearchIconWrapper>
              <SearchIcon sx={{ color: '#B9BDC6' }} />
            </SearchIconWrapper>
            <StyledInputBase placeholder="Search…" />
          </Search>

          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton
              onClick={handleMenu}
              disableRipple
              sx={{
                '&:hover': {
                  backgroundColor: 'transparent',
                },
              }}
            >
              <AccountCircle sx={{ color: '#D9D9D9', fontSize: '50px', marginRight: 1 }} />
              <Typography onClick={handleMenu} sx={{ color: '#333', fontSize: '14px', fontWeight: '700', fontFamily: 'glegoo', textOverflow: 'ellipsis', maxWidth: '90px', overflow: 'hidden', whiteSpace: 'nowrap', cursor: 'pointer' }}>{username}</Typography>
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleClose}
              sx={{
                marginTop: '-7px',
              }}
              PaperProps={{
                sx: {
                  minWidth: 230,
                  fontSize: '16px',
                  padding: '0px',
                },
              }}
            >
              <MenuItem
                disableRipple
                onClick={handleProfile}
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
                  <ManageAccountsOutlinedIcon sx={{ color: '#B9BDC6' }} />
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
                  <LockResetOutlinedIcon sx={{ color: '#B9BDC6' }} />
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
                  }                }}
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
                  <Button disableRipple variant="outlined" size="small" sx={{ fontSize: '16px', textTransform: 'none', borderRadius: 0, color: 'black', width: '95px', height: '44px', fontFamily: 'Glegoo', fontWeight: '600', backgroundColor: '#f3f4f6', border: 'none' }}>Reset</Button>
                  <Button disableRipple variant="contained" size="small" sx={{ fontSize: '16px', textTransform: 'none', borderRadius: 0, width: '95px', height: '44px', fontFamily: 'Glegoo', border: 'none' }}>Apply</Button>
                </DialogActions>
              </Dialog>

              <MenuItem
                disableRipple
                onClick={handleClose}
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
                  <LogoutIcon sx={{ color: '#B9BDC6' }} />
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

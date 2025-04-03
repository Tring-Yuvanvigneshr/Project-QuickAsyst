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

import ListItemIcon from '@mui/material/ListItemIcon';
import ManageAccountsOutlinedIcon from '@mui/icons-material/ManageAccountsOutlined';
import LockResetOutlinedIcon from '@mui/icons-material/LockResetOutlined';
import LogoutIcon from '@mui/icons-material/Logout';

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

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

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
                  <ManageAccountsOutlinedIcon sx={{ color: '#B9BDC6' }} />
                </ListItemIcon>
                My Account
              </MenuItem>

              <MenuItem
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
                  <LockResetOutlinedIcon sx={{ color: '#B9BDC6' }} />
                </ListItemIcon>
                Change Password
              </MenuItem>

              <MenuItem
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

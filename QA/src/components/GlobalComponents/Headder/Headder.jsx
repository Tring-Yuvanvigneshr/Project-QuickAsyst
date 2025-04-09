import React, { useState, useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import { Avatar, CircularProgress } from '@mui/material';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import { signOut, updatePassword } from 'aws-amplify/auth';
import { GETUSERPROFILE } from './../../../Graphql/User/userQuery.js';
import { useQuery } from '@apollo/client';
import { toast } from 'react-toastify';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

import ListItemIcon from '@mui/material/ListItemIcon';
import ManageAccountsOutlinedIcon from '@mui/icons-material/ManageAccountsOutlined';
import LockResetOutlinedIcon from '@mui/icons-material/LockResetOutlined';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';
import './headder.css';

const Header = () => {

  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [oldPasswordVisible, setOldPasswordVisible] = useState(false);
  const [newPasswordVisible, setNewPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const username = 'Quickasyst Admin';

  const [errors, setErrors] = useState({
    oldPassword: false,
    confirmPassword: false,
    passwordStrength: false
  });

  const { loading, error, data } = useQuery(GETUSERPROFILE);

  useEffect(() => {
    if (error) {
      toast.error('Failed to load user profile');
    }
  }, [error]);

  const fullName = data ? `${data.get_user_profile[0].u_first_name} ${data.get_user_profile[0].u_last_name}` : username;
  const avatarUrl = data ? data.get_user_profile[0].u_avatar_url : '';

  const toggleOldPasswordVisibility = () => setOldPasswordVisible(!oldPasswordVisible);
  const toggleNewPasswordVisibility = () => setNewPasswordVisible(!newPasswordVisible);
  const toggleConfirmPasswordVisibility = () => setConfirmPasswordVisible(!confirmPasswordVisible);

  const handleClickOpen = () => {
    setOpen(true);
    setAnchorEl(null);
  };

  const handledialogClose = () => {
    setOpen(false);
    setOldPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setErrors({ oldPassword: false, newPassword: false, confirmPassword: false });
  };

  const handleMenu = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleProfile = () => {
    navigate('profile');
    setAnchorEl(null);
  };

  const handleResetPassword = () => {
    setConfirmPassword('');
    setNewPassword('');
    setOldPassword('');
    setErrors({ oldPassword: false, passwordStrength: false, confirmPassword: false });
  };

  const validatePassword = password => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  };

  const handleChangePassword = async () => {
    if (newPassword !== confirmPassword) {
      toast.error('New password and confirm password is different');
      return;
    }

    try {
      await updatePassword({ oldPassword, newPassword });
      toast.success('Password changed successfully');
      handledialogClose();
    } catch (error) {
      toast.error(error.message || 'Failed to change password');
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/login');
    } catch (error) {
      toast.error('Failed to sign out');
    }
  };

  const handleChange = (field, value) => {
    if (field === 'oldPassword') {
      setOldPassword(value);
      setErrors(prev => ({ ...prev, oldPassword: value.trim() === '' }));
    }

    if (field === 'confirmPassword') {
      setConfirmPassword(value);
      setErrors(prev => ({
        ...prev,
        confirmPassword: value.trim() === ''
      }));
    }

    if (field === 'newPassword') {
      setNewPassword(value);
      setErrors(prev => ({
        ...prev,
        passwordStrength: !validatePassword(value)
      }));
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
            <InputBase placeholder="Search…" className="header-searchInput" />
          </div>

          <Box className="header-userBox">
            {loading ? (
              <CircularProgress />
            ) : (
              <div className="header-iconButton">
                <img
                  alt={fullName}
                  src={`https://dev-admin.quickasyst.com/${avatarUrl}`}
                  onClick={handleMenu}
                  className="header-avatar"
                />
                <Typography onClick={handleMenu} className="header-username">{fullName}</Typography>
              </div>
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

              <MenuItem disableRipple onClick={handleClickOpen} className="header-menuItem">
                <ListItemIcon>
                  <LockResetOutlinedIcon className="header-menuIcon" />
                </ListItemIcon>
                Change Password
              </MenuItem>

              <MenuItem
                disableRipple
                onClick={handleSignOut}
                className="header-menuItem"
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

      {/* Change Password Dialog */}
      <Dialog
        open={open}
        keepMounted
        onClose={handledialogClose}
        className="password-dialog"
        PaperProps={{
          sx: {
            width: '550px',
            padding: '10px 20px 10px 20px',
          },
        }}
      >
        <DialogTitle>
          <div className="Change_password_h3">Change Password</div>
          <div className="Change_password_h5">Enter your new password</div>
        </DialogTitle>
        <DialogContent>
          <DialogContent className="dialog-content">
            Old password <br />
            <div className="old-password-container">
              <input
                type={oldPasswordVisible ? 'text' : 'password'}
                placeholder="Enter old password"
                value={oldPassword}
                onChange={e => handleChange('oldPassword', e.target.value)}
                className={`input-field ${errors.oldPassword ? 'error' : ''}`}
              />
              <span onClick={toggleOldPasswordVisibility}>
                {oldPasswordVisible ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
            {errors.oldPassword && (
              <div className="error-message">Old password is required</div>
            )}

            New password <br />
            <div className="new-password-container">
              <input
                type={newPasswordVisible ? 'text' : 'password'}
                name="newPassword"
                placeholder="Enter new password"
                value={newPassword}
                onChange={e => handleChange('newPassword', e.target.value)}
                className={`input-field ${errors.newPassword ? 'error' : ''}`}
              />
              <span onClick={toggleNewPasswordVisibility}>
                {newPasswordVisible ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
            {errors.passwordStrength && (
              <div className="error-message">Your password is weak</div>
            )}

            Confirm password <br />
            <div className="confirm-password-container">
              <input
                type={confirmPasswordVisible ? 'text' : 'password'}
                name="confirmPassword"
                placeholder="Confirm new password"
                value={confirmPassword}
                onChange={e => handleChange('confirmPassword', e.target.value)}
                className={`input-field ${errors.confirmPassword ? 'error' : ''}`}
              />
              <span onClick={toggleConfirmPasswordVisibility}>
                {confirmPasswordVisible ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
            {errors.confirmPassword && (
              <div className="error-message">Confirm password is required</div>
            )}
          </DialogContent>
        </DialogContent>


        <DialogActions>
          <Button
            disableRipple
            variant="outlined"
            size="small"
            className="password-reset-btn"
            onClick={handleResetPassword}
          >
            Reset
          </Button>
          <Button
            disableRipple
            variant="contained"
            size="small"
            className="password-apply-btn"
            onClick={handleChangePassword}
            disabled={
              errors.oldPassword || errors.passwordStrength || errors.confirmPassword
            }
          >
            Apply
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};
export default Header;

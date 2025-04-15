import React, { useState } from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Button
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { updatePassword, signOut } from 'aws-amplify/auth';
import { useNavigate } from 'react-router-dom';
import './changepassword.css'

const ChangePasswordDialog = ({ open, onClose }) => {
  const navigate = useNavigate();

  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({
    oldPassword: false,
    confirmPassword: false,
    passwordStrength: false
  });

  const [oldPasswordVisible, setOldPasswordVisible] = useState(false);
  const [newPasswordVisible, setNewPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  };

  const handleChange = (field, value) => {
    if (field === 'oldPassword') {
      setOldPassword(value);
      setErrors((prev) => ({ ...prev, oldPassword: value.trim() === '' }));
    }

    if (field === 'confirmPassword') {
      setConfirmPassword(value);
      setErrors((prev) => ({ ...prev, confirmPassword: value.trim() === '' }));
    }

    if (field === 'newPassword') {
      setNewPassword(value);
      setErrors((prev) => ({
        ...prev,
        passwordStrength: !validatePassword(value)
      }));
    }
  };

  const handleResetPassword = () => {
    setOldPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setErrors({
      oldPassword: false,
      confirmPassword: false,
      passwordStrength: false
    });
  };

  const handleChangePassword = async () => {
    if (newPassword !== confirmPassword) {
      toast.error('New password and confirm password is different');
      return;
    }

    if (oldPassword === newPassword) {
      toast.error('New password and old password is same');
      return;
    }

    try {
      await updatePassword({ oldPassword, newPassword });
      toast.success('Password changed successfully');
      handleResetPassword();
      onClose();
      await signOut();
      navigate('/login');
    } catch (error) {
      toast.error(error.message || 'Failed to change password');
    }
  };

  return (
    <Dialog
      open={open}
      keepMounted
      onClose={onClose}
      className="password-dialog"
      PaperProps={{ sx: { width: '550px', borderRadius: '0px' } }}
    >
      <DialogTitle className="change-password-headder">
        <div>
          <div className="change_password_h3">Change Password</div>
          <div className="change_password_h5">Enter your new password</div>
        </div>
        <IconButton disableRipple onClick={onClose} color="inherit">
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent>
        <DialogContent className="dialog-content">
          Old password <br />
          <div className="old-password-container">
            <input
              type={oldPasswordVisible ? 'text' : 'password'}
              placeholder="Enter old password"
              value={oldPassword}
              onChange={(e) => handleChange('oldPassword', e.target.value)}
              className={`input-field ${errors.oldPassword ? 'error' : ''}`}
            />
            <span onClick={() => setOldPasswordVisible((prev) => !prev)}>
              {oldPasswordVisible ? <FaEyeSlash color="#cad2df" /> : <FaEye color="#cad2df" />}
            </span>
          </div>
          {errors.oldPassword && <div className="error-message">Old password is required</div>}

          New password <br />
          <div className="new-password-container">
            <input
              type={newPasswordVisible ? 'text' : 'password'}
              placeholder="Enter new password"
              value={newPassword}
              onChange={(e) => handleChange('newPassword', e.target.value)}
              className={`input-field ${(errors.newPassword || errors.passwordStrength) ? 'error' : ''}`}
            />
            <span onClick={() => setNewPasswordVisible((prev) => !prev)}>
              {newPasswordVisible ? <FaEyeSlash color="#cad2df" /> : <FaEye color="#cad2df" />}
            </span>
          </div>
          {errors.passwordStrength && (
            <div className="error-message">
              Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character
            </div>
          )}

          Retype password <br />
          <div className="confirm-password-container">
            <input
              type={confirmPasswordVisible ? 'text' : 'password'}
              placeholder="Enter retype password"
              value={confirmPassword}
              onChange={(e) => handleChange('confirmPassword', e.target.value)}
              className={`input-field ${errors.confirmPassword ? 'error' : ''}`}
            />
            <span onClick={() => setConfirmPasswordVisible((prev) => !prev)}>
              {confirmPasswordVisible ? <FaEyeSlash color="#cad2df" /> : <FaEye color="#cad2df" />}
            </span>
          </div>
          {errors.confirmPassword && (
            <div className="error-message">Confirm password is required</div>
          )}
        </DialogContent>
      </DialogContent>

      <DialogActions className="change-password-actions">
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
          disabled={errors.oldPassword || errors.passwordStrength || errors.confirmPassword}
        >
          Apply
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ChangePasswordDialog;

import React, { useState, useEffect } from 'react';
import './profile.css';
import defaultImage from './../../assets/images/Defaultprofile.png';
import { TextField, Button, IconButton, CircularProgress } from '@mui/material';
import { Cancel } from '@mui/icons-material';

import { GETUSERPROFILE } from './../../Graphql/User/userQuery';
import { useQuery } from '@apollo/client';
import { toast } from 'react-toastify';

const Profile = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [fullName, setFullName] = useState('Quickasyst Admin');
    const [phoneNumber, setPhoneNumber] = useState('(123) 456-6575');
    const [email, setEmail] = useState('quickasyst@mailinator.com');
    const [profileImage, setProfileImage] = useState(defaultImage);
    const [nameChange, setNameChange] = useState('')
    const [phoneChange, setPhoneChange] = useState('')
    const [] = useState()

    const [errors, setErrors] = useState({
        fullName: false,
        phoneNumber: false,
    });

    const { loading, error, data } = useQuery(GETUSERPROFILE, {
        fetchPolicy: 'network-only'
    });

    useEffect(() => {
        if (error) {
            toast.error('Failed to load profile data');
        }
    }, [error]);

    useEffect(() => {
        if (data) {
            setFullName(`${data.get_user_profile[0].u_first_name} ${data.get_user_profile[0].u_last_name}`);
            setPhoneNumber(data.get_user_profile[0].u_phone_number);
            setEmail(data.get_user_profile[0].u_email_id);

            setNameChange(`${data.get_user_profile[0].u_first_name} ${data.get_user_profile[0].u_last_name}`)
            setPhoneChange(data.get_user_profile[0].u_phone_number)
        }
    }, [data]);

    const handleResetImage = () => {
        setProfileImage(defaultImage);
    };

    const handleCancelEdit = () => {
        setNameChange(fullName);
        setPhoneChange(phoneNumber);
        setIsEditing(false);
        setErrors({ fullName: false, phoneNumber: false });
    };

    const handleSubmitEdit = () => {
            toast.success('Profile updated successfully');
            setIsEditing(false);
    };

    const handleChange = (field, value) => {
        if (field === 'fullName') {
            setNameChange(value);
            setErrors(prev => ({ ...prev, fullName: value.trim() === '' }));
        } else if (field === 'phoneNumber') {
            setPhoneChange(value);
            setErrors(prev => ({ ...prev, phoneNumber: value.trim() === '' }));
        }
    };
    

    return (
        <div className='Profile_container'>
            <div className='Profile_headder'>
                <h2>My Account</h2>
                {!isEditing && (
                    <button className='Profile-edit' onClick={() => setIsEditing(true)}>
                        Edit Profile
                    </button>
                )}
            </div>

            <div className='Profile-body'>
                <div className='profile-top-img'>
                    <div className='profile-img-container'>
                        <label className='profile-img'>
                            <img className='profile-pic' src={profileImage} alt="profile" />
                            {isEditing && (
                                <IconButton
                                    disableRipple
                                    onClick={handleResetImage}
                                    className='image_remove_icon'
                                >
                                    <Cancel className='cancel-icon' sx={{ color: '#ff0000' }} />
                                </IconButton>
                            )}
                        </label>
                    </div>
                </div>

                {loading ? (
                    <CircularProgress sx={{ marginTop: '80px' }} />
                ) : (
                    <>
                        {!isEditing ? (
                            <div className='Profile-content'>
                                <div className='Profile-row'>
                                    <div className='Profile-item'>Full Name</div>
                                    <div className='Profile-item Profile-item-right'>{fullName}</div>
                                </div>

                                <div className='Profile-row'>
                                    <div className='Profile-item'>Phone Number</div>
                                    <div className='Profile-item Profile-item-right'>{phoneNumber}</div>
                                </div>

                                <div className='Profile-row'>
                                    <div className='Profile-item'>Email</div>
                                    <div className='Profile-item Profile-item-right'>{email}</div>
                                </div>
                            </div>
                        ) : (
                            <div className='Profile-content-edit'>
                                <div className='Profile-edit-row'>
                                    <div className='Profile-item'>Full Name</div>
                                    <div>
                                        <TextField
                                            fullWidth
                                            value={nameChange}
                                            onChange={(e) => handleChange('fullName', e.target.value)}
                                        />
                                    {errors.fullName && <p className="error-message"><br/>Full Name is required</p>}
                                    </div>
                                </div>

                                <div className='Profile-edit-row'>
                                    <div className='Profile-item'>Phone Number</div>
                                    <div>
                                        <TextField
                                            fullWidth
                                            value={phoneChange}
                                            onChange={(e) => handleChange('phoneNumber', e.target.value)}
                                            />
                                        {errors.phoneNumber && <p className="error-message"><br/>Phone Number is required</p>}
                                    </div>
                                </div>

                                <div className='Profile-edit-row'>
                                    <div className='Profile-item'>Email</div>
                                    <div className='edit-email'>
                                        <TextField
                                            fullWidth
                                            value={email}
                                            disabled
                                        />
                                    </div>
                                </div>

                                <div className='Profile-edit-buttons'>
                                    <Button
                                        disableRipple
                                        onClick={handleCancelEdit}
                                        className="profile-cancel-button"
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        disableRipple
                                        variant="contained"
                                        onClick={handleSubmitEdit}
                                        className="profile-submit-button"
                                        disabled={errors.fullName || errors.phoneNumber}
                                    >
                                        Submit
                                    </Button>
                                </div>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default Profile;

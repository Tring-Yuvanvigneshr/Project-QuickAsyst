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

    const { loading, error, data } = useQuery(GETUSERPROFILE);

    useEffect(() => {
        if (error) {
            toast.error('Failed to load profile data');
        }
    }, [error]);

    useEffect(() => {
        if (data) {
            setFullName(`${data.getUserProfile.u_first_name} ${data.getUserProfile.u_last_name}`);
            setPhoneNumber(data.getUserProfile.u_phone_number);
            setEmail(data.getUserProfile.u_email_id);
        }
    }, [data]);

    const handleResetImage = () => {
        setProfileImage(defaultImage);
    };

    const handleCancelEdit = () => {
        setIsEditing(false);
    }

    const handleSubmitEdit = () => {
        toast.success('Profile updated successfully');
        setIsEditing(false);
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
                                            value={fullName}
                                            onChange={(e) => setFullName(e.target.value)}
                                        />
                                    </div>
                                </div>

                                <div className='Profile-edit-row'>
                                    <div className='Profile-item'>Phone Number</div>
                                    <div className=''>
                                        <TextField
                                            fullWidth
                                            value={phoneNumber}
                                            onChange={(e) => setPhoneNumber(e.target.value)}
                                        />
                                    </div>
                                </div>

                                <div className='Profile-edit-row'>
                                    <div className='Profile-item'>Email</div>
                                    <div className='edit-email'>
                                        <TextField
                                            fullWidth
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            disabled
                                        />
                                    </div>
                                </div>

                                <div className='Profile-edit-buttons'>
                                    <Button
                                        disableRipple
                                        onClick={handleCancelEdit}
                                        sx={{ fontSize: '16px', textTransform: 'none', borderRadius: 0, color: 'black', width: '95px', height: '44px', fontFamily: 'Glegoo', fontWeight: '600', backgroundColor: '#f3f4f6' }}
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        disableRipple
                                        variant="contained"
                                        onClick={handleSubmitEdit}
                                        sx={{ fontSize: '16px', textTransform: 'none', borderRadius: 0, width: '95px', height: '44px', fontFamily: 'Glegoo', border: 'none' }}
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

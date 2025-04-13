import React, { useState, useEffect } from 'react';
import './profile.css';
import defaultImage from './../../assets/images/Defaultprofile.png';
import { Button, IconButton, CircularProgress } from '@mui/material';
import { Cancel } from '@mui/icons-material';
import { GETUSERPROFILE } from '../../graphql/User/userQuery';
import { UPDATEUSERPROFILE } from '../../Graphql/User/userMutation';
import { useQuery, useMutation, useLazyQuery } from '@apollo/client';
import { toast } from 'react-toastify';
import { GETUPLOADSIGNEDURL } from '../../graphql/S3/getUploadSignedUrl';
import axios from 'axios';

const Profile = () => {
    const dev = import.meta.env.VITE_DEV;
    const [isEditing, setIsEditing] = useState(false);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState(null);
    const [email, setEmail] = useState('');
    const [profileImage, setProfileImage] = useState();
    const [imageFile, setImageFile] = useState(null);
    let imageSrc;

    const [errors, setErrors] = useState({
        firstName: false,
        lastName: false,
        phoneNumber: false,
    });

    const { loading: profileLoading, error: profileError, data } = useQuery(GETUSERPROFILE, {
        fetchPolicy: 'network-only',
    });

    const [updateProfile, { loading: updateLoading, error: updateError }] = useMutation(UPDATEUSERPROFILE);
    const [getSignedUrl] = useLazyQuery(GETUPLOADSIGNEDURL);

    useEffect(() => {
        if (profileError) {
            toast.error('Failed to load profile data');
        }
    }, [profileError]);

    useEffect(() => {
        if (data) {
            const user = data.get_user_profile[0];
            setFirstName(user.u_first_name);
            setLastName(user.u_last_name);
            setPhoneNumber(user.u_phone_number);
            setEmail(user.u_email_id);
            setProfileImage(user.u_avatar_url || defaultImage);
        }
    }, [data]);

    const handleResetImage = () => {
        setProfileImage(data.get_user_profile[0].u_avatar_url);
    };

    const handleCancelEdit = () => {
        setFirstName(data.get_user_profile[0].u_first_name);
        setLastName(data.get_user_profile[0].u_last_name);
        setPhoneNumber(data.get_user_profile[0].u_phone_number);
        setImageFile(null);
        setIsEditing(false);
        setErrors({ firstName: false, lastName: false, phoneNumber: false });
    };

    const handleChange = (field, value) => {
        if (field === 'firstName') {
            setFirstName(value);
            setErrors(prev => ({ ...prev, firstName: value.trim() === '' }));
        } else if (field === 'lastName') {
            setLastName(value);
            setErrors(prev => ({ ...prev, lastName: value.trim() === '' }));
        } else if (field === 'phoneNumber') {
            setPhoneNumber(value);
            setErrors(prev => ({ ...prev, phoneNumber: value.trim() === '' }));
        }
    };

    const handleSubmitEdit = async () => {
        try {
            let updatedProfileImage = profileImage;

            if (imageFile) {
                const key = `images/${imageFile.name}`;
                const bucketName = import.meta.env.VITE_BUCKET_NAME;

                const { data: signedData } = await getSignedUrl({
                    variables: { bucketName, key }
                });

                const { preSignedUrl } = signedData.getUploadSignedUrl;

                console.log(preSignedUrl);

                await axios.put(preSignedUrl, imageFile);

                updatedProfileImage = key;
            }

            const input = {
                u_first_name: firstName,
                u_last_name: lastName,
                u_phone_number: phoneNumber,
                u_avatar_url: updatedProfileImage,
            };

            await updateProfile({
                variables: { emailId: email, input },
                refetchQueries: [{ query: GETUSERPROFILE }],
            });

            toast.success('Profile updated successfully');
            setIsEditing(false);
        } catch (error) {
            console.error('Error:', error);
            toast.error('Failed to update profile');
        }
    };

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setImageFile(file);
            const imageUrl = URL.createObjectURL(file);
            setProfileImage(imageUrl);
        }
    };

    if (profileImage) {
        if (profileImage.startsWith('blob:')) {
            imageSrc = profileImage;
        } else {
            imageSrc = `${dev}${profileImage}`;
        }
    } else {
        imageSrc = defaultImage;
    }

    return (
        <div className='profile_container'>
            <div className='profile_headder'>
                <h2>My Account</h2>
                {!isEditing && (
                    <button className='profile-edit' onClick={() => setIsEditing(true)}>
                        Edit Profile
                    </button>
                )}
            </div>

            <div className='profile-body'>
                <div className='profile-top-img'>
                    <div className='profile-img-container'>
                        <label className='profile-img'>
                            <div className='profile-pic-container'>
                                <img className='profile-pic' src={imageSrc} alt="profile" />
                                {isEditing && <div className='overlay'>Upload</div>}
                            </div>
                            {isEditing && (
                                <div>
                                    <input
                                        type='file'
                                        accept='image/*'
                                        style={{ display: 'none' }}
                                        onChange={handleImageChange}
                                    />
                                    <IconButton
                                        disableRipple
                                        onClick={handleResetImage}
                                        className='image_remove_icon'
                                    >
                                        <Cancel className='cancel-icon' sx={{ color: '#ff0000' }} />
                                    </IconButton>
                                </div>
                            )}
                        </label>
                    </div>
                </div>

                {profileLoading ? (
                    <CircularProgress sx={{ marginTop: '80px' }} />
                ) : (
                    <>
                        {!isEditing ? (
                            <div className='profile-content'>
                                <div className='profile-row'>
                                    <div className='profile-item'>Full Name</div>
                                    <div className='profile-item profile-item-right'>{firstName} {lastName}</div>
                                </div>

                                <div className='profile-row'>
                                    <div className='profile-item'>Phone Number</div>
                                    <div className='profile-item profile-item-right'>{phoneNumber}</div>
                                </div>

                                <div className='profile-row'>
                                    <div className='profile-item'>Email</div>
                                    <div className='profile-item profile-item-right'>{email}</div>
                                </div>
                            </div>
                        ) : (
                            <div className='profile-content-edit'>
                                <div className='profile-edit-row'>
                                    <div className='profile-item'>First Name</div>
                                    <div className='change-password-input'>
                                        <input
                                            fullWidth
                                            value={firstName}
                                            onChange={(e) => handleChange('firstName', e.target.value)}
                                            className='profile-edit-input'
                                        />
                                        {errors.firstName && <span className="change-password-error-message">First Name is required</span>}
                                    </div>
                                </div>

                                <div className='profile-edit-row'>
                                    <div className='profile-item'>Last Name</div>
                                    <div className='change-password-input'>
                                        <input
                                            fullWidth
                                            value={lastName}
                                            onChange={(e) => handleChange('lastName', e.target.value)}
                                            className='profile-edit-input'
                                        />
                                        {errors.lastName && <span className="change-password-error-message">Last Name is required</span>}
                                    </div>
                                </div>

                                <div className='profile-edit-row'>
                                    <div className='profile-item'>Phone Number</div>
                                    <div className='change-password-input'>
                                        <input

                                            value={phoneNumber}
                                            onChange={(e) => handleChange('phoneNumber', e.target.value)}
                                            className='profile-edit-input'
                                        />
                                        {errors.phoneNumber && <span className="change-password-error-message">Phone Number is invalid</span>}
                                    </div>
                                </div>

                                <div className='profile-edit-row'>
                                    <div className='profile-item'>Email</div>
                                    <div className='edit-email change-password-input'>
                                        <input
                                            fullWidth
                                            value={email}
                                            disabled
                                            className='profile-edit-input'
                                        />
                                    </div>
                                </div>

                                <div className='profile-edit-buttons'>
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
                                        disabled={errors.firstName || errors.lastName || errors.phoneNumber || updateLoading}
                                    >
                                        {updateLoading ? 'loading...' : 'Save Changes'}
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

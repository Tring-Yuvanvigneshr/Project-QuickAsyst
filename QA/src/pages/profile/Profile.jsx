    import React, { useState, useEffect } from 'react';
    import './profile.css';
    import defaultImage from './../../assets/images/Defaultprofile.png';
    import { TextField, Button, IconButton, CircularProgress } from '@mui/material';
    import { Cancel } from '@mui/icons-material';
    import { GETUSERPROFILE } from './../../Graphql/User/userQuery';
    import { UPDATEUSERPROFILE } from './../../Graphql/User/userMutation';
    import { useQuery, useMutation, useLazyQuery } from '@apollo/client';
    import { toast } from 'react-toastify';
    import { GETUPLOADSIGNEDURL } from './../../Graphql/S3/GetUploadSignedUrl';
    import axios from 'axios';

    const Profile = () => {
        const [isEditing, setIsEditing] = useState(false);
        const [firstName, setFirstName] = useState('Quickasyst');
        const [lastName, setLastName] = useState('Admin');
        const [phoneNumber, setPhoneNumber] = useState('(123) 456-6575');
        const [email, setEmail] = useState('quickasyst@mailinator.com');
        const [profileImage, setProfileImage] = useState();
        const [imageFile, setImageFile] = useState(null);

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
                    const key = `profile-images/${email}-${Date.now()}-${imageFile.name}`;
                    const bucketName = import.meta.env.VITE_BUCKET_NAME;

                    console.log('Generating signed URL for the image upload...');
                    const { data: signedData } = await getSignedUrl({
                        variables: { bucketName, key }
                    });

                    console.log('Signed Data:', signedData);
                    const { preSignedUrl } = signedData.getUploadSignedUrl;

                    console.log('Pre-Signed URL:', preSignedUrl);
                    console.log('File:', imageFile);

                    await axios.put(preSignedUrl, imageFile, {
                        headers: {
                            'Content-Type': imageFile.type
                        }
                    });

                    updatedProfileImage = key;
                }

                const input = {
                    u_first_name: firstName,
                    u_last_name: lastName,
                    u_phone_number: phoneNumber,
                    u_avatar_url: updatedProfileImage,
                };

                await updateProfile({
                    variables: { emailId: email, input }
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
                                <input
                                    type='file'
                                    accept='image/*'
                                    style={{ display: 'none' }}
                                    onChange={handleImageChange}
                                />
                                <img className='profile-pic' src={profileImage ? `https://dev-admin.quickasyst.com/${profileImage}` : defaultImage} alt="profile" />
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

                    {profileLoading ? (
                        <CircularProgress sx={{ marginTop: '80px' }} />
                    ) : (
                        <>
                            {!isEditing ? (
                                <div className='profile-content'>
                                    <div className='profile-row'>
                                        <div className='profile-item'>Full Name</div>
                                        <div className='profile-item Profile-item-right'>{firstName} {lastName}</div>
                                    </div>

                                    <div className='profile-row'>
                                        <div className='profile-item'>Phone Number</div>
                                        <div className='profile-item Profile-item-right'>{phoneNumber}</div>
                                    </div>

                                    <div className='profile-row'>
                                        <div className='profile-item'>Email</div>
                                        <div className='profile-item Profile-item-right'>{email}</div>
                                    </div>
                                </div>
                            ) : (
                                <div className='profile-content-edit'>
                                    <div className='profile-edit-row'>
                                        <div className='profile-item'>First Name</div>
                                        <div>
                                            <TextField
                                                fullWidth
                                                value={firstName}
                                                onChange={(e) => handleChange('firstName', e.target.value)}
                                            />
                                            {errors.firstName && <label className="error-message"><br />First Name is required</label>}
                                        </div>
                                    </div>

                                    <div className='profile-edit-row'>
                                        <div className='profile-item'>Last Name</div>
                                        <div>
                                            <TextField
                                                fullWidth
                                                value={lastName}
                                                onChange={(e) => handleChange('lastName', e.target.value)}
                                            />
                                            {errors.lastName && <label className="error-message"><br />Last Name is required</label>}
                                        </div>
                                    </div>

                                    <div className='profile-edit-row'>
                                        <div className='profile-item'>Phone Number</div>
                                        <div>
                                            <TextField
                                                fullWidth
                                                value={phoneNumber}
                                                onChange={(e) => handleChange('phoneNumber', e.target.value)}
                                            />
                                            {errors.phoneNumber && <label className="error-message"><br />Phone Number is invalid</label>}
                                        </div>
                                    </div>

                                    <div className='profile-edit-row'>
                                        <div className='profile-item'>Email</div>
                                        <div className='edit-email'>
                                            <TextField
                                                fullWidth
                                                value={email}
                                                disabled
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
                                            {updateLoading ? 'loading...' : 'Submit'}
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

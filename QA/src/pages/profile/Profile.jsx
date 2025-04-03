import React from 'react'
import './profile.css'
import defaultImage from './../../assets/images/Defaultprofile.png';

const Profile = () => {
    return (
        <div className='Profile_container'>
            <div className='Profile_headder'>
                <h2>My Account</h2>
                <button className='Profile-edit'>Edit Profile</button>
            </div>
            <div className='Profile-body'>
                <div className='profile-top-img'>
                    <label className='profile-img'>
                        <img className='profile-pic' src={defaultImage} alt="background" />
                    </label>
                </div>
                <div className='Profile-content'>
                    <div className='Profile-row'>
                        <div className='Profile-item'>Full Name</div>
                        <div className='Profile-item Profile-item-right'>Quickasyst Admin</div>
                    </div>
                    <div className='Profile-row'>
                        <div className='Profile-item'>Phone Number</div>
                        <div className='Profile-item Profile-item-right'>(123) 456-6575</div>
                    </div>
                    <div className='Profile-row'>
                        <div className='Profile-item'>Email</div>
                        <div className='Profile-item Profile-item-right'>quickasyst@mailinator.com</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile
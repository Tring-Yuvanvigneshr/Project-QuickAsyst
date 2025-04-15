import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { debounce } from 'lodash';
import { toast } from 'react-toastify';
import { useQuery, useLazyQuery } from '@apollo/client';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import ListItemIcon from '@mui/material/ListItemIcon';
import CircularProgress from '@mui/material/CircularProgress';
import ManageAccountsOutlinedIcon from '@mui/icons-material/ManageAccountsOutlined';
import LockResetOutlinedIcon from '@mui/icons-material/LockResetOutlined';
import LogoutIcon from '@mui/icons-material/Logout';

import { signOut } from 'aws-amplify/auth';
import { GETUSERPROFILE, SEARCHUSERSANDTICKETSBYMARKETINGUSER } from '../../../graphql/User/userQuery.js';

import ChangePasswordDialog from '../../Changepassword/Changepassworddialog.jsx';
import { LeagueContext } from '../../../context/Leaguecontext.jsx';
import './header.css';

const Header = () => {
  const dev = import.meta.env.VITE_DEV;
  const navigate = useNavigate();
  const { setLeagueName } = useContext(LeagueContext);

  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);

  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  const { loading, error, data } = useQuery(GETUSERPROFILE, {
    fetchPolicy: 'network-only'
  });

  const [searchEvents, { data: searchData }] = useLazyQuery(
    SEARCHUSERSANDTICKETSBYMARKETINGUSER,
    { fetchPolicy: 'network-only' }
  );

  useEffect(() => {
    if (error) {
      toast.error('Failed to load user profile');
    }
  }, [error]);

  useEffect(() => {
    if (searchData?.events) {
      setSearchResults(searchData.events);
    }
  }, [searchData]);

  const fullName = `${data?.get_user_profile[0].u_first_name} ${data?.get_user_profile[0].u_last_name}`;
  const avatarUrl = data?.get_user_profile[0].u_avatar_url || '';

  const handleMenu = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const handleClickOpen = () => {
    setOpen(true);
    setAnchorEl(null);
  };

  const handledialogClose = () => setOpen(false);

  const handleProfile = () => {
    navigate('profile');
    setAnchorEl(null);
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/login');
    } catch (error) {
      toast.error('Failed to sign out');
    }
  };

  const debouncedSearch = debounce((query) => {
    if (query.trim().length >= 2) {
      searchEvents({
        variables: {
          pageSize: 10,
          pageOffset: 0,
          order_by: { u_first_name: 'asc' },
          searchEvent: `%${query}%`,
          searchText: `${query}%`
        }
      });
    } else {
      setSearchResults([]);
    }
  }, 500);

  const handleSearchChange = (event) => {
    const value = event.target.value;
    setSearchTerm(value);

    if (value.trim().length >= 2) {
      debouncedSearch.cancel();
      debouncedSearch(value);
      setShowDropdown(true);
    } else {
      setLeagueName('%');
      setSearchResults([]);
      setShowDropdown(false);
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
              value={searchTerm}
              onChange={handleSearchChange}
            />
            {searchTerm && (
              <CloseIcon
                onClick={() => {
                  setSearchTerm('');
                  setSearchResults([]);
                  setShowDropdown(false);
                  setLeagueName('%');
                }}
                className="search-close-icon"
              />
            )}

            {showDropdown && (
              <div className="custom-dropdown">
                {searchResults.length === 0 ? (
                  <div className="custom-dropdown-item no-result">
                    <div>No results found</div>
                  </div>
                ) : (
                  searchResults.map((event) => (
                    <div
                      key={event.id}
                      className="custom-dropdown-item"
                      onClick={() => {
                        const leagueId = event?.e_name;
                        setSearchTerm(event?.e_name);
                        setLeagueName(leagueId);
                        setSearchResults([]);
                        setShowDropdown(false);
                      }}
                    >
                      <div>{event.e_name}</div>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>

          <Box className="header-userBox">
            {loading ? (
              <CircularProgress />
            ) : (
              <div className="header-iconButton">
                <img
                  alt={fullName}
                  src={`${dev}${avatarUrl}`}
                  onClick={handleMenu}
                  className="header-avatar"
                />
                <Typography onClick={handleMenu} className="header-username">
                  {fullName}
                </Typography>
              </div>
            )}

            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleClose}
              className="header-menu"
              PaperProps={{ className: 'header-menuPaper' }}
            >
              <MenuItem onClick={handleProfile} className="header-menuItem">
                <ListItemIcon>
                  <ManageAccountsOutlinedIcon className="header-menuIcon" />
                </ListItemIcon>
                My Account
              </MenuItem>

              <MenuItem onClick={handleClickOpen} className="header-menuItem">
                <ListItemIcon>
                  <LockResetOutlinedIcon className="header-menuIcon" />
                </ListItemIcon>
                Change Password
              </MenuItem>

              <MenuItem onClick={handleSignOut} className="header-menuItem">
                <ListItemIcon>
                  <LogoutIcon className="header-menuIcon" />
                </ListItemIcon>
                Sign out
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>

      <ChangePasswordDialog open={open} onClose={handledialogClose} />
    </Box>
  );
};

export default Header;

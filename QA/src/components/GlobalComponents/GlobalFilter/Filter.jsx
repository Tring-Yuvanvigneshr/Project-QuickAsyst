import React, { useState } from 'react';
import { Box, Button, MenuItem, Select, Radio, RadioGroup, FormControlLabel, Slider, Typography, IconButton, CircularProgress } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';
import { useLazyQuery } from '@apollo/client';
import { LEAGUESDROPDOWNFILTER } from './../../../Graphql/User/userQuery';
import { IoIosArrowDown } from 'react-icons/io';
import './Filter.css';

const Filter = ({ onApply, Attributes, onClose, validationOptions, filter }) => {
    const [filters, setFilters] = useState({
        leagueId: filter.leagueId || "",
        ticketStatus: filter.ticketStatus || "",
        startdate: filter.startdate || "",
        enddate: filter.enddate || "",
        day: filter.enddate || 1,
    });

    const [getEvents, { data, loading }] = useLazyQuery(LEAGUESDROPDOWNFILTER, {
        fetchPolicy: 'network-only'
    });

    const handleReset = () => {
        setFilters({ leagueId: null, ticketStatus: null, startdate: null, enddate: null, day: null });
        onApply({ leagueId: null, ticketStatus: null, startdate: null, enddate: null, day: null });
    };

    const submitFilter = () => {
        onApply(filters);
        onClose();
    };

    const handleSelectOpen = () => {
        getEvents();
    };

    const handleLeagueChange = event => {
        const selectedLeagueName = event.target.value;
        const selectedLeague = data?.leagues?.find(league => league.l_name === selectedLeagueName);
        setFilters({ ...filters, leagueId: selectedLeague ? selectedLeague.l_id : '' });
    };

    return (
        <Box className="filter-box">
            <div className="filter-header">
                <Typography variant="h6" className="filter-title">Filter</Typography>
                <IconButton disableRipple onClick={onClose} className="close-icon">
                    <CloseIcon />
                </IconButton>
            </div>

            {Attributes.includes("Event") && (
                <>
                    <Typography className="filter-section-title">Event</Typography>
                    <Select
                        className="Filter-select-event"
                        fullWidth
                        size="small"
                        value={filters.leagueId || ''}
                        onChange={handleLeagueChange}
                        onOpen={handleSelectOpen}
                        displayEmpty
                        IconComponent={IoIosArrowDown}
                        MenuProps={{
                            PaperProps: {
                                style: {
                                    maxHeight: 200,
                                    overflowY: 'auto'
                                },
                            },
                        }}
                        renderValue={selected => {
                            if (!selected) {
                                return <div style={{ color: '#B9BDC6'}}>-select-</div>;
                            }
                            const selectedLeague = data?.leagues?.find(league => league.l_id === selected);
                            return selectedLeague ? selectedLeague.l_name : selected;
                        }}
                    >
                        {loading ? (
                            <MenuItem disabled>
                                <Box display="flex" alignItems="center" gap={1}>
                                    <CircularProgress size={20} color="inherit" />
                                </Box>
                            </MenuItem>
                        ) : (
                            data?.leagues?.map(event => (
                                <MenuItem className='filter-menuitems' key={event.l_id} value={event.l_name}>
                                    {event.l_name}
                                </MenuItem>
                            ))
                        )}

                        {!loading && data?.leagues?.length === 0 && (
                            <MenuItem disabled>No Events Available</MenuItem>
                        )}
                    </Select>
                </>
            )}

            {Attributes.includes("Validate") && (
                <>
                    <Typography className="filter-section-title">{Attributes.includes('Manage') ? 'Validate' : 'Status'}</Typography>
                    <RadioGroup
                        value={filters.ticketStatus}
                        onChange={e => setFilters({ ...filters, ticketStatus: e.target.value })}
                        style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', color: '#475569' }}
                    >
                        {validationOptions.map((val) => (
                            <FormControlLabel
                                key={val}
                                value={val}
                                control={<Radio size="small" />}
                                label={val.charAt(0).toUpperCase() + val.slice(1)}
                            />
                        ))}
                    </RadioGroup>
                </>
            )}

            {Attributes.includes("Date") && (
                <>
                    <Typography className="filter-section-title">Date</Typography>
                    <Box style={{ display: 'grid', gap: '0.7rem' }}>
                        {['Today', 'Yesterday', 'Last 30 Days', 'This Month', 'Last Month'].map((option) => (
                            <Box
                                key={option}
                                onClick={() => setFilters({ ...filters, startdate: option })}
                                className="date-option"
                            >
                                <span>{option}</span>
                                {filters.startdate === option && <CheckIcon style={{ color: '#5D75F8' }} />}
                            </Box>
                        ))}
                    </Box>
                </>
            )}

            {Attributes.includes("Period left") && (
                <>
                    <Typography className="filter-section-title">Period Left</Typography>
                    <Slider
                        value={filters.day}
                        min={1}
                        max={7}
                        step={1}
                        onChange={(e, newValue) => setFilters({ ...filters, day: newValue })}
                        valueLabelDisplay="auto"
                        sx={{
                            "& .MuiSlider-thumb": {
                                height: '18px',
                                width: '25px',
                                borderRadius: '0px',
                                marginLeft: '12px',
                                backgroundColor: '#5d75f8'
                            }
                        }}
                    />
                </>
            )}

            <Box className="button-container">
                <Button disableRipple className="button-reset" onClick={handleReset}>Reset</Button>
                <Button disableRipple variant="contained" className="button-filter-submit" onClick={submitFilter}>Apply</Button>
            </Box>
        </Box>
    );
};

export default Filter;

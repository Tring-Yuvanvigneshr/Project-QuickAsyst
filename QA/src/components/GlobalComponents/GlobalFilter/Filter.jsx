import React, { useState, useEffect } from 'react';
import { Box, Button, MenuItem, Select, Radio, RadioGroup, FormControlLabel, Slider, Typography, IconButton, CircularProgress } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';
import { useLazyQuery } from '@apollo/client';
import { LEAGUESDROPDOWNFILTER } from '../../../graphql/User/userQuery';
import { IoIosArrowDown } from 'react-icons/io';
import dayjs from 'dayjs';
import './filter.css';

const Filter = ({ onApply, Attributes, onClose, validationOptions, filter }) => {
    const [filters, setFilters] = useState({
        leagueId: filter.leagueId || null,
        ticketStatus: filter.ticketStatus || null,
        startdate: filter.startdate || null,
        enddate: filter.enddate || null,
        day: filter.day || null,
        paymentStatus: filter.paymentStatus || null,
        payoutType: filter.payoutType || null,
        validType: filter.validType || null
    });

    const [getEvents, { data, loading }] = useLazyQuery(LEAGUESDROPDOWNFILTER, {
        fetchPolicy: 'network-only'
    });

    useEffect(() => {
        getEvents();
    }, [getEvents]);

    const handleReset = () => {
        setFilters({ leagueId: null, ticketStatus: null, startdate: null, enddate: null, day: null, paymentStatus: null, payoutType: null, validType: null });
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
        const selectedLeagueId = event.target.value;
        setFilters({ ...filters, leagueId: selectedLeagueId });
    };

    const getSelectedLeagueName = (leagueId) => {
        if (!data?.leagues) return '';
        const selectedLeague = data.leagues.find(league => league.l_id === leagueId);
        return selectedLeague ? selectedLeague.l_name : '';
    };


    const handleTicketStatusChange = (event) => {
        const selected = event.target.value;
        let changed = selected;

        switch (selected.toLowerCase()) {
            case 'valid':
                changed = 'Verified';
                break;
            case 'invalid':
                changed = 'Delist';
                break;
            case 'delist requested':
                changed = 'DelistInProgress';
                break;
            case 'sold':
                changed = 'NotInitiated';
                setFilters({ ...filters, paymentStatus: 'NotInitiated', payoutType: 'Unvoided_Payout', validType: selected });
                return;
            case 'in progress':
                changed = 'Inprogress';
                setFilters({ ...filters, paymentStatus: 'Inprogress', payoutType: 'Unvoided_Payout', validType: selected });
                return;
            case 'settled':
                changed = 'Success';
                setFilters({ ...filters, paymentStatus: 'Success', payoutType: 'Unvoided_Payout', validType: selected });
                return;
            case 'failed':
                changed = 'Failed';
                setFilters({ ...filters, paymentStatus: 'Failed', payoutType: 'Unvoided_Payout', validType: selected });
                return;
            case 'voided payout':
                changed = null;
                setFilters({ ...filters, paymentStatus: null, payoutType: 'Unvoided_Payout', validType: selected });
                return;
            default:
                break;
        }

        setFilters({ ...filters, ticketStatus: changed, validType: selected });
    };



    const getDateRangeFromOption = (option) => {
        const today = dayjs();
        let start = null;
        let end = null;

        switch (option) {
            case 'Today':
                start = today.format('YYYY-MM-DD');
                break;
            case 'Yesterday':
                start = today.subtract(1, 'day').format('YYYY-MM-DD');
                break;
            case 'Last 30 Days':
                start = today.subtract(30, 'day').format('YYYY-MM-DD');
                end = today.format('YYYY-MM-DD');
                break;
            case 'This Month':
                start = today.startOf('month').format('YYYY-MM-DD');
                end = today.endOf('month').format('YYYY-MM-DD');
                break;
            case 'Last Month':
                start = today.subtract(1, 'month').startOf('month').format('YYYY-MM-DD');
                end = today.subtract(1, 'month').endOf('month').format('YYYY-MM-DD');
                break;
            default:
                break;
        }

        return { startdate: start, enddate: end };
    };


    return (
        <Box className="filter-box" PaperProps={{}}>
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
                            if (!selected || !data) {
                                return <div style={{ color: '#B9BDC6' }}>-select-</div>;
                            }
                            return getSelectedLeagueName(selected);
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
                                <MenuItem className='filter-menuitems' key={event.l_id} value={event.l_id}>
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
                        value={filters.validType}
                        onChange={handleTicketStatusChange}
                        className='filter-radiogroup'
                    >
                        {validationOptions.map((val) => (
                            <FormControlLabel
                                key={val}
                                value={val}
                                control={<Radio size="small" />}
                                label={val.charAt(0).toUpperCase() + val.slice(1)}
                                className='small-radio-label'
                                classes={{ label: 'small-radio-label' }}
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
                                onClick={() => {
                                    const { startdate, enddate } = getDateRangeFromOption(option);
                                    setFilters({ ...filters, startdate, enddate });
                                }}
                                className="date-option"
                            >
                                <span>{option}</span>
                                {(filters.startdate === getDateRangeFromOption(option).startdate &&
                                    filters.enddate === getDateRangeFromOption(option).enddate) && (
                                        <CheckIcon style={{ color: '#5D75F8' }} />
                                    )}
                            </Box>
                        ))}
                    </Box>
                </>
            )}

            {Attributes.includes("Period left") && (
                <>
                    <Typography className="filter-section-title">Period Left</Typography>
                    <div className='filter-section-span'><span>1 day</span><span>7 days</span></div>
                    <Slider
                        value={filters.day}
                        min={1}
                        max={7}
                        step={1}
                        onChange={(e, newValue) => setFilters({ ...filters, day: newValue })}
                        valueLabelDisplay="auto"
                        valueLabelFormat={(value) => value}
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

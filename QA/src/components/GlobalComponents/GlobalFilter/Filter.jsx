import React, { useState } from 'react';
import { Box, Button, MenuItem, Select, Radio, RadioGroup, FormControlLabel, Slider, Typography, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';
import './Filter.css';

const Filter = ({ onApply, Attributes, onClose, validationOptions, filter }) => {
    const eventOptions = ["NBA", "NFL", "MLB"];
    const dateOptions = ["Today", "Yesterday", "Last 30 Days", "This Month", "Last Month"];

    const [filters, setFilters] = useState({
        leagueId: filter.leagueId || "",
        ticketStatus: filter.ticketStatus || "",
        startdate: filter.startdate || "",
        enddate: filter.enddate || "",
        day: filter.enddate || 1,
    });

    const handleReset = () => {
        setFilters({ leagueId: null, ticketStatus: null, startdate: null, enddate: null, day: null });
        onApply({ leagueId: null, ticketStatus: null, startdate: null, enddate: null, day: null });
    };

    const submitFilter = () => {
        onApply(filters);
        onClose();
    };

    return (
        <Box className="filter-box">
            <div className="filter-header">
                <Typography variant="h6" className="filter-title">Filter</Typography>
                <IconButton onClick={onClose} className="close-icon">
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
                        value={filters.leagueId}
                        onChange={(e) => setFilters({ ...filters, leagueId: e.target.value })}

                        displayEmpty
                    >
                        <MenuItem value="" disabled>--select--</MenuItem>
                        {eventOptions.map((event) => (
                            <MenuItem className='filter-menuitems' key={event} value={event}>{event}</MenuItem>
                        ))}
                    </Select>
                </>
            )}

            {Attributes.includes("Validate") && (
                <>
                    <Typography className="filter-section-title">{Attributes.includes('Manage') ? 'Validate' : 'Status'}</Typography>
                    <RadioGroup
                        value={filters.ticketStatus}
                        onChange={(e) => setFilters({ ...filters, ticketStatus: e.target.value })}
                        style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr',color: '#475569' }}
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
                        {dateOptions.map((option) => (
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
                                height: "18px",
                                width: "25px",
                                borderRadius: "0px",
                                marginLeft: "12px",
                                backgroundColor: "#5d75f8"
                            },
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

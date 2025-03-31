import React, { useState } from 'react';
import { Box, Button, MenuItem, Select, Radio, RadioGroup, FormControlLabel, Slider, Typography, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close'
import CheckIcon from '@mui/icons-material/Check'

const Filter = ({ onApply, Attributes, onClose, validationOptions }) => {
    const eventOptions = ["NBA", "NFL", "MLB"];
    const dateOptions = ["Today", "Yesterday", "Last 30 Days", "This Month", "Last Month"];

    const [filters, setFilters] = useState({
        event: 'NBA',
        validation: 'Valid',
        selectedDate: 'Last Month',
        period: 3,
    });

    const handleReset = () => {
        setFilters({ event: 'NBA', validation: 'Valid', selectedDate: 'Last Month', period: 3 });
    };

    return (
        <Box sx={{
            p: 3, width: 379, bgcolor: 'white', boxShadow: 5, borderRadius: 2, overflow: 'auto',
            maxHeight: '500px',
            '&::-webkit-scrollbar': {
                width: '5px',
            },
            '&::-webkit-scrollbar-track': {
                background: 'none',
            },
            '&::-webkit-scrollbar-thumb': {
                backgroundColor: '#f3f4f6',
            },
        }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="h6" color="#0f172a" fontWeight={700} sx={{ mb: 1, fontFamily: 'Playfair Display', fontWeight: 'bold' }}>Filter</Typography>
                <IconButton
                    onClick={onClose}
                    sx={{
                        color: '#757575', '&:hover': {
                            backgroundColor: 'transparent',
                        },
                    }}
                >
                    <CloseIcon />
                </IconButton>
            </div>

            {Attributes.includes("Event") && (
                <>
                    <Typography sx={{ mt: 1.5, mb: 0.5, fontSize: '14px', fontFamily: 'Glegoo', fontWeight: '600' }}>Event</Typography>
                    <Select fullWidth size="small" value={filters.event} sx={{ color: '#475569' }} onChange={(e) => setFilters({ ...filters, event: e.target.value })}>
                        {eventOptions.map((event) => (
                            <MenuItem key={event} value={event} sx={{ color: '#475569' }}>{event}</MenuItem>
                        ))}
                    </Select>
                </>
            )}

            {Attributes.includes("Validate") && (
                <>
                    <Typography sx={{ mt: 1.5, mb: 0.5, fontSize: '14px', fontFamily: 'Glegoo', fontWeight: '600' }}>{Attributes.includes('Manage') ? 'Validate' : 'Status'}</Typography>
                    <RadioGroup value={filters.validation} sx={{ color: '#475569', display: 'grid', gridTemplateColumns: '1fr 1fr 1fr' }} onChange={(e) => setFilters({ ...filters, validation: e.target.value })}>
                        {validationOptions.map((val) => (
                            <FormControlLabel key={val} value={val} control={<Radio size="small" />} label={val.charAt(0).toUpperCase() + val.slice(1)}
                                sx={{
                                    whiteSpace: 'nowrap',
                                }}
                            />
                        ))}
                    </RadioGroup>
                </>
            )}

            {Attributes.includes("Date") && (
                <>
                    <Typography sx={{ mt: 1.5, mb: 0.5, fontSize: '14px', fontFamily: 'Glegoo', fontWeight: '600' }}>
                        Date
                    </Typography>
                    <Box sx={{ display: 'grid', gridTemplateColumns: '1fr', gap: 0.7 }}>
                        {dateOptions.map((option) => (
                            <Box
                                key={option}
                                onClick={() => setFilters({ ...filters, selectedDate: option })}
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    paddingBottom: '8px',
                                    borderRadius: '4px',
                                    cursor: 'pointer',
                                }}
                            >
                                <span style={{ fontFamily: 'Glegoo', fontSize: '14px', color: '#475569' }}>{option}</span>
                                {filters.selectedDate === option && <CheckIcon sx={{ color: '#5D75F8', fontSize: 20 }} />}
                            </Box>
                        ))}
                    </Box>
                </>
            )}


            {Attributes.includes("Period left") && (
                <>
                    <Typography sx={{ mt: 1.5, mb: 0.5, fontSize: '14px', fontFamily: 'Glegoo', fontWeight: '600' }}>Period Left</Typography>
                    <Slider
                        value={filters.period}
                        min={0.5}
                        max={7}
                        step={0.5}
                        onChange={(e, newValue) => setFilters({ ...filters, period: newValue })}
                        sx={{
                            mt: -1,
                            mb: 1,
                            "& .MuiSlider-thumb": {
                                height: "18px",
                                width: "25px",
                                borderRadius: "0px",
                            },
                        }}
                    />
                </>
            )}

            <Box sx={{ mt: 1.5, display: 'flex', justifyContent: 'flex-end', gap: '4px' }}>
                <Button disableRipple variant="outlined" size="small" sx={{ fontSize: '16px', textTransform: 'none', borderRadius: 0, color: 'black', width: '95px', height: '44px', fontFamily: 'Glegoo', fontWeight: '600', backgroundColor: '#f3f4f6', border: 'none' }} onClick={handleReset}>Reset</Button>
                <Button disableRipple variant="contained" size="small" sx={{ fontSize: '16px', textTransform: 'none', borderRadius: 0, width: '95px', height: '44px', fontFamily: 'Glegoo', border: 'none' }} onClick={() => onApply(filters)}>Apply</Button>
            </Box>
        </Box>
    );
};

export default Filter;

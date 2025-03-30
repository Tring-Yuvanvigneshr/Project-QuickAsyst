import React, { useState } from 'react';
import { Box, Button, MenuItem, Select, Radio, RadioGroup, FormControlLabel, Slider, Typography } from '@mui/material';

const Filter = ({ onApply, Attributes }) => {
    const eventOptions = ["NBA", "NFL", "MLB"];
    const validationOptions = ["valid", "invalid"];
    const dateOptions = ["Today", "Yesterday", "Last 30 Days", "This Month", "Last Month", "Custom Range"];

    const [filters, setFilters] = useState({
        event: 'NBA',
        validation: 'valid',
        selectedDate: 'Last Month',
        period: 3,
    });

    const handleReset = () => {
        setFilters({ event: 'NBA', validation: 'valid', selectedDate: 'Last Month', period: 3 });
    };

    return (
        <Box sx={{ p: 1.5, width: 320, bgcolor: 'white', boxShadow: 2, borderRadius: 2 }}>
            <Typography variant="h6" color="#151A34" fontWeight={700} sx={{ mb: 1 }}>Filter</Typography>

            {Attributes.includes("Event") && (
                <>
                    <Typography color="#151A34" sx={{ mt: 1.5, mb: 0.5, fontSize: '14px' }}>Event</Typography>
                    <Select fullWidth size="small" value={filters.event} sx={{ color: '#475569'}} onChange={(e) => setFilters({ ...filters, event: e.target.value })}>
                        {eventOptions.map((event) => (
                            <MenuItem key={event} value={event} sx={{ color: '#475569'}}>{event}</MenuItem>
                        ))}
                    </Select>
                </>
            )}

            {Attributes.includes("Validate") && (
                <>
                    <Typography color="#151A34" sx={{ mt: 1.5, mb: 0.5, fontSize: '14px' }}>Validate</Typography>
                    <RadioGroup row value={filters.validation} sx={{ color: '#475569'}} onChange={(e) => setFilters({ ...filters, validation: e.target.value })}>
                        {validationOptions.map((val) => (
                            <FormControlLabel key={val} value={val} control={<Radio size="small" />} label={val.charAt(0).toUpperCase() + val.slice(1)} />
                        ))}
                    </RadioGroup>
                </>
            )}

            {Attributes.includes("Date") && (
                <>
                    <Typography color="#151A34" sx={{ mt: 1.5, mb: 0.5, fontSize: '14px' }}>Date</Typography>
                    <Box sx={{ display: 'grid', gridTemplateColumns: Attributes.includes("Manage") ? '1fr 1fr' : '1fr', gap: 0.5 }}>
                        {dateOptions.map((option) => (
                            <Button
                                key={option}
                                onClick={() => setFilters({ ...filters, selectedDate: option })}
                                sx={{
                                    textTransform: 'none',
                                    color: "#475569",
                                    fontWeight: filters.selectedDate === option ? 'bold' : 'normal',
                                    fontSize: 12,
                                    py: 0.3,
                                }}
                            >
                                {option}
                            </Button>
                        ))}
                    </Box>
                </>
            )}

            {Attributes.includes("Period left") && (
                <>
                    <Typography color="#151A34" sx={{ mt: 1.5, mb: 0.5, fontSize: '14px' }}>Period Left</Typography>
                    <Slider
                        value={filters.period}
                        min={0.5}
                        max={7}
                        step={0.5}
                        onChange={(e, newValue) => setFilters({ ...filters, period: newValue })}
                        valueLabelDisplay="auto"
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
                <Button variant="outlined" size="small" sx={{textTransform: 'none', borderRadius: 0, color: 'black'}} onClick={handleReset}>Reset</Button>
                <Button variant="contained" size="small" sx={{textTransform: 'none', borderRadius: 0}} onClick={() => onApply(filters)}>Apply</Button>
            </Box>
        </Box>
    );
};

export default Filter;

import React, { useState } from 'react';
import { Box, Button, MenuItem, Select, Radio, RadioGroup, FormControlLabel, Slider, Typography } from '@mui/material';

const Managetickets = ({ onApply }) => {
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
        <Box sx={{ p: 2, width: 350, bgcolor: 'white', boxShadow: 2, borderRadius: 2 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>Filter</Typography>

            <Select fullWidth size="small" value={filters.event} onChange={(e) => setFilters({ ...filters, event: e.target.value })}>
                {eventOptions.map((event) => (
                    <MenuItem key={event} value={event}>{event}</MenuItem>
                ))}
            </Select>

            <RadioGroup row value={filters.validation} onChange={(e) => setFilters({ ...filters, validation: e.target.value })}>
                {validationOptions.map((val) => (
                    <FormControlLabel key={val} value={val} control={<Radio size="small" />} label={val.charAt(0).toUpperCase() + val.slice(1)} />
                ))}
            </RadioGroup>

            <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1 }}>
                {dateOptions.map((option) => (
                    <Button
                        key={option}
                        onClick={() => setFilters({ ...filters, selectedDate: option })}
                        sx={{
                            textTransform: 'none',
                            color: filters.selectedDate === option ? 'blue' : 'black',
                            fontWeight: filters.selectedDate === option ? 'bold' : 'normal',
                            fontSize: 13,
                        }}
                    >
                        {option}
                    </Button>
                ))}
            </Box>

            <Slider
                value={filters.period}
                min={0.5}
                max={7}
                step={0.5}
                onChange={(e, newValue) => setFilters({ ...filters, period: newValue })}
                valueLabelDisplay="auto"
            />

            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                <Button variant="outlined" size="small" onClick={handleReset}>Reset</Button>
                <Button variant="contained" size="small" onClick={() => onApply(filters)}>Apply</Button>
            </Box>
        </Box>
    );
};

export default Managetickets;

import React, { useState } from 'react';
import { Box, Tabs, Tab, Button } from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import Managetickets from './../../components/Filter/ManageTickets/Managetickets.jsx';

const TabPanel = ({ children, value, index }) => (
    <div hidden={value !== index}>{value === index && <Box sx={{ p: 2 }}>{children}</Box>}</div>
);

const Tickets = () => {
    const [tabValue, setTabValue] = useState(0);
    const [filterOpen, setFilterOpen] = useState(false);

    return (
        <Box sx={{ width: '90', m: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Tabs value={tabValue} onChange={(e, newValue) => setTabValue(newValue)} sx={{ flexGrow: 1 }}>
                    <Tab label="Manage Tickets" />
                    <Tab label="List Tickets" />
                    <Tab label="Sold Tickets" />
                </Tabs>

                {tabValue === 0 && (
                    <Button onClick={() => setFilterOpen(!filterOpen)} sx={{ color: '#007bff' }}>
                        <FilterListIcon sx={{ fontSize: 20, color: '#6c757d' }} /> Filter
                    </Button>
                )}
            </Box>

            {filterOpen && tabValue === 0 && (
                <Box sx={{ position: 'absolute', top: 140, right: 20, zIndex: 10 }}>
                    <Managetickets onApply={(filters) => console.log("Applied:", filters)} />
                </Box>
            )}

            <TabPanel value={tabValue} index={0}>Manage Tickets Content</TabPanel>
            <TabPanel value={tabValue} index={1}>List Tickets Content</TabPanel>
            <TabPanel value={tabValue} index={2}>Sold Tickets Content</TabPanel>
        </Box>
    );
};

export default Tickets;
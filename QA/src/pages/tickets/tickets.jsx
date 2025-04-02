import React, { useEffect, useState } from 'react';
import { Box, Tabs, Tab, Button } from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import Filter from '../../components/GlobalComponents/GlobalFilter/Filter.jsx';
import Managetickets from '../../components/Tabs/ManageTickets/Managetickets.jsx';
import Listtickets from '../../components/Tabs/ListTickets/Listtickets.jsx';
import Soldtickets from '../../components/Tabs/Soldtickets/Soldtickets.jsx';
import Returntickets from '../../components/Tabs/DelistAndReturn/Delistandreturn.jsx';
import Unsoldtickets from '../../components/Tabs/DelistAndUnsold/Delistandunsold.jsx';

const attributes = [["Manage", "Event", "Validate", "Date", "Period left"], ["List", "Validate", "Event", "Date"], ["Sold", "Event", "Validate", "Date"], ["Event", "Date"]]
const validationOptionsManage = ["Valid", "Invalid", "Delist Requested"];
const validationOptionsList = ["Valid", "Delist Requested"];
const validationOptionsSold = ["Sold", "In Prograss", "Settled", "Failded", "Voided Payout"];

const TabPanel = ({ children, value, index }) => (
    <div hidden={value !== index}>
        {value === index && <Box sx={{ p: 2 }}>{children}</Box>}
    </div>
);

const Tickets = () => {
    const [tabValue, setTabValue] = useState(0);
    const [filterOpen, setFilterOpen] = useState(false);

    useEffect(() => {
        setFilterOpen(false)
    }, [tabValue])

    return (
        <Box sx={{ width: '90', m: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Tabs value={tabValue} onChange={(e, newValue) => setTabValue(newValue)} sx={{ flexGrow: 1 }}>
                    <Tab label="Manage Tickets" sx={{ textTransform: 'none', fontFamily: 'Glegoo', fontWeight: '700' }} />
                    <Tab label="List Tickets" sx={{ textTransform: 'none', fontFamily: 'Glegoo', fontWeight: '700' }} />
                    <Tab label="Sold Tickets" sx={{ textTransform: 'none', fontFamily: 'Glegoo', fontWeight: '700' }} />
                    <Tab label="Delist And Return" sx={{ textTransform: 'none', fontFamily: 'Glegoo', fontWeight: '700' }} />
                    <Tab label="Delist And UnSold" sx={{ textTransform: 'none', fontFamily: 'Glegoo', fontWeight: '700' }} />
                </Tabs>

                <Button disableRipple onClick={() => setFilterOpen(!filterOpen)} sx={{
                    color: '#5D75F8', textTransform: 'none', borderWidth: 1,
                    borderStyle: 'solid',
                    borderColor: '#E3E5E8',
                    borderRadius: '0',
                    fontFamily: 'Glegoo',
                    width: '98px',
                    height: '44px',
                    gap: '8px',
                    paddingTop: '15px',
                    paddingBottom: '15px',
                    backgroundColor: 'transparent'
                }}>
                    <FilterListIcon sx={{
                        fontSize: 20, color: '#6c757d', width: "20",
                    }} /> Filter
                </Button>
            </Box>

            {
                filterOpen && tabValue === 0 && (
                    <Box sx={{ position: 'absolute', top: 80, right: 12, zIndex: 10, }}>
                        <Filter onApply={(filters) => console.log("Applied:", filters)} Attributes={attributes[0]} onClose={() => setFilterOpen(false)} validationOptions={validationOptionsManage} />
                    </Box>
                )
            }

            {
                filterOpen && tabValue === 1 && (
                    <Box sx={{ position: 'absolute', top: 80, right: 12, zIndex: 10 }}>
                        <Filter onApply={(filters) => console.log("Applied:", filters)} Attributes={attributes[1]} onClose={() => setFilterOpen(false)} validationOptions={validationOptionsList} />
                    </Box>
                )
            }
            {
                filterOpen && tabValue === 2 && (
                    <Box sx={{ position: 'absolute', top: 80, right: 12, zIndex: 10 }}>
                        <Filter onApply={(filters) => console.log("Applied:", filters)} Attributes={attributes[2]} onClose={() => setFilterOpen(false)} validationOptions={validationOptionsSold} />
                    </Box>
                )
            }
            {
                filterOpen && (tabValue === 3 || tabValue === 4) && (
                    <Box sx={{ position: 'absolute', top: 80, right: 12, zIndex: 10 }}>
                        <Filter onApply={(filters) => console.log("Applied:", filters)} Attributes={attributes[3]} onClose={() => setFilterOpen(false)} />
                    </Box>
                )
            }

            <TabPanel value={tabValue} index={0}><Managetickets /></TabPanel>
            <TabPanel value={tabValue} index={1}><Listtickets /></TabPanel>
            <TabPanel value={tabValue} index={2}><Soldtickets /></TabPanel>
            <TabPanel value={tabValue} index={3}><Returntickets /></TabPanel>
            <TabPanel value={tabValue} index={4}><Unsoldtickets /></TabPanel>
        </Box >
    );
};

export default Tickets;
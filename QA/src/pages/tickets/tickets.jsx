import React, { useEffect, useState } from 'react';
import { Box, Tabs, Tab, Button } from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import Filter from '../../components/GlobalComponents/GlobalFilter/Filter.jsx';
import Managetickets from '../../components/Tabs/ManageTickets/Managetickets.jsx';
import Listtickets from '../../components/Tabs/ListTickets/Listtickets.jsx';
import Soldtickets from '../../components/Tabs/Soldtickets/Soldtickets.jsx';
import Returntickets from '../../components/Tabs/DelistAndReturn/Delistandreturn.jsx';
import Unsoldtickets from '../../components/Tabs/DelistAndUnsold/Delistandunsold.jsx';
import './tickets.css';

const attributes = [["Manage", "Event", "Validate", "Date", "Period left"], ["List", "Validate", "Event", "Date"], ["Sold", "Event", "Validate", "Date"], ["Event", "Date"],["Event", "Date"]];
const validationOptionsManage = ["Valid", "Invalid", "Delist Requested"];
const validationOptionsList = ["Valid", "Delist Requested"];
const validationOptionsSold = ["Sold", "In Prograss", "Settled", "Failded", "Voided Payout"];

const TabPanel = ({ children, value, index }) => (
    <div hidden={value !== index}>
        {value === index && <Box className="tab-panel">{children}</Box>}
    </div>
);

const Tickets = () => {
    const [tabValue, setTabValue] = useState(0);
    const [filterOpen, setFilterOpen] = useState(false);
    const [filter, setFilters] = useState({
        search_event: '%',
        leagueId: null,
        ticketStatus: null,
        startdate: null,
        enddate: null,
        pageSize: 10,
        pageOffset: 0,
        order_by: [{ tp_updated_at: 'desc' }, { tp_id: 'asc' }],
        day: null,
        ticketId: null,
        tpId: null,
        array_tpid: null,
    });

    useEffect(() => {
        setFilterOpen(false);
    }, [tabValue]);

    return (
        <Box className="tickets-container">
            <Box className="tabs-container">
                <Tabs value={tabValue} onChange={(e, newValue) => setTabValue(newValue)} className="tabs">
                    <Tab label="Manage Tickets" className="tab" />
                    <Tab label="List Tickets" className="tab" />
                    <Tab label="Sold Tickets" className="tab" />
                    <Tab label="Delist And Return" className="tab" />
                    <Tab label="Delist And UnSold" className="tab" />
                </Tabs>

                <Button
                    variant='outlined'
                    disableRipple
                    onClick={() => setFilterOpen(!filterOpen)}
                    className="filter-button"
                >
                    <FilterListIcon className="filter-icon" sx /> Filter
                </Button>
            </Box>

            {filterOpen && (
                <Box className="filter-panel">
                    <Filter
                        onApply={(newFilters) => setFilters((prev) => ({ ...prev, ...newFilters }))}
                        Attributes={attributes[tabValue]}
                        onClose={() => setFilterOpen(false)}
                        validationOptions={tabValue === 0 ? validationOptionsManage : tabValue === 1 ? validationOptionsList : validationOptionsSold}
                        filter={filter}
                    />
                </Box>
            )}

            <TabPanel value={tabValue} index={0}><Managetickets filter={filter} /></TabPanel>
            <TabPanel value={tabValue} index={1}><Listtickets filter={filter} /></TabPanel>
            <TabPanel value={tabValue} index={2}><Soldtickets filter={filter}/></TabPanel>
            <TabPanel value={tabValue} index={3}><Returntickets filter={filter}/></TabPanel>
            <TabPanel value={tabValue} index={4}><Unsoldtickets filter={filter}/></TabPanel>
        </Box>
    );
};

export default Tickets;

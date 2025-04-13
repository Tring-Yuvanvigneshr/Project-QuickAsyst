import React, { useEffect, useState } from 'react';
import { Box, Tabs, Tab, Button } from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import Filter from '../../components/GlobalComponents/GlobalFilter/Filter.jsx';
import Managetickets from '../../components/Tabs/ManageTickets/Managetickets.jsx';
import Listtickets from '../../components/Tabs/ListTickets/Listtickets.jsx';
import Soldtickets from '../../components/Tabs/SoldTickets/Soldtickets.jsx';
import Returntickets from '../../components/Tabs/DelistAndReturn/Delistandreturn.jsx';
import Unsoldtickets from '../../components/Tabs/DelistAndUnsold/Delistandunsold.jsx';
import './tickets.css';

const attributes = [
    ["Manage", "Event", "Validate", "Date", "Period left"],
    ["List", "Validate", "Event", "Date"],
    ["Sold", "Event", "Validate", "Date"],
    ["Event", "Date"],
    ["Event", "Date"]
];

const validationOptionsManage = ["Valid", "Invalid", "Delist Requested"];
const validationOptionsList = ["Valid", "Delist Requested"];
const validationOptionsSold = ["Sold", "In Progress", "Settled", "Failed", "Voided Payout"];

const TabPanel = ({ children, value, index }) => (
    <div hidden={value !== index}>
        {value === index && <Box className="tab-panel">{children}</Box>}
    </div>
);

const Tickets = () => {
    const [tabValue, setTabValue] = useState(0);
    const [filterOpen, setFilterOpen] = useState(false);
    
    const defaultFilter = {
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
    };

    const [manageFilter, setManageFilter] = useState(defaultFilter)
    const [returnFilter, setReturnFilter] = useState(defaultFilter);
    const [soldFilter, setSoldFilter] = useState(defaultFilter);
    const [listFilter, setListFilter] = useState(defaultFilter);
    const [unsoldFilter, setUnSoldFilter] = useState(defaultFilter);

    useEffect(() => {
        setFilterOpen(false);
    }, [tabValue]);

    const handleApplyFilters = (newFilters) => {
        switch (tabValue) {
            case 0:
                setManageFilter((prev) => ({ ...prev, ...newFilters }));
                break;
            case 1:
                setListFilter((prev) => ({ ...prev, ...newFilters }));
                break;
            case 2:
                setSoldFilter((prev) => ({ ...prev, ...newFilters }));
                break;
            case 3:
                setReturnFilter((prev) => ({ ...prev, ...newFilters }));
                break;
            case 4:
                setUnSoldFilter((prev) => ({ ...prev, ...newFilters }));
                break;
            default:
                break;
        }
    };

    return (
        <Box className="tickets-container">
            <Box className="tabs-container">
                <Tabs value={tabValue} variant="scrollable" scrollButtons="auto"  onChange={(e, newValue) => setTabValue(newValue)} className="tabs">
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
                    <FilterListIcon className="filter-icon" /> Filter
                </Button>
            </Box>

            {filterOpen && (
                <Box className="filter-panel">
                    <Filter
                        onApply={handleApplyFilters}
                        Attributes={attributes[tabValue]}
                        onClose={() => setFilterOpen(false)}
                        validationOptions={ tabValue === 0 ? validationOptionsManage : tabValue === 1 ? validationOptionsList : validationOptionsSold}
                        filter={ tabValue === 0 ? manageFilter : tabValue === 1 ? listFilter : tabValue === 2 ? soldFilter : tabValue === 3 ? returnFilter : unsoldFilter}
                    />
                </Box>
            )}

            <TabPanel value={tabValue} index={0}><Managetickets filter={manageFilter} /></TabPanel>
            <TabPanel value={tabValue} index={1}><Listtickets filter={listFilter} /></TabPanel>
            <TabPanel value={tabValue} index={2}><Soldtickets filter={soldFilter} /></TabPanel>
            <TabPanel value={tabValue} index={3}><Returntickets filter={returnFilter} /></TabPanel>
            <TabPanel value={tabValue} index={4}><Unsoldtickets filter={unsoldFilter} /></TabPanel>
        </Box>
    );
};

export default Tickets;

import React, { useEffect, useState } from 'react'
import { useQuery } from '@apollo/client';
import { FILTERSOLDTICKETS } from '../../../Graphql/SoldTickets/soldQuery';
import SharedTable from './../../GlobalComponents/GlobalTable/Table.jsx';
import { soldColumns } from './../../../utils/Sold_columns/SoldColumns.jsx';
import {
    CircularProgress,
    Box,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Divider,
    TextField,
    Button,
    Typography
} from '@mui/material';


const Soldtickets = ({ filter }) => {

    const [tableData, setTableData] = useState([]);
    const [tableSize, setTableSize] = useState([]);
    const [pageChange, setPageChange] = useState(10);
    const [offSet, setOffSet] = useState(0)

    const [selectedTicket, setSelectedTicket] = useState(null);
    const [openInvoiceDialog, setOpenInvoiceDialog] = useState(false);
    const [openPayoutDialog, setOpenPayoutDialog] = useState(false);

    const { loading, data } = useQuery(FILTERSOLDTICKETS, {
        variables: {
            ...filter,
            pageSize: pageChange,
            pageOffset: pageChange * offSet
        },
        fetchPolicy: 'network-only'
    });


    const dummydata = {
        "data": {
            "FilterSoldTickets": [
                {
                    "e_name": "Atlanta Hawks vs New York Knicks",
                    "l_name": "NBA",
                    "e_date": "2025-04-05T19:00:00+00:00",
                    "e_address": "State Farm Arena, Atlanta, GA",
                    "tp_section": "d",
                    "tp_row": "f",
                    "tp_seat_no": 2,
                    "tp_status": "Sold",
                    "u_id": "7f0a36d5-6598-4aa9-a7b3-28b867f5faca",
                    "u_first_name": "priya",
                    "u_last_name": "th",
                    "e_id": "842e4300-e918-4eed-9e3e-ac299e3651a0",
                    "t_id": "f678f70c-6dda-4a3e-92f4-cf3d1c73cb9f",
                    "tp_id": "0aa3d0d4-2542-4b04-912c-33aa050b7fef",
                    "u_full_name": "priya th",
                    "u_email_id": "priyadharshini.th+edit@tringapps.com",
                    "tp_logitix_amount": 180,
                    "tp_sold_amount": 160,
                    "tp_payment_status": null,
                    "tp_list_price": 200,
                    "tp_quick_cut_amount": 20,
                    "e_brand_name": "Knicks vs Hawks",
                    "e_status": "scheduled",
                    "e_time_zone": "US/Eastern",
                    "e_date_time_zone": "Saturday ~ Apr 05 ~ 3:00 pm EDT",
                    "tp_payout_status": "Unvoided_Payout",
                    "__typename": "getmanageticket"
                },
                {
                    "e_name": "Houston Astros vs Chicago White Sox",
                    "l_name": "MLB",
                    "e_date": "2025-06-12T00:10:00+00:00",
                    "e_address": "Daikin Park, Houston, TX",
                    "tp_section": "2",
                    "tp_row": "1",
                    "tp_seat_no": 0,
                    "tp_status": "Sold",
                    "u_id": "7f0a36d5-6598-4aa9-a7b3-28b867f5faca",
                    "u_first_name": "priya",
                    "u_last_name": "th",
                    "e_id": "892c210d-b047-4d4c-8760-647e6bf5c9a7",
                    "t_id": "b61dfe2a-e9d1-45ca-9c24-8a77b5c73bc9",
                    "tp_id": "1c0da320-2b2d-4aff-b2f8-376bac60ad1a",
                    "u_full_name": "priya th",
                    "u_email_id": "priyadharshini.th+edit@tringapps.com",
                    "tp_logitix_amount": 90000,
                    "tp_sold_amount": 80000,
                    "tp_payment_status": "Failed",
                    "tp_list_price": 100000,
                    "tp_quick_cut_amount": 10000,
                    "e_brand_name": "White Sox vs Astros",
                    "e_status": "scheduled",
                    "e_time_zone": "US/Central",
                    "e_date_time_zone": "Wednesday ~ Jun 11 ~ 7:10 pm CDT",
                    "tp_payout_status": "Unvoided_Payout",
                    "__typename": "getmanageticket"
                },
                {
                    "e_name": "Boston Celtics vs Indiana Pacers",
                    "l_name": "NBA",
                    "e_date": "2024-05-24T00:00:00+00:00",
                    "e_address": "TD Garden, Boston, MA",
                    "tp_section": "sec 7",
                    "tp_row": "row 7",
                    "tp_seat_no": 1,
                    "tp_status": "Sold",
                    "u_id": "a360666a-1641-4ae4-abe5-edcf975c64ef",
                    "u_first_name": "bhuvana",
                    "u_last_name": "k",
                    "e_id": "c3cb4efc-c161-4372-bf94-5c24f819ad79",
                    "t_id": "d0f3b9f0-ad2b-4a2f-a328-dddbaa50df35",
                    "tp_id": "579d99c4-f636-4342-8f90-b675fec2e25e",
                    "u_full_name": "bhuvana k",
                    "u_email_id": "sopab88983@neixos.com",
                    "tp_logitix_amount": 90,
                    "tp_sold_amount": 80,
                    "tp_payment_status": "Failed",
                    "tp_list_price": 100,
                    "tp_quick_cut_amount": 10,
                    "e_brand_name": "Pacers vs Celtics",
                    "e_status": "closed",
                    "e_time_zone": "US/Eastern",
                    "e_date_time_zone": "Thursday ~ May 23 ~ 8:00 pm EDT",
                    "tp_payout_status": "Unvoided_Payout",
                    "__typename": "getmanageticket"
                },
                {
                    "e_name": "Boston Celtics vs Indiana Pacers",
                    "l_name": "NBA",
                    "e_date": "2024-05-24T00:00:00+00:00",
                    "e_address": "TD Garden, Boston, MA",
                    "tp_section": "sec 7",
                    "tp_row": "row 7",
                    "tp_seat_no": 2,
                    "tp_status": "Sold",
                    "u_id": "a360666a-1641-4ae4-abe5-edcf975c64ef",
                    "u_first_name": "bhuvana",
                    "u_last_name": "k",
                    "e_id": "c3cb4efc-c161-4372-bf94-5c24f819ad79",
                    "t_id": "d0f3b9f0-ad2b-4a2f-a328-dddbaa50df35",
                    "tp_id": "5ae318c3-e3af-4b18-8c52-c74de85c5584",
                    "u_full_name": "bhuvana k",
                    "u_email_id": "sopab88983@neixos.com",
                    "tp_logitix_amount": 90,
                    "tp_sold_amount": 80,
                    "tp_payment_status": "Failed",
                    "tp_list_price": 100,
                    "tp_quick_cut_amount": 10,
                    "e_brand_name": "Pacers vs Celtics",
                    "e_status": "closed",
                    "e_time_zone": "US/Eastern",
                    "e_date_time_zone": "Thursday ~ May 23 ~ 8:00 pm EDT",
                    "tp_payout_status": "Unvoided_Payout",
                    "__typename": "getmanageticket"
                },
                {
                    "e_name": "Anaheim Ducks vs Edmonton Oilers",
                    "l_name": "NHL",
                    "e_date": "2025-04-08T02:30:00+00:00",
                    "e_address": "Honda Center, Anaheim, CA",
                    "tp_section": "o",
                    "tp_row": "du",
                    "tp_seat_no": 3,
                    "tp_status": "Sold",
                    "u_id": "0e2dfe96-96f3-4727-9467-5a29edeffae6",
                    "u_first_name": "priya",
                    "u_last_name": "test",
                    "e_id": "e2b4c8fd-953f-4f98-89e7-940ee5b3d145",
                    "t_id": "e2deeaf5-2cd2-40be-a944-921e7c3ca19e",
                    "tp_id": "fa532fc4-12ea-47cc-ade8-4b13f2d7d7c5",
                    "u_full_name": "priya test",
                    "u_email_id": "priyatest@mailinator.com",
                    "tp_logitix_amount": 180,
                    "tp_sold_amount": 160,
                    "tp_payment_status": "Inprogress",
                    "tp_list_price": 200,
                    "tp_quick_cut_amount": 20,
                    "e_brand_name": "Oilers vs Ducks",
                    "e_status": "scheduled",
                    "e_time_zone": "US/Pacific",
                    "e_date_time_zone": "Monday ~ Apr 07 ~ 7:30 pm PDT",
                    "tp_payout_status": "Unvoided_Payout",
                    "__typename": "getmanageticket"
                },
                {
                    "e_name": "Anaheim Ducks vs Edmonton Oilers",
                    "l_name": "NHL",
                    "e_date": "2025-04-08T02:30:00+00:00",
                    "e_address": "Honda Center, Anaheim, CA",
                    "tp_section": "aaa",
                    "tp_row": "aaa",
                    "tp_seat_no": 4,
                    "tp_status": "Sold",
                    "u_id": "0e2dfe96-96f3-4727-9467-5a29edeffae6",
                    "u_first_name": "priya",
                    "u_last_name": "test",
                    "e_id": "e2b4c8fd-953f-4f98-89e7-940ee5b3d145",
                    "t_id": "3a0b5759-06d1-4354-b204-0ffb2a4306ee",
                    "tp_id": "96f7050e-cf94-487f-9d5b-a2673e8af3a3",
                    "u_full_name": "priya test",
                    "u_email_id": "priyatest@mailinator.com",
                    "tp_logitix_amount": 180,
                    "tp_sold_amount": 160,
                    "tp_payment_status": null,
                    "tp_list_price": 200,
                    "tp_quick_cut_amount": 20,
                    "e_brand_name": "Oilers vs Ducks",
                    "e_status": "scheduled",
                    "e_time_zone": "US/Pacific",
                    "e_date_time_zone": "Monday ~ Apr 07 ~ 7:30 pm PDT",
                    "tp_payout_status": "Unvoided_Payout",
                    "__typename": "getmanageticket"
                },
                {
                    "e_name": "Anaheim Ducks vs Edmonton Oilers",
                    "l_name": "NHL",
                    "e_date": "2025-04-08T02:30:00+00:00",
                    "e_address": "Honda Center, Anaheim, CA",
                    "tp_section": "aaa",
                    "tp_row": "aaa",
                    "tp_seat_no": 23,
                    "tp_status": "Sold",
                    "u_id": "0e2dfe96-96f3-4727-9467-5a29edeffae6",
                    "u_first_name": "priya",
                    "u_last_name": "test",
                    "e_id": "e2b4c8fd-953f-4f98-89e7-940ee5b3d145",
                    "t_id": "3a0b5759-06d1-4354-b204-0ffb2a4306ee",
                    "tp_id": "8c725b7b-d619-4450-8efc-4f08446ee8e8",
                    "u_full_name": "priya test",
                    "u_email_id": "priyatest@mailinator.com",
                    "tp_logitix_amount": 180,
                    "tp_sold_amount": 160,
                    "tp_payment_status": null,
                    "tp_list_price": 200,
                    "tp_quick_cut_amount": 20,
                    "e_brand_name": "Oilers vs Ducks",
                    "e_status": "scheduled",
                    "e_time_zone": "US/Pacific",
                    "e_date_time_zone": "Monday ~ Apr 07 ~ 7:30 pm PDT",
                    "tp_payout_status": "Unvoided_Payout",
                    "__typename": "getmanageticket"
                },
                {
                    "e_name": "Tampa Bay Rays vs Chicago White Sox",
                    "l_name": "MLB",
                    "e_date": "2025-07-21T23:35:00+00:00",
                    "e_address": "George M. Steinbrenner Field, Tampa, FL",
                    "tp_section": "evsec323",
                    "tp_row": "evrow323",
                    "tp_seat_no": 460,
                    "tp_status": "Sold",
                    "u_id": "ee647766-8834-4217-8008-db563bb27d78",
                    "u_first_name": "Priya",
                    "u_last_name": "dharshini",
                    "e_id": "f9580444-1c39-47ca-bc22-89019ecc6d49",
                    "t_id": "ff76dd91-78b5-4dc0-b0bc-c7b085e46eb3",
                    "tp_id": "46df4be2-eaef-40a5-acd7-4e83bbdf768a",
                    "u_full_name": "Priya dharshini",
                    "u_email_id": "priyadharshini.th+dev@tringapps.com",
                    "tp_logitix_amount": 180,
                    "tp_sold_amount": 160,
                    "tp_payment_status": "Success",
                    "tp_list_price": 200,
                    "tp_quick_cut_amount": 20,
                    "e_brand_name": "White Sox vs Rays",
                    "e_status": "scheduled",
                    "e_time_zone": "US/Eastern",
                    "e_date_time_zone": "Monday ~ Jul 21 ~ 7:35 pm EDT",
                    "tp_payout_status": "Unvoided_Payout",
                    "__typename": "getmanageticket"
                },
                {
                    "e_name": "Tampa Bay Rays vs Chicago White Sox",
                    "l_name": "MLB",
                    "e_date": "2025-07-21T23:35:00+00:00",
                    "e_address": "George M. Steinbrenner Field, Tampa, FL",
                    "tp_section": "aa1",
                    "tp_row": "sd32",
                    "tp_seat_no": 48,
                    "tp_status": "Sold",
                    "u_id": "ee647766-8834-4217-8008-db563bb27d78",
                    "u_first_name": "Priya",
                    "u_last_name": "dharshini",
                    "e_id": "f9580444-1c39-47ca-bc22-89019ecc6d49",
                    "t_id": "825612de-54f2-40ae-b0d1-6d871e3f8297",
                    "tp_id": "048d9540-fcb8-4d2b-a9c2-8ba502ecb5d7",
                    "u_full_name": "Priya dharshini",
                    "u_email_id": "priyadharshini.th+dev@tringapps.com",
                    "tp_logitix_amount": 180,
                    "tp_sold_amount": 160,
                    "tp_payment_status": "Failed",
                    "tp_list_price": 200,
                    "tp_quick_cut_amount": 20,
                    "e_brand_name": "White Sox vs Rays",
                    "e_status": "scheduled",
                    "e_time_zone": "US/Eastern",
                    "e_date_time_zone": "Monday ~ Jul 21 ~ 7:35 pm EDT",
                    "tp_payout_status": "Unvoided_Payout",
                    "__typename": "getmanageticket"
                },
                {
                    "e_name": "Minnesota Lynx vs Golden State Valkyries",
                    "l_name": "WNBA",
                    "e_date": "2025-09-12T00:00:00+00:00",
                    "e_address": "Target Center, Minneapolis, MN",
                    "tp_section": "a",
                    "tp_row": "a",
                    "tp_seat_no": 3,
                    "tp_status": "Sold",
                    "u_id": "153a6fec-4250-4b8d-a1db-94086cf007e0",
                    "u_first_name": "priya",
                    "u_last_name": "dharshini",
                    "e_id": "17da8813-e4eb-47d4-b685-de9a18985a9f",
                    "t_id": "5e582b5b-dbae-4d34-a50a-12aa5d2d1f69",
                    "tp_id": "3c1616c6-1004-4e17-b227-ab5209d125e4",
                    "u_full_name": "priya dharshini",
                    "u_email_id": "priyadharshini.th+signup@tringapp.com",
                    "tp_logitix_amount": 180,
                    "tp_sold_amount": 160,
                    "tp_payment_status": null,
                    "tp_list_price": 200,
                    "tp_quick_cut_amount": 20,
                    "e_brand_name": "Valkyries vs Lynx",
                    "e_status": "scheduled",
                    "e_time_zone": "US/Central",
                    "e_date_time_zone": "Thursday ~ Sep 11 ~ 7:00 pm CDT",
                    "tp_payout_status": "Unvoided_Payout",
                    "__typename": "getmanageticket"
                }
            ],
            "FilterSoldTickets_aggregate": {
                "aggregate": {
                    "count": 311,
                    "__typename": "getmanageticket_aggregate_fields"
                },
                "__typename": "getmanageticket_aggregate"
            },
            "filterlisttickets_aggregate": {
                "aggregate": {
                    "count": 4,
                    "__typename": "getmanageticket_aggregate_fields"
                },
                "__typename": "getmanageticket_aggregate"
            },
            "filtermanagetickets_aggregate": {
                "aggregate": {
                    "count": 160,
                    "__typename": "getmanageticket_aggregate_fields"
                },
                "__typename": "getmanageticket_aggregate"
            },
            "filterreturntickets_aggregate": {
                "aggregate": {
                    "count": 68,
                    "__typename": "getmanageticket_aggregate_fields"
                },
                "__typename": "getmanageticket_aggregate"
            },
            "filterUnsoldTickets_aggreagate": {
                "aggregate": {
                    "count": 805,
                    "__typename": "getmanageticket_aggregate_fields"
                },
                "__typename": "getmanageticket_aggregate"
            }
        }
    }


    useEffect(() => {
        // if (data && data.filtermanagetickets) {
        const formattedData = dummydata.data.FilterSoldTickets.map((item, index) => ({
            id: index + 1,
            event: item.e_name,
            date: new Date(item.e_date).toLocaleString("en-US", { timeZone: item.e_time_zone }),
            venue: item.e_address,
            venueTime: new Date(item.e_date).toLocaleString("en-US", { timeZone: item.e_time_zone }),
            section: item.tp_section.toUpperCase(),
            row: item.tp_row.toUpperCase(),
            seat: item.tp_seat_no,
            status: item.tp_payment_status,
            email: item.u_email_id,
            league_name: item.l_name,
            validityStatus: item.tp_validity_status,
            Publish_id: item.tp_id,
            sold_price: item.tp_list_price,
            Quickasyst_Cut: item.tp_quick_cut_amount
        }));
        console.log(formattedData);

        setTableData(formattedData);
        // setTableSize(data.filtermanagetickets_aggregate.aggregate.count)
        // }
    }, [data]);

    const handleOpenDialog = (type) => {
        type === 'invoice' ? setOpenInvoiceDialog(true) : setOpenPayoutDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenInvoiceDialog(false);
        setOpenPayoutDialog(false);
        setSelectedTicket(null);
    };

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
                <CircularProgress />
            </Box>
        );
    }

    return (
        <>
            <SharedTable
                data={tableData}
                columns={soldColumns(handleOpenDialog, setSelectedTicket)}
                totalCount={tableSize}
                pageSize={pageChange}
                onPageSizeChange={setPageChange}
                page={offSet}
                onOffSetChange={setOffSet}
            />


            {/* Invoice Dialog */}
            <Dialog open={openInvoiceDialog} onClose={handleCloseDialog} fullWidth>
                <DialogTitle variant="h6" fontFamily="Playfair Display" fontWeight="bold">
                    Invoice
                </DialogTitle>

                <DialogContent>
                    <Typography fontFamily='glegoo' fontWeight={600} mb={1}>Ticket Details</Typography>
                    <Box mb={2} className='Payout-Ticket-Datails-container'>
                        <div className='Payout-Ticket-Datails'>
                            <div className='publish-content-title'>Event:</div>
                            <div className='publish-content-value'>{selectedTicket?.event}</div>
                        </div>
                        <div className='Payout-Ticket-Datails'>
                            <div className='publish-content-title'>Date:</div>
                            <div className='publish-content-value'>{selectedTicket?.date}</div>
                        </div>
                        <div className='Payout-Ticket-Datails'>
                            <div className='publish-content-title'>Venue:</div>
                            <div className='publish-content-value'> {selectedTicket?.venue}</div>
                        </div>
                        <div className='Payout-Ticket-Datails'>
                            <div className='publish-content-title'>Ticket Placement:</div>
                            <div className='publish-content-value'> Sec {selectedTicket?.section} / Row {selectedTicket?.row} / Seat {selectedTicket?.seat}</div>
                        </div>
                        <div className='Payout-Ticket-Datails'>
                            <div className='publish-content-title'>Ticket QTY:</div>
                            <div className='publish-content-value'>1</div>
                        </div>
                    </Box>

                    <Typography fontFamily='glegoo' fontWeight={600} mb={1}>Order Summary</Typography>
                    <Box
                        sx={{
                            backgroundColor: '#F3F4F6',
                            borderRadius: '6px',
                            padding: 2,
                            mb: 2,
                        }}
                    >
                        <Box display="flex" alignItems="center" justifyContent="space-between" mb={1}>
                            <Typography fontFamily='glegoo' className='publish-content-title'>Transaction ID</Typography>
                            <Typography className='publish-content-value' fontWeight={500}>-</Typography>
                        </Box>

                        <Box display="flex" alignItems="center" justifyContent="space-between" mb={1}>
                            <Typography fontFamily='glegoo' className='publish-content-title'>Date & Time</Typography>
                            <Typography className='publish-content-value' fontWeight={500}>-</Typography>
                        </Box>

                        <Box display="flex" justifyContent="space-between" mb={1}>
                            <Typography fontFamily='glegoo' className='publish-content-title'>Ticket Sold Amount</Typography>
                            <Typography className='publish-content-value' fontWeight={500}>${selectedTicket?.sold_price}</Typography>
                        </Box>

                        <Box display="flex" justifyContent="space-between" mb={1}>
                            <Typography fontFamily='glegoo' className='publish-content-title'>Quickasyst Cut</Typography>
                            <Typography className='publish-content-value'>-${selectedTicket?.Quickasyst_Cut}</Typography>
                        </Box>

                        <Box display="flex" justifyContent="space-between" mb={1}>
                            <Typography fontFamily='glegoo' className='publish-content-title'>Tax and Charges</Typography>
                            <Typography className='publish-content-value'>-$10</Typography>
                        </Box>

                        <Divider sx={{ my: 1 }} />

                        <Box display="flex" justifyContent="space-between" mt={1}>
                            <Typography fontFamily='glegoo' color='#475569' fontWeight={700}>Amt. to be settled for users</Typography>
                            <Typography fontFamily='glegoo' color='#0FAAA2' fontWeight={600}>$1,180.00</Typography>
                        </Box>
                    </Box>
                </DialogContent>

                <DialogActions sx={{ px: 3, pb: 2 }}>
                    <Button variant="contained" color="primary">Download</Button>
                </DialogActions>
            </Dialog>

            {/* Payout Dialog */}
            <Dialog open={openPayoutDialog} onClose={handleCloseDialog} fullWidth>

                <DialogTitle variant="h6" fontFamily="Playfair Display" fontWeight="bold">
                    Payout
                </DialogTitle>

                <DialogContent>
                    <Typography fontFamily='glegoo' fontWeight={600} mb={1}>Ticket Details</Typography>
                    <Box mb={2} className='Payout-Ticket-Datails-container'>
                        <div className='Payout-Ticket-Datails'>
                            <div className='publish-content-title'>Event:</div>
                            <div className='publish-content-value'>{selectedTicket?.event}</div>
                        </div>
                        <div className='Payout-Ticket-Datails'>
                            <div className='publish-content-title'>Date:</div>
                            <div className='publish-content-value'>{selectedTicket?.date}</div>
                        </div>
                        <div className='Payout-Ticket-Datails'>
                            <div className='publish-content-title'>Venue:</div>
                            <div className='publish-content-value'> {selectedTicket?.venue}</div>
                        </div>
                        <div className='Payout-Ticket-Datails'>
                            <div className='publish-content-title'>Ticket Placement:</div>
                            <div className='publish-content-value'> Sec {selectedTicket?.section} / Row {selectedTicket?.row} / Seat {selectedTicket?.seat}</div>
                        </div>
                        <div className='Payout-Ticket-Datails'>
                            <div className='publish-content-title'>Ticket QTY:</div>
                            <div className='publish-content-value'>1</div>
                        </div>
                    </Box>

                    <Typography fontFamily='glegoo' fontWeight={600} mb={1}>Order Summary</Typography>
                    <Box
                        sx={{
                            backgroundColor: '#F3F4F6',
                            borderRadius: '6px',
                            padding: 2,
                            mb: 2,
                        }}
                    >
                        <Box display="flex" alignItems="center" justifyContent="space-between" mb={1}>
                            <Typography fontFamily='glegoo' className='publish-content-title'>Transaction ID</Typography>
                            <input className='Payout-Ticket-Datails-input' placeholder="Enter ID" />
                        </Box>

                        <Box display="flex" justifyContent="space-between" mb={1}>
                            <Typography fontFamily='glegoo' className='publish-content-title'>Ticket Sold Amount</Typography>
                            <Typography className='publish-content-value' fontWeight={500}>${selectedTicket?.sold_price}</Typography>
                        </Box>

                        <Box display="flex" justifyContent="space-between" mb={1}>
                            <Typography fontFamily='glegoo' className='publish-content-title'>Quickasyst Cut</Typography>
                            <Typography className='publish-content-value'>-${selectedTicket?.Quickasyst_Cut}</Typography>
                        </Box>

                        <Box display="flex" justifyContent="space-between" mb={1}>
                            <Typography fontFamily='glegoo' className='publish-content-title'>Tax and Charges</Typography>
                            <Typography className='publish-content-value'>-$10</Typography>
                        </Box>

                        <Divider sx={{ my: 1 }} />

                        <Box display="flex" justifyContent="space-between" mt={1}>
                            <Typography fontFamily='glegoo' color='#475569' fontWeight={700}>Amt. to be settled for users</Typography>
                            <Typography fontFamily='glegoo' color='#0FAAA2' fontWeight={600}>$1,180.00</Typography>
                        </Box>
                    </Box>
                </DialogContent>

                <DialogActions sx={{ px: 3, pb: 2 }}>
                    <Button className='Payout-Ticket-Datails-Button' variant="contained" color="primary">Mark As Settled</Button>
                </DialogActions>
            </Dialog >
        </>
    )
}

export default Soldtickets
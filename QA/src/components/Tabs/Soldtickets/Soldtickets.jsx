import React, { useEffect, useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { FILTERSOLDTICKETS, INVOICEDETAILS } from '../../../graphql/SoldTickets/soldQuery.js';
import { TRANSFERAMOUNTTOUSERSBYTICKET } from '../../../graphql/SoldTickets/soldMutation.js';
import SharedTable from '../../GlobalComponents/GlobalTable/Table.jsx';
import { soldColumns } from '../../../utils/SoldColumns/SoldColumns.jsx';
import { toast } from 'react-toastify';
import CloseIcon from '@mui/icons-material/Close';
import moment from 'moment';
import {
    CircularProgress,
    Box,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Divider,
    Button,
    Typography,
    IconButton
} from '@mui/material';


const Soldtickets = ({ filter }) => {


    const pageChangeNumber = 10;

    const [tableData, setTableData] = useState([]);
    const [tableSize, setTableSize] = useState([]);
    const [pageChange, setPageChange] = useState(pageChangeNumber);
    const [offSet, setOffSet] = useState(1);

    const [selectedTicket, setSelectedTicket] = useState(null);
    const [openInvoiceDialog, setOpenInvoiceDialog] = useState(false);
    const [openPayoutDialog, setOpenPayoutDialog] = useState(false);
    const [openInProgressDialog, setOpenInProgressDialog] = useState(false);

    const [orderBy, setOrderBy] = useState({ tp_updated_at: "desc" }, { tp_id: "asc" });
    const [sortOption, setSortOption] = useState('desc');

    const { loading, data } = useQuery(FILTERSOLDTICKETS, {
        variables: {
            ...filter,
            pageSize: pageChange,
            pageOffset: pageChange * (offSet - 1),
            ticketPlacementId: null,
            order_by: orderBy
        },
        fetchPolicy: 'network-only'
    });

    const { data: InvoiceData } = useQuery(INVOICEDETAILS, {
        variables: {
            ticketPlacementId: selectedTicket?.Publish_id
        },
        skip: !selectedTicket || !selectedTicket.Publish_id,
        fetchPolicy: 'network-only'
    });

    const [transferAmount, { loading: transferLoading }] = useMutation(TRANSFERAMOUNTTOUSERSBYTICKET, {
        onCompleted: () => {
            handleCloseDialog();
        },
        onError: error => {
            toast.error(error.message || 'Payout failed:');
        }
    });

    const handleMarkAsSettled = () => {
        if (selectedTicket && selectedTicket.Publish_id) {
            transferAmount({
                variables: {
                    ticketPlacementId: selectedTicket.Publish_id
                }
            });
        } else {
            toast.error('No ticket selected');
        }
    };


    useEffect(() => {
        if (data && data.FilterSoldTickets) {
            const formattedData = data.FilterSoldTickets.map((item, index) => ({
                id: index + 1,
                event: item.e_name,
                date: new Date(item.e_date).toLocaleString('en-US'),
                venue: item.e_address,
                venueTime: new Date(item.e_date).toLocaleString('en-US'),
                section: item.tp_section.toUpperCase(),
                row: item.tp_row.toUpperCase(),
                seat: item.tp_seat_no,
                status: item.tp_payment_status,
                userName: `${item.u_first_name} ${item.u_last_name}`,
                email: item.u_email_id,
                league_name: item.l_name,
                validityStatus: item.tp_validity_status,
                Publish_id: item.tp_id,
                sold_price: item.tp_list_price,
                Quickasyst_Cut: item.tp_quick_cut_amount,
                logitix_amount: item.tp_logitix_amount,
                closeStatus: item.e_status === 'closed' ? item.e_status : ''
            }));

            setTableData(formattedData);
            setTableSize(data.FilterSoldTickets_aggregate.aggregate.count);
        }
    }, [data]);

    const handleOpenDialog = type => {
        if (type === 'invoice') {
            setOpenInvoiceDialog(true);
        }
        else if (type === 'Inprogress') {
            setOpenInProgressDialog(true);
        }
        else {
            setOpenPayoutDialog(true);
        }
    };

    const handleCloseDialog = () => {
        setOpenInvoiceDialog(false);
        setOpenPayoutDialog(false);
        setOpenInProgressDialog(false);
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
                checkboxisdisabled={false}
                data={tableData}
                columns={soldColumns(handleOpenDialog, setSelectedTicket)}

                totalCount={tableSize}
                pageSize={pageChange}
                onPageSizeChange={setPageChange}
                page={offSet}
                onOffSetChange={setOffSet}

                setOrderBy={setOrderBy}
                sortOption={sortOption}
                setSortOption={setSortOption}
            />

            {/* Payout Dialog */}
            <Dialog open={openPayoutDialog} onClose={handleCloseDialog} fullWidth>

                <DialogTitle variant="h6" fontFamily="Playfair Display" fontWeight="bold">
                    Payout
                    <IconButton
                        disableRipple
                        color='#0f172a'
                        onClick={handleCloseDialog}
                        sx={{
                            position: 'absolute',
                            right: 8,
                            top: 8
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>

                <DialogContent>
                    <Typography color='#475569' fontFamily='Playfair Display' fontWeight={600} >Ticket Details</Typography>
                    <Box className='Payout-Ticket-Datails-container'>
                        <div className='Payout-Ticket-Datails'>
                            <div className='publish-content-title'>Event:</div>
                            <div className='publish-content-value'>{InvoiceData?.ticket_placement_by_pk.ticket.event.eventName}</div>
                        </div>
                        <div className='Payout-Ticket-Datails'>
                            <div className='publish-content-title'>Date:</div>
                            <div className='publish-content-value'>
                                {moment(InvoiceData?.ticket_placement_by_pk.ticket.event.eventDate).format('ddd, DD MMM YYYY / hh:mm A [CDT]')}
                            </div>
                        </div>
                        <div className='Payout-Ticket-Datails'>
                            <div className='publish-content-title'>Venue:</div>
                            <div className='publish-content-value'>{InvoiceData?.ticket_placement_by_pk.ticket.event.eventAddress}</div>
                        </div>
                        <div className='Payout-Ticket-Datails'>
                            <div className='publish-content-title'>Ticket Placement:</div>
                            <div className='publish-content-value'> Sec : {selectedTicket?.section} / Row : {selectedTicket?.row} / Seat : {selectedTicket?.seat}</div>
                        </div>
                        <div className='Payout-Ticket-Datails'>
                            <div className='publish-content-title'>Ticket QTY:</div>
                            <div className='publish-content-value'>1</div>
                        </div>
                    </Box>

                    <Typography color='#475569' fontFamily='Playfair Display' fontWeight={600}>Order Summary</Typography>
                    <Box className='invoice-order-summary'>
                        <Box display="flex" justifyContent="space-between" mb={1}>
                            <Typography fontFamily='glegoo' className='publish-content-title'>Received Amount From Logitix</Typography>
                            <Typography className='publish-content-value' fontWeight={500}>${InvoiceData?.ticket_placement_by_pk.tp_logitix_amount.toFixed(2)}</Typography>
                        </Box>

                        <Box display="flex" justifyContent="space-between" mb={1}>
                            <Typography fontFamily='glegoo' className='publish-content-title'>QuickAsyst Fee</Typography>
                            <Typography className='publish-content-value'>-${InvoiceData?.ticket_placement_by_pk.tp_quick_cut_amount}</Typography>
                        </Box>

                        <Box display="flex" justifyContent="space-between" mb={1}>
                            <Typography fontFamily='glegoo' className='publish-content-title'>Tax and Charges</Typography>
                            <Typography className='publish-content-value'>-$0</Typography>
                        </Box>

                        <Divider sx={{ my: 1 }} />

                        <Box display="flex" justifyContent="space-between" mt={1}>
                            <Typography fontFamily='glegoo' color='#475569' fontWeight={700}>Amt. to be settled for users</Typography>
                            <Typography fontFamily='glegoo' color='#0faaa2' fontWeight={600} fontSize={'20px'}>${(InvoiceData?.ticket_placement_by_pk.tp_logitix_amount - InvoiceData?.ticket_placement_by_pk.tp_quick_cut_amount).toFixed(2)}</Typography>
                        </Box>
                    </Box>
                </DialogContent>

                <DialogActions className='payout-mark-btn'>
                    <Button onClick={handleMarkAsSettled} disabled={transferLoading} className='Payout-Ticket-Datails-Button' variant="contained" color="primary">Mark As Settled</Button>
                </DialogActions>
            </Dialog>


            {/* Invoice Dialog */}
            <Dialog open={openInvoiceDialog} onClose={handleCloseDialog} fullWidth>
                <DialogTitle variant="h6" fontFamily="Playfair Display" fontWeight="bold">
                    Invoice
                    <IconButton
                        disableRipple
                        color="inherit"
                        onClick={handleCloseDialog}
                        sx={{
                            position: 'absolute',
                            right: 8,
                            top: 8,
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>

                <DialogContent>
                    <Typography color='#475569' fontFamily='Playfair Display' fontWeight={600} >Ticket Details</Typography>
                    <Box className='Payout-Ticket-Datails-container'>
                        <div className='Payout-Ticket-Datails'>
                            <div className='publish-content-title'>Event</div>
                            <div className='publish-content-value'>{InvoiceData?.ticket_placement_by_pk.ticket.event.eventName}</div>
                        </div>
                        <div className='Payout-Ticket-Datails'>
                            <div className='publish-content-title'>Date</div>
                            <div className='publish-content-value'>{moment(InvoiceData?.ticket_placement_by_pk.ticket.event.eventDate).format('ddd, DD MMM YYYY / hh:mm A [CDT]')}</div>
                        </div>
                        <div className='Payout-Ticket-Datails'>
                            <div className='publish-content-title'>Venue</div>
                            <div className='publish-content-value'> {InvoiceData?.ticket_placement_by_pk.ticket.event.eventAddress}</div>
                        </div>
                        <div className='Payout-Ticket-Datails'>
                            <div className='publish-content-title'>Ticket Placement</div>
                            <div className='publish-content-value'> Sec : {selectedTicket?.section} / Row : {selectedTicket?.row} / Seat : {selectedTicket?.seat}</div>
                        </div>
                        <div className='Payout-Ticket-Datails'>
                            <div className='publish-content-title'>Number Of Tickets</div>
                            <div className='publish-content-value'>1</div>
                        </div>
                    </Box>

                    <Typography color='#475569' fontFamily='Playfair Display' fontWeight={600} >Order Summary</Typography>
                    <Box className='invoice-order-summary'>
                        <Box display="flex" alignItems="center" justifyContent="space-between">
                            <Typography fontFamily='glegoo' className='publish-content-title'>Transaction ID</Typography>
                            <Typography className='publish-content-value' fontSize={'14px'}>{InvoiceData?.ticket_placement_by_pk.payment_transaction[0]?.transactionId}</Typography>
                        </Box>

                        <Box display="flex" alignItems="center" justifyContent="space-between">
                            <Typography fontFamily='glegoo' className='publish-content-title'>Date & Time</Typography>
                            <Typography className='publish-content-value' fontWeight={500}>{moment(InvoiceData?.ticket_placement_by_pk.payment_transaction[0]?.paymentUpdated).format('ddd, DD MMM YYYY / hh:mm A [CDT]')}</Typography>
                        </Box>

                        <Box display="flex" justifyContent="space-between">
                            <Typography fontFamily='glegoo' className='publish-content-title'>Ticket Sold Amount</Typography>
                            <Typography className='publish-content-value' fontWeight={500}>${InvoiceData?.ticket_placement_by_pk.tp_logitix_amount?.toFixed(2)}</Typography>
                        </Box>

                        <Box display="flex" justifyContent="space-between">
                            <Typography fontFamily='glegoo' className='publish-content-title'>Quickasyst Fee</Typography>
                            <Typography className='publish-content-value'>-${InvoiceData?.ticket_placement_by_pk.tp_quick_cut_amount}</Typography>
                        </Box>

                        <Box display="flex" justifyContent="space-between">
                            <Typography fontFamily='glegoo' className='publish-content-title'>Tax and Charges</Typography>
                            <Typography className='publish-content-value'>-$0</Typography>
                        </Box>

                        <Divider sx={{ my: 1 }} />

                        <Box display="flex" justifyContent="space-between" mt={1}>
                            <Typography fontFamily='glegoo' color='#475569' fontWeight={700}>Amt. to be settled for users</Typography>
                            <Typography fontFamily='glegoo' color='#0faaa2' fontWeight={600} fontSize={'20px'}>${(InvoiceData?.ticket_placement_by_pk.tp_logitix_amount - InvoiceData?.ticket_placement_by_pk.tp_quick_cut_amount).toFixed(2)}</Typography>
                        </Box>
                    </Box>
                </DialogContent>

                <DialogActions className='invoice-dialog-actions'>
                    <a
                        href={`https://dev-admin.quickasyst.com/${InvoiceData?.ticket_placement_by_pk.payment_transaction[0]?.stripe_transfers?.st_invoice}`}
                        download
                        style={{ textDecoration: 'none' }}
                        target="_blank"
                    >
                        <Button className='invoice-download-btn' variant="contained" color="primary">
                            Download
                        </Button>
                    </a>
                </DialogActions>
            </Dialog>


            {/* Inprogress Dialog */}
            <Dialog open={openInProgressDialog} onClose={handleCloseDialog} fullWidth>
                <DialogTitle variant="h6" fontFamily="Playfair Display" fontWeight="bold">
                    Payout - In Progress
                    <IconButton
                        disableRipple
                        color="inherit"
                        onClick={handleCloseDialog}
                        sx={{
                            position: 'absolute',
                            right: 8,
                            top: 8,
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>

                <DialogContent>
                    <Typography color='#475569' fontFamily='Playfair Display' fontWeight={600} >Ticket Details</Typography>
                    <Box className='Payout-Ticket-Datails-container'>
                        <div className='Payout-Ticket-Datails'>
                            <div className='publish-content-title'>Event</div>
                            <div className='publish-content-value'>{InvoiceData?.ticket_placement_by_pk.ticket.event.eventName}</div>
                        </div>
                        <div className='Payout-Ticket-Datails'>
                            <div className='publish-content-title'>Date</div>
                            <div className='publish-content-value'>{moment(InvoiceData?.ticket_placement_by_pk.ticket.event.eventDate).format('ddd, DD MMM YYYY / hh:mm A [CDT]')}</div>
                        </div>
                        <div className='Payout-Ticket-Datails'>
                            <div className='publish-content-title'>Venue</div>
                            <div className='publish-content-value'> {InvoiceData?.ticket_placement_by_pk.ticket.event.eventAddress}</div>
                        </div>
                        <div className='Payout-Ticket-Datails'>
                            <div className='publish-content-title'>Ticket Placement</div>
                            <div className='publish-content-value'> Sec : {InvoiceData?.ticket_placement_by_pk?.section.toUpperCase()} / Row : {InvoiceData?.ticket_placement_by_pk?.row.toUpperCase()} / Seat : {InvoiceData?.ticket_placement_by_pk?.seatNo}</div>
                        </div>
                        <div className='Payout-Ticket-Datails'>
                            <div className='publish-content-title'>Number Of Tickets</div>
                            <div className='publish-content-value'>1</div>
                        </div>
                        <div className='Payout-Ticket-Datails'>
                            <div className='publish-content-title'>Sold Price</div>
                            <div className='publish-content-value'>${InvoiceData?.ticket_placement_by_pk.tp_logitix_amount + InvoiceData?.ticket_placement_by_pk.tp_quick_cut_amount}</div>
                        </div>
                    </Box>

                    <Typography color='#475569' fontFamily='Playfair Display' fontWeight={600} >Order Summary</Typography>
                    <Box className='invoice-order-summary'>

                        <Box display="flex" justifyContent="space-between">
                            <Typography fontFamily='glegoo' className='publish-content-title'>Ticket Sold Amount</Typography>
                            <Typography className='publish-content-value' fontWeight={500}>${InvoiceData?.ticket_placement_by_pk.tp_logitix_amount?.toFixed(2)}</Typography>
                        </Box>

                        <Box display="flex" justifyContent="space-between">
                            <Typography fontFamily='glegoo' className='publish-content-title'>Quickasyst Fee</Typography>
                            <Typography className='publish-content-value'>-${InvoiceData?.ticket_placement_by_pk.tp_quick_cut_amount}</Typography>
                        </Box>

                        <Box display="flex" justifyContent="space-between">
                            <Typography fontFamily='glegoo' className='publish-content-title'>Tax and Charges</Typography>
                            <Typography className='publish-content-value'>-$0</Typography>
                        </Box>

                        <Divider sx={{ my: 1 }} />

                        <Box display="flex" justifyContent="space-between" mt={1}>
                            <Typography fontFamily='glegoo' color='#475569' fontWeight={700}>Amount to be settled for users</Typography>
                            <Typography fontFamily='glegoo' color='#0faaa2' fontWeight={600} fontSize={'20px'}>${(InvoiceData?.ticket_placement_by_pk.tp_logitix_amount - InvoiceData?.ticket_placement_by_pk.tp_quick_cut_amount).toFixed(2)}</Typography>
                        </Box>
                    </Box>
                </DialogContent>
            </Dialog>

        </>
    )
}

export default Soldtickets
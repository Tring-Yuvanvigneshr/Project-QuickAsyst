import dayjs from 'dayjs';
import {
    Button,
    IconButton
} from '@mui/material';
import './soldColumns.css';
import invoice from '../../assets/icons/Invoice.svg';
import payout from '../../assets/icons/Payout.svg';

export const soldColumns = (openPopup, setSelectedTicket) => [
    {
        field: 'event',
        headerName: 'Events',
        flex: 1,
        minWidth: 280,
        renderCell: (params) => (
            <div className="event-block">
                <span className="event-name">{params.value}</span>
                <span className="event-league">{params.row.league_name} {params.row.closeStatus === 'closed' ? <label style={{ color: '#000' }}>-</label> : ''} <label className='error-message'>{params.row.closeStatus}</label></span>
            </div>
        )
    },
    {
        field: 'date',
        headerName: 'Date',
        flex: 1,
        minWidth: 150,
        renderCell: (params) => {
            const formattedDate = dayjs(params.value);
            return (
                <div className="date-block">
                    <div>{formattedDate.format('ddd, DD MMM YYYY')}</div>
                    <div>{formattedDate.format('hh:mm A')} CDT</div>
                </div>
            );
        },
    },
    {
        field: 'venue',
        headerName: 'Venue',
        flex: 1,
        minWidth: 240,
        renderCell: (params) => {
            const vp = params.value.split(', ');
            return (
                <div className="venue-block">
                    <div>{vp[0]},</div>
                    <div>{vp[1]},</div>
                    <div>{vp[2]}</div>
                </div>
            );
        },
    },
    {
        field: 'venueTime',
        headerName: 'Venue Time',
        flex: 1,
        minWidth: 150,
        renderCell: (params) => {
            const formattedDate = dayjs(params.value);
            return (
                <div className="date-block">
                    <div>{formattedDate.format('ddd, DD MMM YYYY')}</div>
                    <div>{formattedDate.format('hh:mm A')} CDT</div>
                </div>
            );
        },
    },
    {
        field: 'Ticket placements',
        headerName: 'Ticket placements',
        flex: 1,
        minWidth: 240,
        renderCell: (params) => (
            <div className="ticket-placement-block">
                <div>{params.row.section}</div>
                <div>{params.row.row}</div>
                <div>{params.row.seat}</div>
            </div>
        )
    },
    {
        field: 'soldStatus',
        headerName: 'Status',
        flex: 1,
        minWidth: 220,
        renderCell: (params) => (
            <span className={`paymont-status-block ${params.value === 'Inprogress' ? 'Inprogress' : params.value === 'Success' ? 'Settled' : params.value === 'Failed' ? 'Failed' : 'Settled'}`}>
                {params.value === 'Inprogress' ? 'Settlement In Progress' : params.value === 'Success' ? 'Settled' : params.value === 'Failed' ? 'Failed' : 'Sold'}
            </span>
        ),
    },
    {
        field: 'userName',
        headerName: 'User Name',
        flex: 1,
        minWidth: 250,
        cellClassName: 'left-align',
    },
    {
        field: 'email',
        headerName: 'Email',
        flex: 1,
        minWidth: 400,
        cellClassName: 'left-align',
    },
    {
        field: 'sold price',
        headerName: 'Sold Price',
        flex: 1,
        minWidth: 250,
        renderCell: params => (
            <div
                className="sold-price-container"
            >
                <div className='sold-price-list' >
                    ${params.row.sold_price?.toLocaleString()}
                </div>
                <div className='sold-price-list'>
                    ${params.row.logitix_amount?.toLocaleString()}
                </div>
                <div className='sold-price-list'>
                    ${params.row.Quickasyst_Cut?.toLocaleString()}
                </div>

                <div className='sold-price-divider' />

                {(params.row.status === 'Success' || params.row.status === 'Inprogress') && (
                    <IconButton
                        disableRipple
                        onClick={() => {
                            let selectedPopup = params.row.status === 'Inprogress' ? 'Inprogress' : 'invoice'
                            setSelectedTicket(params.row);
                            openPopup(selectedPopup);
                        }}
                    >
                        <img
                            className={params.row.status === 'Inprogress' ? 'invoice-icon inprogress' : 'invoice-icon'}
                            src={invoice} alt="Invoice" />
                    </IconButton>
                )}

                {(params.row.status === 'Failed' || params.row.status == null) && (
                    <IconButton
                        disableRipple
                        onClick={() => {
                            setSelectedTicket(params.row);
                            openPopup('payout');
                        }}
                    >
                        <img src={payout} alt="Payout" />
                    </IconButton>
                )}
            </div>
        )
    },
];

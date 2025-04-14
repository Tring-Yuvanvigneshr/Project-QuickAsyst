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
        field: 'section',
        headerName: 'Section',
        flex: 1,
        minWidth: 120,
        cellClassName: 'left-align',
    },
    {
        field: 'row',
        headerName: 'Row',
        flex: 1,
        minWidth: 120,
        cellClassName: 'left-align',
    },
    {
        field: 'seat',
        headerName: 'Seat',
        flex: 1,
        minWidth: 120,
        cellClassName: 'left-align',
    },
    {
        field: 'soldStatus',
        headerName: 'Status',
        flex: 1,
        minWidth: 220,
        renderCell: (params) => (
            <span className={`paymont-status-block ${(params.value === 'Inprogress') || ((params.value === null) && (params.row.voided_status === 'Voided_Payout')) ? 'Inprogress' : params.value === 'Success' ? 'Settled' : params.value === 'Failed' ? 'Failed' : 'Settled'}`}>
                {params.value === 'Inprogress' ? 'Settlement In Progress' : params.value === 'Success' ? 'Settled' : params.value === 'Failed' ? 'Failed' : (params.value === null) && (params.row.voided_status !== 'Voided_Payout') ? 'Sold' : 'Voided Payout'}
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
        headerAlign: 'center',
        flex: 1,
        minWidth: 280,
        renderCell: params => (
            <div
                className="sold-price-container"
            >
                <div className='sold-price-list' >
                    ${params.row.sold_price?.toLocaleString()}
                </div>
                <div className='sold-price-divider' />
                <div className='sold-price-list'>
                    ${params.row.logitix_amount?.toLocaleString()}
                </div>
                <div className='sold-price-divider' />
                <div className='sold-price-list'>
                    ${params.row.Quickasyst_Cut?.toLocaleString()}
                </div>

                <div className='sold-price-divider' />

                {(params.row.soldStatus === 'Success' || params.row.soldStatus === 'Inprogress') && (
                    <IconButton
                        disableRipple
                        onClick={() => {
                            let selectedPopup = (params.row.soldStatus === 'Inprogress') || (params.row.soldStatus === null) ? 'Inprogress' : 'invoice'
                            setSelectedTicket(params.row);
                            openPopup(selectedPopup);
                        }}
                    >
                        <img
                            className={(params.row.soldStatus === 'Inprogress') || (params.row.soldStatus === null) ? 'invoice-icon inprogress' : 'invoice-icon'}
                            src={invoice} alt="Invoice" />
                    </IconButton>
                )}

                {(((params.row.soldStatus === null) && (params.row.voided_status !== 'Voided_Payout')) || (params.row.soldStatus === 'Failed') || (((params.row.soldStatus === null) && (params.row.voided_status === 'Voided_Payout')))) && (
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

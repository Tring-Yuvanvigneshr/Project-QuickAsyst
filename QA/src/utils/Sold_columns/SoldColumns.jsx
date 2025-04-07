import dayjs from 'dayjs';
import {
    Button,
    IconButton
} from '@mui/material';
import './SoldColumns.css'
import invoice from '../../assets/icons/Invoice.svg'
import payout from '../../assets/icons/Payout.svg'

export const soldColumns = (openPopup, setSelectedTicket) => [
    {
        field: 'event',
        headerName: 'Events',
        flex: 1,
        minWidth: 200,
        renderCell: (params) => (
            <div className="event-block">
                <span className="event-name">{params.value}</span>
                <span className="event-league">{params.row.league_name}</span>
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
        field: 'status',
        headerName: 'Status',
        flex: 1,
        minWidth: 120,
        renderCell: (params) => (
            <span className={`paymont-status-block ${params.value === 'Inprogress' ? 'Inprogress' : params.value === 'Success' ? 'Settled' : 'rejected'}`}>
                {params.value}
            </span>
        ),
    },
    {
        field: 'sold price',
        headerName: 'Sold Price',
        flex: 1,
        minWidth: 220,
        renderCell: (params) => (
            <div className="sold-price-container" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div className="sold-price" style={{ fontWeight: 500, color: '#374151', minWidth: '80px' }}>
                    ${params.row.sold_price}
                </div>
                <div style={{ borderLeft: '1px solid #E5E7EB', height: '24px' }} />
                {params.row.status === 'Success' && <IconButton
                    disabled={params.row.status !== 'Success'}
                    onClick={() => {
                        setSelectedTicket(params.row);
                        openPopup('invoice');
                    }}
                >
                    <img src={invoice} alt="Invoice" style={{ height: '20px', width: '20px' }} />
                </IconButton>}
                {params.row.status !== 'Success' && <IconButton
                    disabled={params.row.status == 'Success'}
                    onClick={() => {
                        setSelectedTicket(params.row);
                        openPopup('payout');
                    }}
                >
                    <img src={payout} alt="Payout" style={{ height: '20px', width: '20px' }} />
                </IconButton>}
            </div>
        ),
    }
];

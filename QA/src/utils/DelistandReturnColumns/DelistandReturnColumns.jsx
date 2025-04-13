import dayjs from 'dayjs';

export const delistandreturn = () => [
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
        field: 'returnEmail',
        headerName: 'Return Email',
        flex: 1,
        minWidth: 280,
        cellClassName: 'left-align',
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
] 
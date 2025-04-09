import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import './DelistandSoldcolumns.css';

dayjs.extend(utc);
dayjs.extend(timezone);

export const DelistandunsoldColumns = () => [
  {
    field: 'event',
    headerName: 'Events',
    flex: 1,
    minWidth: 280,
    renderCell: (params) => (
      <div className="event-block">
        <span className="event-name">{params.value}</span>
        <span className="event-league">{params.row.league_name} - <label className='close-message'>{params.row.closeStatus}</label></span>
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
    minWidth: 200,
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
    minWidth: 170,
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
    minWidth: 110,
    cellClassName: 'left-align',
  },
  {
    field: 'row',
    headerName: 'Row',
    flex: 1,
    minWidth: 110,
    cellClassName: 'left-align',
  },
  {
    field: 'seat',
    headerName: 'Seat',
    flex: 1,
    minWidth: 100,
    cellClassName: 'left-align',
  },
  { 
    field: 'userName',
    headerName: 'User Name',
    flex: 1,
    minWidth: 260,
    cellClassName: 'left-align',
  },
  {
    field: 'email',
    headerName: 'Email',
    flex: 1,
    minWidth: 400,
    cellClassName: 'left-align',
  },
];
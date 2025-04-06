import dayjs from 'dayjs';
import {
  Button,
  MenuItem,
  Select,
} from '@mui/material';
import { IoIosArrowDown } from 'react-icons/io';
import EditIcon from '@mui/icons-material/Edit';

export const managecolumns = [
    {
      field: 'event',
      headerName: 'Events',
      width: 290,
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
      width: 180,
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
      width: 180,
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
      width: 230,
      renderCell: (params) => {
        const date = new Date(params.value);
        const options = { weekday: 'short', day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' };
        return date.toLocaleString('us', options);
      }
    },
    {
      field: 'Ticket placements',
      headerName: 'Ticket placements',
      width: 200,
      renderCell: (params) => (
        <div className="ticket-placement-block">
          <div>{params.row.section}</div>
          <div>{params.row.row}</div>
          <div>{params.row.seat}</div>
        </div>
      )
    },
    {
      field: 'validate',
      headerName: 'Validate',
      width: 130,
      renderCell: () => (
        <Select
          defaultValue='-Select-'
          variant='standard'
          IconComponent={IoIosArrowDown}
          disableUnderline
          className='validate-select-block'
        >
          <MenuItem disableRipple value='-Select-' disabled>
            -Select-
          </MenuItem>
          <MenuItem disableRipple value='Valid'>
            Valid
          </MenuItem>
          <MenuItem disableRipple value='Invalid'>
            Invalid
          </MenuItem>
        </Select>
      ),
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 150,
      renderCell: (params) => (
        <span className={`status-block ${params.value === 'Verified' ? 'verified' : 'invalid'}`}>
          {params.value}
        </span>
      ),
    },
    {
      field: 'returnEmail',
      headerName: 'Return Email',
      width: 400,
      cellClassName: 'left-align',
    },
    {
      field: 'userName',
      headerName: 'User Name',
      width: 180,
      cellClassName: 'left-align',
    },
    {
      field: 'email',
      headerName: 'Email',
      width: 250,
      cellClassName: 'left-align',
    },
    {
      field: 'period',
      headerName: 'Period Left',
      width: 130,
      cellClassName: 'center-align',
      renderCell: (params) => (
        <span className={params.value.includes('Hour') ? 'period-red' : 'period-default'}>
          {params.value}
        </span>
      ),
    },
    {
      field: 'action',
      headerName: 'Action',
      width: 150,
      renderCell: () => (
        <div className="action-block">
          <Button>
            Publish
          </Button>
          <EditIcon />
        </div>
      ),
    },
  ];
  
  
  // const columnGroupingModel = [
  //   {
  //     groupId: 'Ticket Placements',
  //     children: [{ field: 'section' }, { field: 'row' }, { field: 'seat' }],
  //   },
  // ];
  
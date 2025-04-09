import dayjs from 'dayjs';
import {
  Button,
  MenuItem,
  Select,
} from '@mui/material';
import { IoIosArrowDown } from 'react-icons/io';

export const managecolumns = (onPublish) => [
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
    field: 'validate',
    headerName: 'Validate',
    flex: 1,
    minWidth: 130,
    renderCell: (params) => {
      const validityStatus = params.row.validityStatus;

      return (
        <Select
          defaultValue={validityStatus === true ? 'Valid' : '-Select-'}
          variant="standard"
          IconComponent={IoIosArrowDown}
          disableUnderline
          className="validate-select-block"
        >
          <MenuItem disableRipple value="-Select-" disabled>
            -Select-
          </MenuItem>
          <MenuItem disableRipple value="Valid">
            Valid
          </MenuItem>
          <MenuItem disableRipple value="Invalid">
            Invalid
          </MenuItem>
        </Select>
      );
    },
  },
  {
    field: 'status',
    headerName: 'Status',
    flex: 1,
    minWidth: 160,
    renderCell: (params) => (
      <span className={`status-block ${params.value === 'Verified' ? 'verified' : params.value === 'ToBeVerified' ? 'tobeverified' : 'rejected'}`}>
        {params.value}
      </span>
    ),
  },
  {
    field: 'donationStatus',
    headerName: 'DonationStatus',
    flex: 1,
    minWidth: 150,
    renderCell: (params) => (
      <span className={`status-block ${params.value === 'Donated' ? 'Donated' : 'NotDonated'}`}>
        {params.value}
      </span>
    ),
  },
  {
    field: 'returnEmail',
    headerName: 'Return Email',
    flex: 1,
    minWidth: 200,
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
  {
    field: 'period',
    headerName: 'Period Left',
    flex: 1,
    minWidth: 130,
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
    flex: 1,
    minWidth: 120,
    renderCell: (params) => (

      <div className="action-block">
        <Button
          className={`${params.row.status !== 'Verified' ? 'disabled-btn' : 'enabled-btn'}`}
          onClick={() => onPublish(params.row)}
          disabled={params.row.status !== 'Verified'}
        >
          Publish
        </Button>
      </div>
    ),
  },
];
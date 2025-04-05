import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Box, Button, MenuItem, Select } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { IoIosArrowDown } from 'react-icons/io';
import './table.css';

const columns = [
  { field: 'event', headerName: 'Events', width: 280 },
  { field: 'date', headerName: 'Date', width: 200 },
  {
    field: 'venue',
    headerName: 'Venue',
    width: 220,
  },
  { field: 'venueTime', headerName: 'Venue Time', width: 200 },
  { field: 'section', headerName: 'Section', width: 100 },
  { field: 'row', headerName: 'Row', width: 100 },
  { field: 'seat', headerName: 'Seat', width: 100 },
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
        className='validate-custom-select'
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
      <span
        style={{
          backgroundColor: params.value === 'Verified' ? '#d4f5d4' : '#ffe0cc',
          color: params.value === 'Verified' ? '#118822' : '#ff6600',
          padding: '4px 10px',
          borderRadius: '5px',
          fontSize: '12px',
        }}
      >
        {params.value}
      </span>
    ),
  },
  { field: 'returnEmail', headerName: 'Return Email', width: 180 },
  { field: 'userName', headerName: 'User Name', width: 180 },
  { field: 'email', headerName: 'Email', width: 250 },
  {
    field: 'period',
    headerName: 'Period Left',
    width: 130,
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
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <Button variant='contained' size='small'>
          Publish
        </Button>
        <EditIcon style={{ cursor: 'pointer' }} />
      </div>
    ),
  },
];

const columnGroupingModel = [
  {
    groupId: 'Ticket Placements',
    children: [{ field: 'section' }, { field: 'row' }, { field: 'seat' }],
  },
];

const SharedTable = ({ data }) => {
  return (
    <Box className='dataGrid-container' sx={{ width: '100%' }}>
      <DataGrid
        rows={data}
        columns={columns}
        pageSize={10}
        columnGroupingModel={columnGroupingModel}
        checkboxSelection
        disableRowSelectionOnClick
        disableColumnMenu
        disableColumnSelector
        disableColumnResize
        disableColumnSorting
        columnHeaderHeight={30}
        hideFooter={true}

      />
    </Box>
  );
};

export default SharedTable;

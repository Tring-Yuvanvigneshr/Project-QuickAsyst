import React, { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import {
  Box,
  Button,
  MenuItem,
  Select,
  IconButton,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { IoIosArrowDown } from 'react-icons/io';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import './table.css';
import dayjs from 'dayjs';

const columns = [
  {
    field: 'event',
    headerName: 'Events',
    width: 290,
    renderCell: (params) => {
      return (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          marginTop: '6px',
          lineHeight: 1.4,
        }}>
          <span style={{ fontWeight: 500, fontSize: '14px' }}>
            {params.value}
          </span>
          <span style={{ fontSize: '12px', color: '#888' }}>
            {params.row.league_name}
          </span>
        </div>  
      )
    }
  },
  {
    field: 'date',
    headerName: 'Date',
    width: 180,
    renderCell: (params) => {
      const formattedDate = dayjs(params.value);
      return (
        <div style={{ lineHeight: 1.5, marginTop: '10px', }}>
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
    cellClassName: 'left-align',
    renderCell: (params) => {
      const vp = params.value.split(', ');
      return (
        <div>
          <div style={{ lineHeight: '1.5' }}>
            <div>{vp[0]},</div>
            <div>{vp[1]},</div>
            <div>{vp[2]}</div>
          </div>
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
    renderCell: (params) => {
      return (
        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0px 30px 0px 0px' }}>
          <div>{params.row.section}</div>
          <div>{params.row.row}</div>
          <div>{params.row.seat}</div>
        </div>
      )
    }
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
    cellClassName: 'center-align',
    renderCell: (params) => (
      <span
        style={{
          backgroundColor: params.value === 'Verified' ? '#d4f5d4' : '#ffe0cc',
          color: params.value === 'Verified' ? '#118822' : '#ff6600',
          padding: '4px 10px',
          borderRadius: '0px',
          fontSize: '12px',
        }}
      >
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
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <Button variant='contained' size='small'>
          Publish
        </Button>
        <EditIcon style={{ cursor: 'pointer' }} />
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

const SharedTable = ({ data, totalCount = 50 }) => {
  const [page, setPage] = useState(0); 
  const [pageSize, setPageSize] = useState(10);

  const totalPages = Math.ceil(totalCount / pageSize);

  const handlePageChange = (newPage) => {
    if (newPage >= 0 && newPage < totalPages) {
      setPage(newPage);
    }
  };

  const handlePageSizeChange = (newSize) => {
    setPageSize(newSize);
    setPage(0);
  };

  return (
    <Box className='dataGrid-container' sx={{ width: '100%' }}>
      <DataGrid
        rows={data}
        columns={columns}
        pageSize={pageSize}
        pagination
        paginationMode="server"
        checkboxSelection
        disableRowSelectionOnClick
        disableColumnMenu
        disableColumnSelector
        disableColumnResize
        disableColumnSorting
        columnHeaderHeight={40}
        rowHeight={70}
        hideFooterPagination
        sx={{
          backgroundColor: '#f9f9fa',
          '& .MuiDataGrid-columnHeader': {
            backgroundColor: '#f9f9fa',
          },
        }}
      />

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mt: 2,
          px: 2,
        }}
      >
        <Box display="flex" alignItems="center" gap={1}>
          <span style={{ fontSize: '16px' }}>Show</span>
          <Select
            value={pageSize}
            onChange={(e) => handlePageSizeChange(e.target.value)}
            size="small"
            IconComponent={IoIosArrowDown}
            sx={{
              fontSize: '16px',
              height: '30px',
              width: '70px',
              borderRadius: 0,
              backgroundColor: '#fff',
              border: '1px solid #ccc',
            }}
          >
            {[5, 10, 25].map((size) => (
              <MenuItem key={size} value={size}>
                {size}
              </MenuItem>
            ))}
          </Select>
        </Box>

        <Box display="flex" alignItems="center" gap={1}>
          <IconButton onClick={() => handlePageChange(page - 1)} disabled={page === 0}>
            <ChevronLeft />
          </IconButton>
          {Array.from({ length: totalPages }, (_, i) => (
            <Box
              key={i}
              onClick={() => handlePageChange(i)}
              sx={{
                cursor: 'pointer',
                width: 36,
                height: 36,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '1px solid #ccc',
                backgroundColor: i === page ? '#5b73f2' : '#fff',
                color: i === page ? '#fff' : '#000',
              }}
            >
              {i + 1}
            </Box>
          ))}
          <IconButton onClick={() => handlePageChange(page + 1)} disabled={page + 1 >= totalPages}>
            <ChevronRight />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
};

export default SharedTable;
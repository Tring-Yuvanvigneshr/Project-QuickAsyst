import React, { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import {
  Box,
  MenuItem,
  Select,
  IconButton,
} from '@mui/material';
import { IoIosArrowDown } from 'react-icons/io';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import './table.css';
import '../../../utils/Manage_columns/manageColumns.css'


const SharedTable = ({ data, totalCount = 50, columns }) => {
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

<Box className="pagination-block">
        <Box display="flex" alignItems="center" gap={1}>
          <span className="show-text">Show</span>
          <Select
            value={pageSize}
            onChange={(e) => handlePageSizeChange(e.target.value)}
            size="small"
            IconComponent={IoIosArrowDown}
            className="page-size-select"
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
              className={`pagination-number ${i === page ? 'active-page' : ''}`}
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
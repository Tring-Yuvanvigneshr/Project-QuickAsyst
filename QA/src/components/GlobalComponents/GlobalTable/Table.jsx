import React, { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Box, MenuItem, Select, useMediaQuery, useTheme } from '@mui/material';
import { IoIosArrowDown } from 'react-icons/io';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import './table.css';
import '../../../utils/Manage_columns/manageColumns.css';


const SharedTable = ({ data, totalCount, columns, pageSize, onPageSizeChange, page, onOffSetChange }) => {
  
  const pageSizes = [5, 10, 20];  

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const totalPages = Math.ceil(totalCount / pageSize);

  const handlePageSizeChange = (newSize) => {
    onPageSizeChange(newSize);
    onOffSetChange(0);
  };

  const handlePageChange = (newPage) => {
    onOffSetChange(newPage);
  }

  return (
    <Box className='dataGrid-container' sx={{ width: '100%', overflowX: 'auto' }}>
      <DataGrid
        rows={data}
        columns={columns}
        pageSize={pageSize}
        checkboxSelection
        disableRowSelectionOnClick
        disableColumnMenu
        disableColumnSelector
        disableColumnResize
        disableColumnSorting
        hideFooterPagination
        columnHeaderHeight={isMobile ? 35 : 40}
        rowHeight={isMobile ? 50 : 70}
        sx={{
          backgroundColor: '#f9f9fa',
          '& .MuiDataGrid-columnHeader': {
            backgroundColor: '#f9f9fa',
            fontSize: isMobile ? '12px' : '14px',
          },
          '& .MuiDataGrid-cell': {
            fontSize: isMobile ? '12px' : '14px',
          },
        }}
      />

      <Box className="pagination-block" sx={{ flexDirection: isMobile ? 'column' : 'row' }}>
        <Box display="flex" alignItems="center" gap={1}>
          <span className="show-text">Show</span>
          <Select
            value={pageSize}
            onChange={(e) => handlePageSizeChange(e.target.value)}
            size="small"
            IconComponent={IoIosArrowDown}
            className="page-size-select"
          >
            {pageSizes.map((size) => (
              <MenuItem key={size} value={size}>
                {size}
              </MenuItem>
            ))}
          </Select>
        </Box>

        <Box>
          <Stack spacing={2}>
            <Pagination onChange={(e,value) => handlePageChange(value)} page={page} count={totalPages} variant="outlined" shape="rounded"/>
          </Stack>
        </Box>
      </Box>
    </Box>
  );
};

export default SharedTable;

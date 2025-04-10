import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Box, MenuItem, Select, useMediaQuery, useTheme } from '@mui/material';
import { IoIosArrowDown } from 'react-icons/io';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import './table.css';
import '../../../utils/Manage_columns/manageColumns.css';
import sortArrow from '../../../assets/icons/Vector.png'


const SharedTable = ({ checkboxisdisabled, data, totalCount, columns, pageSize, onPageSizeChange, page, onOffSetChange }) => {

  const pageSizes = [5, 10, 20];

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const totalPages = Math.ceil(totalCount / pageSize);

  const handlePageSizeChange = (newSize) => {
    onPageSizeChange(newSize);
    onOffSetChange(1);
  };

  const handlePageChange = (newPage) => {
    onOffSetChange(newPage);
  }

  const CustomSortIcon = () => {
    const iconClass = 'sort-icon';
  
    return <img src={sortArrow} alt="Sort" className={iconClass} />;
  };
  
  const columnsWithCustomSorting = columns.map((col) => ({
    ...col,
    renderHeader: (params) => (
      <Box className="column-header">
        {params.colDef.headerName}
        <CustomSortIcon />
      </Box>
    ),
  }));


  return (
    <Box className='dataGrid-container' sx={{ width: '100%', overflowX: 'auto' }}>
      <DataGrid
        rows={data}
        columns={columnsWithCustomSorting}
        pageSize={pageSize}
        checkboxSelection={checkboxisdisabled}
        disableRowSelectionOnClick
        disableColumnMenu
        disableColumnSelector
        disableColumnResize
        disableColumnSorting
        scrollbarSize={5}
        hideFooter
        columnHeaderHeight={isMobile ? 35 : 40}
        rowHeight={isMobile ? 50 : 80}
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

        <Box className='pagination'>
          <Stack spacing={2}>
            <Pagination onChange={(e, value) => handlePageChange(value)} page={page} count={totalPages} variant="outlined" shape="rounded" />
          </Stack>
        </Box>
      </Box>
    </Box>
  );
};

export default SharedTable;

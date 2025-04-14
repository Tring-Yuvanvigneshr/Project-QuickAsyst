import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Box, MenuItem, Select, useMediaQuery, useTheme } from '@mui/material';
import { IoIosArrowDown } from 'react-icons/io';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import './table.css';
import '../../../utils/ManageColumns/manageColumns.css';
import { FaSort } from 'react-icons/fa';


const SharedTable = ({
  checkboxisdisabled,
  data,
  columns,

  totalCount,
  pageSize,
  onPageSizeChange,
  page,
  onOffSetChange,

  setOrderBy,
  sortOption,
  setSortOption
}) => {

  const PagenoFive = 5;
  const PagenoTen = 10;
  const PagenoTwenty = 20;

  const pageSizes = [PagenoFive, PagenoTen, PagenoTwenty];

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const totalPages = Math.ceil(totalCount / pageSize);

  const handlePageSizeChange = (newSize) => {
    onPageSizeChange(newSize);
    onOffSetChange(1);
  };

  const handlePageChange = (newPage) => {
    onOffSetChange(newPage);
  };

  const sortOptionHeadders = {
    event: 'e_name',
    date: 'e_date',
    venue: 'e_address',
    venueTime: "e_date",
    status: 'tp_status',
    returnEmail: 'tp_delist_requested_email',
    userName: 'full_name',
    email: 'u_email_id',
    period: 'e_date',
    Status: 'tp_payment_status',
  }

  const handleSortClick = (field) => {
    const newSortOption = sortOption === 'asc' ? 'desc' : 'asc';
    setSortOption(newSortOption);
    setOrderBy([{ [sortOptionHeadders[field]]: newSortOption }, { tp_id: 'asc' }]);
  };

  const columnsWithCustomSorting = columns.map(col => {
    const excludeSortIcon = ['Row', 'Section', 'Seat', 'DonationStatus','Validate', 'Ticket placements', 'Sold Price', 'Action'];
    const isExcluded = excludeSortIcon.includes(col.headerName);

    return {
      ...col,
      sortable: !isExcluded,
      renderHeader: params => (
        <Box
          className={!excludeSortIcon.includes(col.headerName) ? "column-header" : "column-header-non-sorting"}
          onClick={() => {
            if (!excludeSortIcon.includes(col.headerName)) handleSortClick(col.field);
          }}
        >
          {params.colDef.headerName}
          {!excludeSortIcon.includes(col.headerName) && <FaSort className="sort-icon"/>}
        </Box>
      ),
    };
  });


  return (
    <Box className='dataGrid-container' sx={{ width: '100%', overflowX: 'auto' }}>
      <div className={`custom-grid-wrapper ${data.length === 0 ? 'empty-data' : ''}`}>
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
          hideFooter
          columnHeaderHeight={40}
          rowHeight={80}
          slots={{
            noRowsOverlay: () => {
              null
            },
          }}
        />
      </div>

      {data.length === 0 &&<h3 className='No-data-overlay'>No Data Found</h3>}

      <Box className="pagination-block" display={data.length === 0 && 'none'} sx={{ flexDirection: isMobile ? 'column' : 'row' }}>
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
            <Pagination className='pagination-item' onChange={(e, value) => handlePageChange(value)} page={page} count={totalPages} variant="outlined" shape="rounded" />
          </Stack>
        </Box>
      </Box>
    </Box>
  );
};

export default SharedTable;

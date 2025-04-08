import React, { useEffect, useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { FILTERMANAGETICKETS } from '../../../Graphql/ManageTickets/manageQuery.js';
import { PUBLISHTICKETS } from '../../../Graphql/ManageTickets/manageMutation.js';
import SharedTable from './../../GlobalComponents/GlobalTable/Table.jsx';
import {
  CircularProgress,
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
  InputAdornment,
} from '@mui/material';
import { managecolumns } from './../../../utils/Manage_columns/ManageColumns.jsx';
import { toast } from 'react-toastify';

const Managetickets = ({ filter }) => {
  
  const [publishTicket] = useMutation(PUBLISHTICKETS);
  const [tableData, setTableData] = useState([]);
  const [tableSize, setTableSize] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [price, setPrice] = useState('');
  const [errorPrice, setErrorPrice] = useState(false);
  const [pageChange, setPageChange] = useState(10);
  const [offSet, setOffSet] = useState(0);
  
  
  const { loading, error, data, refetch } = useQuery(FILTERMANAGETICKETS, {
    variables: {
      ...filter,
      pageSize: pageChange,
      pageOffset: pageChange*offSet
    },
    fetchPolicy: 'network-only'
  });

  const handleButtonClick = (ticket) => {
    setSelectedTicket(ticket);
    setPrice('');
    setErrorPrice(false);
    setOpenDialog(true);
  };

  const handleConfirm = async () => {
    try {
      await publishTicket({
        variables: {
          publishTicketsInput: {listPrice: price,
          ticketPlacementIds: [
            selectedTicket.Publish_id
          ],}
        },
      });
      toast.success("Ticket published successfully!");
      setOpenDialog(false);
      refetch();
    } catch (err) {
      toast.error(`Error: ${err.message}`);
    }
  };

  const handleReset = () => {
    setPrice('');
    setErrorPrice(false);
  };

  const handleClose = () => {
    setOpenDialog(false);
    setSelectedTicket(null);
    setPrice('');
    setErrorPrice(false);
  };

  const handlePriceChange = (value) => {
    setPrice(value)
    if(price === ''){
      setErrorPrice(true)
    }
  }

  useEffect(() => {
    if (data && data.filtermanagetickets) {
      const formattedData = data.filtermanagetickets.map((item, index) => ({
        id: index + 1,
        event: item.e_name,
        date: new Date(item.e_date).toLocaleString("en-US", { timeZone: item.e_time_zone }),
        venue: item.e_address,
        venueTime: new Date(item.e_date).toLocaleString("en-US", { timeZone: item.e_time_zone }),
        section: item.tp_section.toUpperCase(),
        row: item.tp_row.toUpperCase(),
        seat: item.tp_seat_no,
        validate: item.tp_validity_status ? "Valid" : "Invalid",
        status: item.tp_status,
        donationStatus: item.tp_is_support_vanderbilt_nil_fund ? "Donated" : '-',
        returnEmail: item.tp_delist_requested_email || "-",
        userName: item.full_name,
        email: item.u_email_id,
        period: "1 Days",
        league_name: item.l_name,
        validityStatus: item.tp_validity_status,
        Publish_id: item.tp_id
      }));

      console.log(formattedData);
        
      setTableData(formattedData);
      setTableSize(data.filtermanagetickets_aggregate.aggregate.count)
    }
  }, [data]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }


  return (
    <>
      <SharedTable
        checkboxisdisabled={true}
        data={tableData}
        columns={managecolumns(handleButtonClick)}
        totalCount={tableSize}
        pageSize={pageChange}
        onPageSizeChange={setPageChange}
        page={offSet}
        onOffSetChange={setOffSet}
      />

      <Dialog className='publish-dialog' open={openDialog} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle color='#0f172a' fontFamily={'Playfair Display'} fontWeight={'bold'}>
          Publish Ticket
        </DialogTitle>

        <DialogContent>
          {selectedTicket && (
            <>
              <div className='publish-event'>
                Event Details
              </div>

              <Box pl={1} mb={2}>
                <div className='publish-dialog-row'>
                  <div className='publish-content-title'>Event</div>
                  <div className='publish-content-value'>{selectedTicket.event}</div>
                </div>

                <div className='publish-dialog-row'>
                  <div className='publish-content-title'>Date</div>
                  <div className='publish-content-value' >
                    {selectedTicket.date}
                  </div>
                </div>

                <div className='publish-dialog-row'>
                  <div className='publish-content-title'>Venue</div>
                  <div className='publish-content-value'>{selectedTicket.venue}</div>
                </div>

                <div className='publish-dialog-row'>
                  <div className='publish-content-title'>Ticket Placement</div>
                  <div className='publish-content-value'>
                    Sec: {selectedTicket.section} / Row: {selectedTicket.row} / Seat: {selectedTicket.seat}
                  </div>
                </div>
              </Box>
            </>
          )}

          <div className='publish-event'>
            List Price
          </div>

          <div className='publish-list-price'>
            <div>
              <div>Enter amount</div>
            </div>
            <div className='publish-input-container'>
              <input
                className='publish-input-container-input'
                placeholder="Eg. $121.00"
                value={price}
                onChange={(e) => handlePriceChange(e.target.value)}
                type='number'
              />
            </div>
          </div>

          <Box display="flex" justifyContent="flex-end" gap={2}>
            <Button className='reset-btn' onClick={handleReset}>Reset</Button>
            <Button className='apply-btn' onClick={handleConfirm} variant="contained">Confirm</Button>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Managetickets;

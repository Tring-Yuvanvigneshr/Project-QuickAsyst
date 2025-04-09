import React, { useEffect, useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { FILTERMANAGETICKETS } from '../../../Graphql/ManageTickets/manageQuery.js';
import { PUBLISHTICKETS, UPDATETICKETSTATUS, UPDATERETURNTICKETS } from '../../../Graphql/ManageTickets/manageMutation.js';
import SharedTable from './../../GlobalComponents/GlobalTable/Table.jsx';
import {
  CircularProgress,
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Avatar,
  Typography
} from '@mui/material';
import { managecolumns } from './../../../utils/Manage_columns/ManageColumns.jsx';
import { toast } from 'react-toastify';
import CloseIcon from '@mui/icons-material/Close';
import ReturnIcon from "../../../assets/icons/ReturnPopupIcon.svg";
import IconButton from '@mui/material/IconButton';

const Managetickets = ({ filter }) => {

  const [publishTicket] = useMutation(PUBLISHTICKETS);
  const [updateTicketStatus] = useMutation(UPDATETICKETSTATUS);
  const [updateReturnTickets] = useMutation(UPDATERETURNTICKETS);
  const [tableData, setTableData] = useState([]);
  const [tableSize, setTableSize] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [openReturnDialog, setOpenReturnDialog] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [selectedReturnTicket, setSelectedReturnTicket] = useState(null);
  const [price, setPrice] = useState('');
  const [errorPrice, setErrorPrice] = useState(false);
  const [pageChange, setPageChange] = useState(10);
  const [offSet, setOffSet] = useState(1);


  const { loading, error, data, refetch } = useQuery(FILTERMANAGETICKETS, {
    variables: {
      ...filter,
      pageSize: pageChange,
      pageOffset: pageChange * (offSet - 1),
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
          publishTicketsInput: {
            listPrice: price,
            ticketPlacementIds: [
              selectedTicket.Publish_id
            ]
          }
        },
      });
      toast.success('Ticket published successfully!');
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
    setPrice(value);
    if (price === '') {
      setErrorPrice(true);
    }
  }

  const handleValidationChange = async (ticketPlacementId, status) => {
    try {
      const { data } = await updateTicketStatus({
        variables: {
          ticketPlacementId: [ticketPlacementId],
          isValid: status,
        },
      });

      toast.success(data.updateTicketStatus.message);
      refetch();
    } catch (error) {
      toast.error(error.message || 'Failed to update ticket status');
    }
  };

  const handleReturnDialogOpen = (ticket) => {
    setSelectedReturnTicket(ticket);
    setOpenReturnDialog(true);
  };

  const handleReturnConfirm = async () => {
    try {
      await updateReturnTickets({
        variables: {
          ticketPlacementId: selectedReturnTicket.Publish_id,
        },
      });
      toast.success('Ticket return successfully updated!');
      setOpenReturnDialog(false);
      refetch();
    } catch (err) {
      setOpenReturnDialog(false);
      refetch();
      toast.error(`Error: ${err.message}`);
    }
  };

  const handleReturnCancel = () => {
    refetch();
    setOpenReturnDialog(false);
  };


  const dummydata = {
    "data": {
      "filtermanagetickets": [
        {
          "e_name": "Columbus Blue Jackets vs Ottawa Senators",
          "l_name": "NHL",
          "e_date": "2025-04-08T23:00:00+00:00",
          "e_address": "Nationwide Arena, Columbus, OH",
          "tp_section": "163",
          "tp_row": "61",
          "tp_seat_no": 2,
          "tp_status": "Delist",
          "u_id": "3e1ba81e-2c7e-4887-bb7c-7bb4093d11a2",
          "u_first_name": "priyadharshini",
          "u_last_name": "refaffdirecttwo",
          "tp_validity_status": true,
          "tp_is_published": false,
          "e_id": "0eb1b959-2f5a-48b5-9eed-2a5e81561c8e",
          "t_id": "a2db1006-d1e5-457c-84b3-38bed3354734",
          "tp_id": "3faef1d0-76f8-4984-a9e8-6af620f03365",
          "e_status": "scheduled",
          "user": {
            "u_role": "user",
            "__typename": "user"
          },
          "full_name": "priyadharshini refaffdirecttwo",
          "u_email_id": "priyadharshini.th+refaffdirecttwo@tringapps.com",
          "u_original_email": null,
          "e_brand_name": "Senators vs Blue Jackets",
          "e_time_zone": "US/Eastern",
          "e_date_time_zone": "Tuesday ~ Apr 08 ~ 7:00 pm EDT",
          "tp_delist_requested_email": "priya@mailinator.com",
          "__typename": "getmanageticket"
        },
        {
          "e_name": "Chicago Blackhawks vs Pittsburgh Penguins",
          "l_name": "NHL",
          "e_date": "2025-04-06T22:00:00+00:00",
          "e_address": "United Center, Chicago, IL",
          "tp_section": "a",
          "tp_row": "s",
          "tp_seat_no": 2,
          "tp_status": "Verified",
          "u_id": "3e1ba81e-2c7e-4887-bb7c-7bb4093d11a2",
          "u_first_name": "priyadharshini",
          "u_last_name": "refaffdirecttwo",
          "tp_validity_status": true,
          "tp_is_published": false,
          "e_id": "55de4244-44a0-4ce0-b3a4-fea6ce31de41",
          "t_id": "68c33b4a-5839-4334-832c-9410df821026",
          "tp_id": "03faec15-9da0-4dbf-9541-fe309e12cd89",
          "e_status": "scheduled",
          "user": {
            "u_role": "admin",
            "__typename": "user"
          },
          "full_name": "priyadharshini refaffdirecttwo",
          "u_email_id": "priyadharshini.th+refaffdirecttwo@tringapps.com",
          "u_original_email": null,
          "e_brand_name": "Penguins vs Blackhawks",
          "e_time_zone": "US/Central",
          "e_date_time_zone": "Sunday ~ Apr 06 ~ 5:00 pm CDT",
          "tp_delist_requested_email": null,
          "__typename": "getmanageticket"
        },
        {
          "e_name": "Chicago Blackhawks vs Pittsburgh Penguins",
          "l_name": "NHL",
          "e_date": "2025-04-06T22:00:00+00:00",
          "e_address": "United Center, Chicago, IL",
          "tp_section": "a",
          "tp_row": "f",
          "tp_seat_no": 2,
          "tp_status": "ToBeVerified",
          "u_id": "3e1ba81e-2c7e-4887-bb7c-7bb4093d11a2",
          "u_first_name": "priyadharshini",
          "u_last_name": "refaffdirecttwo",
          "tp_validity_status": null,
          "tp_is_published": false,
          "e_id": "55de4244-44a0-4ce0-b3a4-fea6ce31de41",
          "t_id": "db420560-dc91-492c-a112-7782f4d416c1",
          "tp_id": "65f24aa4-54cf-4b0a-a7fd-a8edce5119b2",
          "e_status": "scheduled",
          "user": null,
          "full_name": "priyadharshini refaffdirecttwo",
          "u_email_id": "priyadharshini.th+refaffdirecttwo@tringapps.com",
          "u_original_email": null,
          "e_brand_name": "Penguins vs Blackhawks",
          "e_time_zone": "US/Central",
          "e_date_time_zone": "Sunday ~ Apr 06 ~ 5:00 pm CDT",
          "tp_delist_requested_email": null,
          "__typename": "getmanageticket"
        },
        {
          "e_name": "Chicago Blackhawks vs Pittsburgh Penguins",
          "l_name": "NHL",
          "e_date": "2025-04-06T22:00:00+00:00",
          "e_address": "United Center, Chicago, IL",
          "tp_section": "12",
          "tp_row": "3",
          "tp_seat_no": 2,
          "tp_status": "ToBeVerified",
          "u_id": "3e1ba81e-2c7e-4887-bb7c-7bb4093d11a2",
          "u_first_name": "priyadharshini",
          "u_last_name": "refaffdirecttwo",
          "tp_validity_status": null,
          "tp_is_published": false,
          "e_id": "55de4244-44a0-4ce0-b3a4-fea6ce31de41",
          "t_id": "094a1141-aa06-45fe-9a5c-680d9893f579",
          "tp_id": "7fce3a9a-5b75-49ac-9485-def859184377",
          "e_status": "scheduled",
          "user": null,
          "full_name": "priyadharshini refaffdirecttwo",
          "u_email_id": "priyadharshini.th+refaffdirecttwo@tringapps.com",
          "u_original_email": null,
          "e_brand_name": "Penguins vs Blackhawks",
          "e_time_zone": "US/Central",
          "e_date_time_zone": "Sunday ~ Apr 06 ~ 5:00 pm CDT",
          "tp_delist_requested_email": null,
          "__typename": "getmanageticket"
        },
        {
          "e_name": "Chicago Blackhawks vs Pittsburgh Penguins",
          "l_name": "NHL",
          "e_date": "2025-04-06T22:00:00+00:00",
          "e_address": "United Center, Chicago, IL",
          "tp_section": "a",
          "tp_row": "s",
          "tp_seat_no": 3,
          "tp_status": "ToBeVerified",
          "u_id": "3e1ba81e-2c7e-4887-bb7c-7bb4093d11a2",
          "u_first_name": "priyadharshini",
          "u_last_name": "refaffdirecttwo",
          "tp_validity_status": null,
          "tp_is_published": false,
          "e_id": "55de4244-44a0-4ce0-b3a4-fea6ce31de41",
          "t_id": "68c33b4a-5839-4334-832c-9410df821026",
          "tp_id": "b150218f-f1f7-442c-bb0e-7b5eed882524",
          "e_status": "scheduled",
          "user": null,
          "full_name": "priyadharshini refaffdirecttwo",
          "u_email_id": "priyadharshini.th+refaffdirecttwo@tringapps.com",
          "u_original_email": null,
          "e_brand_name": "Penguins vs Blackhawks",
          "e_time_zone": "US/Central",
          "e_date_time_zone": "Sunday ~ Apr 06 ~ 5:00 pm CDT",
          "tp_delist_requested_email": null,
          "__typename": "getmanageticket"
        },
        {
          "e_name": "Chicago Blackhawks vs Pittsburgh Penguins",
          "l_name": "NHL",
          "e_date": "2025-04-06T22:00:00+00:00",
          "e_address": "United Center, Chicago, IL",
          "tp_section": "a",
          "tp_row": "d",
          "tp_seat_no": 3,
          "tp_status": "ToBeVerified",
          "u_id": "3e1ba81e-2c7e-4887-bb7c-7bb4093d11a2",
          "u_first_name": "priyadharshini",
          "u_last_name": "refaffdirecttwo",
          "tp_validity_status": null,
          "tp_is_published": false,
          "e_id": "55de4244-44a0-4ce0-b3a4-fea6ce31de41",
          "t_id": "dbd1adbe-1781-4165-83cc-56d75a9c9adc",
          "tp_id": "cc599692-46aa-479b-9681-7de585ea7c77",
          "e_status": "scheduled",
          "user": null,
          "full_name": "priyadharshini refaffdirecttwo",
          "u_email_id": "priyadharshini.th+refaffdirecttwo@tringapps.com",
          "u_original_email": null,
          "e_brand_name": "Penguins vs Blackhawks",
          "e_time_zone": "US/Central",
          "e_date_time_zone": "Sunday ~ Apr 06 ~ 5:00 pm CDT",
          "tp_delist_requested_email": null,
          "__typename": "getmanageticket"
        },
        {
          "e_name": "Chicago Blackhawks vs Pittsburgh Penguins",
          "l_name": "NHL",
          "e_date": "2025-04-06T22:00:00+00:00",
          "e_address": "United Center, Chicago, IL",
          "tp_section": "a",
          "tp_row": "a",
          "tp_seat_no": 4,
          "tp_status": "ToBeVerified",
          "u_id": "3e1ba81e-2c7e-4887-bb7c-7bb4093d11a2",
          "u_first_name": "priyadharshini",
          "u_last_name": "refaffdirecttwo",
          "tp_validity_status": null,
          "tp_is_published": false,
          "e_id": "55de4244-44a0-4ce0-b3a4-fea6ce31de41",
          "t_id": "cce84e19-2769-4312-8077-b9a197298e82",
          "tp_id": "d4f3de19-2485-496c-a805-8342dd3c16d9",
          "e_status": "scheduled",
          "user": null,
          "full_name": "priyadharshini refaffdirecttwo",
          "u_email_id": "priyadharshini.th+refaffdirecttwo@tringapps.com",
          "u_original_email": null,
          "e_brand_name": "Penguins vs Blackhawks",
          "e_time_zone": "US/Central",
          "e_date_time_zone": "Sunday ~ Apr 06 ~ 5:00 pm CDT",
          "tp_delist_requested_email": null,
          "__typename": "getmanageticket"
        },
        {
          "e_name": "Chicago Blackhawks vs Pittsburgh Penguins",
          "l_name": "NHL",
          "e_date": "2025-04-06T22:00:00+00:00",
          "e_address": "United Center, Chicago, IL",
          "tp_section": "12",
          "tp_row": "3",
          "tp_seat_no": 1,
          "tp_status": "ToBeVerified",
          "u_id": "3e1ba81e-2c7e-4887-bb7c-7bb4093d11a2",
          "u_first_name": "priyadharshini",
          "u_last_name": "refaffdirecttwo",
          "tp_validity_status": null,
          "tp_is_published": false,
          "e_id": "55de4244-44a0-4ce0-b3a4-fea6ce31de41",
          "t_id": "094a1141-aa06-45fe-9a5c-680d9893f579",
          "tp_id": "daf1eb7d-2879-470e-bd28-450e00694f1f",
          "e_status": "scheduled",
          "user": null,
          "full_name": "priyadharshini refaffdirecttwo",
          "u_email_id": "priyadharshini.th+refaffdirecttwo@tringapps.com",
          "u_original_email": null,
          "e_brand_name": "Penguins vs Blackhawks",
          "e_time_zone": "US/Central",
          "e_date_time_zone": "Sunday ~ Apr 06 ~ 5:00 pm CDT",
          "tp_delist_requested_email": null,
          "__typename": "getmanageticket"
        },
        {
          "e_name": "Chicago Blackhawks vs Pittsburgh Penguins",
          "l_name": "NHL",
          "e_date": "2025-04-06T22:00:00+00:00",
          "e_address": "United Center, Chicago, IL",
          "tp_section": "a",
          "tp_row": "d",
          "tp_seat_no": 2,
          "tp_status": "ToBeVerified",
          "u_id": "3e1ba81e-2c7e-4887-bb7c-7bb4093d11a2",
          "u_first_name": "priyadharshini",
          "u_last_name": "refaffdirecttwo",
          "tp_validity_status": null,
          "tp_is_published": false,
          "e_id": "55de4244-44a0-4ce0-b3a4-fea6ce31de41",
          "t_id": "dbd1adbe-1781-4165-83cc-56d75a9c9adc",
          "tp_id": "e6398441-dc86-4b2b-a194-2a8b66b5285c",
          "e_status": "scheduled",
          "user": null,
          "full_name": "priyadharshini refaffdirecttwo",
          "u_email_id": "priyadharshini.th+refaffdirecttwo@tringapps.com",
          "u_original_email": null,
          "e_brand_name": "Penguins vs Blackhawks",
          "e_time_zone": "US/Central",
          "e_date_time_zone": "Sunday ~ Apr 06 ~ 5:00 pm CDT",
          "tp_delist_requested_email": null,
          "__typename": "getmanageticket"
        },
        {
          "e_name": "Chicago Blackhawks vs Pittsburgh Penguins",
          "l_name": "NHL",
          "e_date": "2025-04-06T22:00:00+00:00",
          "e_address": "United Center, Chicago, IL",
          "tp_section": "a",
          "tp_row": "f",
          "tp_seat_no": 3,
          "tp_status": "ToBeVerified",
          "u_id": "3e1ba81e-2c7e-4887-bb7c-7bb4093d11a2",
          "u_first_name": "priyadharshini",
          "u_last_name": "refaffdirecttwo",
          "tp_validity_status": null,
          "tp_is_published": false,
          "e_id": "55de4244-44a0-4ce0-b3a4-fea6ce31de41",
          "t_id": "db420560-dc91-492c-a112-7782f4d416c1",
          "tp_id": "fe09c0a8-1dc3-4cdc-9fc9-c3520417e253",
          "e_status": "scheduled",
          "user": null,
          "full_name": "priyadharshini refaffdirecttwo",
          "u_email_id": "priyadharshini.th+refaffdirecttwo@tringapps.com",
          "u_original_email": null,
          "e_brand_name": "Penguins vs Blackhawks",
          "e_time_zone": "US/Central",
          "e_date_time_zone": "Sunday ~ Apr 06 ~ 5:00 pm CDT",
          "tp_delist_requested_email": null,
          "__typename": "getmanageticket"
        }
      ],
      "filtermanagetickets_aggregate": {
        "aggregate": {
          "count": 160,
          "__typename": "getmanageticket_aggregate_fields"
        },
        "__typename": "getmanageticket_aggregate"
      },
      "filterlisttickets_aggregate": {
        "aggregate": {
          "count": 4,
          "__typename": "getmanageticket_aggregate_fields"
        },
        "__typename": "getmanageticket_aggregate"
      },
      "FilterSoldTickets_aggregate": {
        "aggregate": {
          "count": 311,
          "__typename": "getmanageticket_aggregate_fields"
        },
        "__typename": "getmanageticket_aggregate"
      },
      "filterreturntickets_aggregate": {
        "aggregate": {
          "count": 68,
          "__typename": "getmanageticket_aggregate_fields"
        },
        "__typename": "getmanageticket_aggregate"
      },
      "filterUnsoldTickets_aggreagate": {
        "aggregate": {
          "count": 805,
          "__typename": "getmanageticket_aggregate_fields"
        },
        "__typename": "getmanageticket_aggregate"
      }
    }
  }


  useEffect(() => {
    // if (data && data.filtermanagetickets) {
    const formattedData = dummydata.data.filtermanagetickets.map((item, index) => {
      const eventDate = new Date(item.e_date);
      const currentDate = new Date();

      const timeDifference = eventDate - currentDate;

      const daysLeft = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
      const hoursLeft = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

      let period = daysLeft > 0 ? `${daysLeft} Days` : `${hoursLeft} Hours`;

      return {
        id: index + 1,
        event: item.e_name,
        date: new Date(item.e_date).toLocaleString('en-US', { timeZone: item.e_time_zone }),
        venue: item.e_address,
        venueTime: new Date(item.e_date).toLocaleString('en-US', { timeZone: item.e_time_zone }),
        section: item.tp_section.toUpperCase(),
        row: item.tp_row.toUpperCase(),
        seat: item.tp_seat_no,
        validate: item.tp_validity_status ? 'Valid' : 'Invalid',
        status: item.tp_status,
        donationStatus: item.tp_is_support_vanderbilt_nil_fund ? 'Donated' : '-',
        returnEmail: item.tp_delist_requested_email || '-',
        userName: item.full_name,
        email: item.u_email_id,
        period: period,
        league_name: item.l_name,
        validityStatus: item.tp_validity_status,
        Publish_id: item.tp_id,
      };
    });

    setTableData(formattedData);
    //   setTableSize(data.filtermanagetickets_aggregate.aggregate.count);
    // }
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
        columns={managecolumns(handleButtonClick, handleValidationChange, handleReturnDialogOpen)}
        totalCount={tableSize}
        pageSize={pageChange}
        onPageSizeChange={setPageChange}
        page={offSet}
        onOffSetChange={setOffSet}
      />

      <Dialog className='publish-dialog' open={openDialog} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle
          className='publish-dialog-title'
          sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px' }}
          color='#0f172a'
          fontFamily={'Playfair Display'}
          fontWeight={800}
        >
          Publish Ticket
          <IconButton disableRipple color="inherit" onClick={handleClose} aria-label="close">
            <CloseIcon />
          </IconButton>
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
                    Sec : {selectedTicket.section} / Row : {selectedTicket.row} / Seat : {selectedTicket.seat}
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


      <Dialog open={openReturnDialog} onClose={handleReturnCancel} fullWidth maxWidth="xs" PaperProps={{ className: "delist-dialog" }}>
        <DialogContent className="delist-dialog-content">
          <Avatar
            src={ReturnIcon}
            alt="Return Icon"
            className="delist-avatar"
          />
          <Typography variant="h6" fontWeight="bold" gutterBottom className="delist-typography-header">
            Return?
          </Typography>
          <Typography variant="body2" color="text.secondary" mb={4} className="delist-typography-body">
            Kindly confirm – Once you returned the ticket to the sender
          </Typography>
          <Box display="flex" justifyContent="center" gap={2}>
            <Button
              onClick={handleReturnCancel}
              variant="outlined"
              className="delist-btn delist-cancel-btn"
            >
              Cancel
            </Button>
            <Button
              onClick={handleReturnConfirm}
              variant="contained"
              className="delist-btn delist-confirm-btn"
            >
              Confirm
            </Button>
          </Box>
        </DialogContent>
      </Dialog>

    </>
  );
};

export default Managetickets;

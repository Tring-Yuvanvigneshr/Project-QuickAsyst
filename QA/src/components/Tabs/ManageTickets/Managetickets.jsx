import React, { useEffect, useState, useCallback } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { FILTERMANAGETICKETS } from '../../../Graphql/ManageTickets/manageQuery.js';
import { PUBLISHTICKETS } from './../../../Graphql/ManageTickets/manageMutation.js';
import SharedTable from './../../GlobalComponents/GlobalTable/Table.jsx';
import { CircularProgress, Box, Button, Dialog, DialogActions, DialogContent, Typography } from '@mui/material';
import { managecolumns } from './../../../utils/Manage_columns/ManageColumns.jsx';
import { toast } from "react-toastify";
import popupicon from '../../../assets/icons/Popup Status.svg'

const Managetickets = ({ filter }) => {
  const { loading, error, data, refetch } = useQuery(FILTERMANAGETICKETS, {
    variables: filter,
    fetchPolicy: 'network-only'
  });

  const [publishTicket] = useMutation(PUBLISHTICKETS);

  const [tableData, setTableData] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedTicketId, setSelectedTicketId] = useState(null);

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
          "tp_status": "DelistInProgress",
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

  const handlePublish = async (ticketId) => {
    try {
      await publishTicket({
        variables: {
          publishTicketsInput: {
            id: ticketId,
          },
        },
      });
      refetch();
      setOpenDialog(false);
    } catch (error) {
      toast.error(`Error: ${error.message || 'An unexpected error occurred'}`);
      setOpenDialog(false);
    }
  };

  const handleButtonClick = (ticketId) => {
    setSelectedTicketId(ticketId);
    setOpenDialog(true);
  };

  const handleConfirm = () => {
    handlePublish(selectedTicketId);
  };

  useEffect(() => {
    // if (data && data.filtermanagetickets) {
    const formattedData = dummydata.data.filtermanagetickets.map((item, index) => ({
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
      returnEmail: item.u_email_id,
      userName: item.full_name,
      email: item.u_email_id,
      period: "1 Days",
      league_name: item.l_name,
      validityStatus: item.tp_validity_status,
      Publish_id: item.tp_id
    }));
    setTableData(formattedData);
    // }
  }, [data]);

  if (loading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        <CircularProgress color="primary" size={50} />
      </Box>
    );
  }

  // if (error) {
  //   return <p>Error: {error.message}</p>;
  // }

  return (
    <>
      <SharedTable
        data={tableData}
        columns={managecolumns(handleButtonClick)}
      />

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} className='publish-dialog-'>
        <DialogContent className="publish-dialog-content">
          <Box className="publish-dialog-icon">
            <img src={popupicon} alt="Popup Icon" style={{ width: 80, height: 80 }} />
          </Box>

          <Typography variant="h6" className="publish-dialog-title">
            Publish Tickets
          </Typography>

          <Typography variant="body2" className="publish-dialog-subtitle">
            Do you want to publish the tickets
          </Typography>

        <DialogActions className="publish-dialog-actions">
          <Button
            onClick={() => setOpenDialog(false)}
            variant="outlined"
            className="publish-cancel-button"
            >
            Cancel
          </Button>
          <Button
            onClick={handleConfirm}
            variant="contained"
            className="publish-confirm-button"
            >
            Confirm
          </Button>
        </DialogActions>
            </DialogContent>
      </Dialog>
    </>
  );

};

export default Managetickets;

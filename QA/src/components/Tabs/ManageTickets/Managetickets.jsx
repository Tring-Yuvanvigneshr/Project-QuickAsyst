import React, { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { FILTERMANAGETICKETS } from '../../../Graphql/ManageTickets/manageQuery.js';
import SharedTable from './../../GlobalComponents/GlobalTable/Table.jsx';
import { CircularProgress, Box } from '@mui/material';

import {managecolumns} from './../../../utils/Manage_columns/ManageColumns.jsx';

const Managetickets = ({ filter }) => {
  const { loading, error, data, refetch } = useQuery(FILTERMANAGETICKETS, {
    variables: filter,
    fetchPolicy: 'network-only'
  });

  const [tableData, setTableData] = useState([]);



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
        status: item.tp_status === "Verified" ? "Verified" : "To be verified",
        returnEmail: item.u_email_id,
        userName: item.full_name,
        email: item.u_email_id,
        period: "1 Days",
        league_name: item.l_name
      }));
      setTableData(formattedData);
    }
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

  return <SharedTable data={tableData} columns={managecolumns}/>;
};

export default Managetickets;

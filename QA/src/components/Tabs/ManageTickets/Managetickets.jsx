import React, { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { FILTERMANAGETICKETS } from '../../../Graphql/ManageTickets/manageQuery.js';

const Managetickets = () => {
  const { loading, error, data, refetch } = useQuery(FILTERMANAGETICKETS, {
    variables: {
      search_event: '%',
      leagueId: null,
      ticketStatus: null,
      startdate: null,
      enddate: null,
      pageSize: 10,
      pageOffset: 0,
      order_by: [
        { tp_updated_at: 'desc' },
        { tp_id: 'asc' }
      ],
      day: null,
      ticketId: null,
      tpId: null,
      array_tpid: null
    },
  });

  useEffect(() => {
    refetch()
  }, [refetch])

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h2>Manage Tickets</h2>
    </div>
  );
};

export default Managetickets;

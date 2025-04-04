import React, { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { FILTERMANAGETICKETS } from '../../../Graphql/ManageTickets/manageQuery.js';

const Managetickets = ({ filter }) => {
  const { loading, error, data, refetch } = useQuery(FILTERMANAGETICKETS, {
    variables: filter,
  });

  console.log(filter);

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

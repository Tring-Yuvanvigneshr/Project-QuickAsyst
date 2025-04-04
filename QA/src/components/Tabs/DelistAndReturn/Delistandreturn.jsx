import React, { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { FILTERRETURNTICKETS } from './../../../Graphql/Return/returnQuery.js';


const Delistandreturn = () => {

    const { loading, error, data, refetch } = useQuery(FILTERRETURNTICKETS, {
        variables: {
            array_tpid: null,
            enddate: null,
            leagueId: null,
            order_by: [
                { tp_updated_at: 'desc' },
                { tp_id: 'asc' }
            ],
            pageOffset: 0,
            pageSize: 10,
            search_event: '%',
            startdate: null,
            ticketId: null,
            ticketPlacementId: null,
            ticketStatus: null
        },
    });

    useEffect(() => {
        refetch()
    }, [refetch])

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    console.log(data.filterreturntickets)

  return (
    <div>
    <h2>Delist and Return</h2>
</div>
  )
}

export default Delistandreturn
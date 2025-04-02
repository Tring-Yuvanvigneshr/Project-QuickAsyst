import React, { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { FILTERLISTTICKETS } from '../../../Graphql/ListTickets/listQuery';

const Listtickets = () => {
    const { loading, error, data, refetch } = useQuery(FILTERLISTTICKETS, {
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

    return (
        <div>
            <h2>List Tickets</h2>

        </div>
    );
};

export default Listtickets;

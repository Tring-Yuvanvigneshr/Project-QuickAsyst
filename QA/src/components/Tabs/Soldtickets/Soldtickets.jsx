import React, { useEffect } from 'react'
import { useQuery } from '@apollo/client';
import { FILTERSOLDTICKETS } from '../../../Graphql/SoldTickets/soldQuery';


const Soldtickets = () => {

    const { loading, error, data, refetch } = useQuery(FILTERSOLDTICKETS, {
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
    }, [])

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <div>
            <h2>Sold Tickets</h2>
        </div>
    )
}

export default Soldtickets
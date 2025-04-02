import React, { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { FILTERLISTTICKETS } from '../../../Graphql/ListTickets/listQuery';

const Listtickets = ({ filter }) => {
    const { loading, error, data, refetch } = useQuery(FILTERLISTTICKETS, {
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
            <h2>List Tickets</h2>

        </div>
    );
};

export default Listtickets;

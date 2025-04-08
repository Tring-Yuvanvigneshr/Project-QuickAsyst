import React, { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { FILTERRETURNTICKETS } from './../../../Graphql/Return/returnQuery.js';


const Delistandreturn = ({ filter }) => {

    const [tableData, setTableData] = useState([]);
    const [tableSize, setTableSize] = useState([]);

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
            setTableData(formattedData);
            setTableSize(data.filtermanagetickets_aggregate.aggregate.count)
        }
    }, [data]);



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
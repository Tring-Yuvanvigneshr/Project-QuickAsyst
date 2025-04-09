import React, { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { FILTERUNSOLDTICKETS } from './../../../Graphql/UnsoldTickets/unsoldQuery.js';
import SharedTable from './../../GlobalComponents/GlobalTable/Table.jsx';
import { DelistandunsoldColumns } from './../../../utils/DelistandSoldcolumns/DelistandSoldcolumns.jsx';
import {
  CircularProgress,
  Box
} from '@mui/material';

const Delistandunsold = ({ filter }) => {

    const [tableData, setTableData] = useState([]);
    const [tableSize, setTableSize] = useState([]);
    const [pageChange, setPageChange] = useState(10);
    const [offSet, setOffSet] = useState(0);

    const { loading, error, data, refetch } = useQuery(FILTERUNSOLDTICKETS, {
        variables: {
            ...filter,
            ticketPlacementId: null,
            pageSize: pageChange,
            pageOffset: pageChange * (offSet - 1),
        },
        fetchPolicy: 'network-only'
    });

    const dummydata = {
        "data": {
            "filterUnsoldTickets": [
                {
                    "e_name": "Boston Bruins vs Washington Capitals",
                    "l_name": "NHL",
                    "e_date": "2025-04-01T23:00:00+00:00",
                    "e_address": "TD Garden, Boston, MA",
                    "tp_section": "s",
                    "tp_row": "2",
                    "tp_seat_no": 2,
                    "u_id": "7f0a36d5-6598-4aa9-a7b3-28b867f5faca",
                    "u_first_name": "priya",
                    "u_last_name": "th",
                    "e_id": "56c40e5d-df3f-4e2a-ae35-ec2b721cd1c0",
                    "t_id": "56b00f66-fc96-4636-aac8-932f7c314e71",
                    "tp_id": "ea0ee7cb-5ae1-4c50-977b-8ab36daf66de",
                    "u_full_name": "priya th",
                    "u_email_id": "priyadharshini.th+edit@tringapps.com",
                    "tp_list_price": 0,
                    "tp_status": "Unsold",
                    "u_original_email": null,
                    "e_brand_name": "Capitals vs Bruins",
                    "e_status": "closed",
                    "__typename": "getmanageticket"
                },
                {
                    "e_name": "Boston Bruins vs Washington Capitals",
                    "l_name": "NHL",
                    "e_date": "2025-04-01T23:00:00+00:00",
                    "e_address": "TD Garden, Boston, MA",
                    "tp_section": "s",
                    "tp_row": "2",
                    "tp_seat_no": 3,
                    "u_id": "7f0a36d5-6598-4aa9-a7b3-28b867f5faca",
                    "u_first_name": "priya",
                    "u_last_name": "th",
                    "e_id": "56c40e5d-df3f-4e2a-ae35-ec2b721cd1c0",
                    "t_id": "56b00f66-fc96-4636-aac8-932f7c314e71",
                    "tp_id": "36794dc2-7d9e-436a-8d41-4c048224e892",
                    "u_full_name": "priya th",
                    "u_email_id": "priyadharshini.th+edit@tringapps.com",
                    "tp_list_price": 0,
                    "tp_status": "Unsold",
                    "u_original_email": null,
                    "e_brand_name": "Capitals vs Bruins",
                    "e_status": "closed",
                    "__typename": "getmanageticket"
                },
                {
                    "e_name": "Boston Bruins vs Washington Capitals",
                    "l_name": "NHL",
                    "e_date": "2025-04-01T23:00:00+00:00",
                    "e_address": "TD Garden, Boston, MA",
                    "tp_section": "q",
                    "tp_row": "e",
                    "tp_seat_no": 2,
                    "u_id": "7f0a36d5-6598-4aa9-a7b3-28b867f5faca",
                    "u_first_name": "priya",
                    "u_last_name": "th",
                    "e_id": "56c40e5d-df3f-4e2a-ae35-ec2b721cd1c0",
                    "t_id": "e221302b-d57d-44c4-9843-98858cec5bf1",
                    "tp_id": "9a41e44b-e88b-445b-89a9-3514a9ab8e73",
                    "u_full_name": "priya th",
                    "u_email_id": "priyadharshini.th+edit@tringapps.com",
                    "tp_list_price": 0,
                    "tp_status": "Unsold",
                    "u_original_email": null,
                    "e_brand_name": "Capitals vs Bruins",
                    "e_status": "closed",
                    "__typename": "getmanageticket"
                },
                {
                    "e_name": "Boston Bruins vs Washington Capitals",
                    "l_name": "NHL",
                    "e_date": "2025-04-01T23:00:00+00:00",
                    "e_address": "TD Garden, Boston, MA",
                    "tp_section": "q",
                    "tp_row": "e",
                    "tp_seat_no": 1,
                    "u_id": "7f0a36d5-6598-4aa9-a7b3-28b867f5faca",
                    "u_first_name": "priya",
                    "u_last_name": "th",
                    "e_id": "56c40e5d-df3f-4e2a-ae35-ec2b721cd1c0",
                    "t_id": "e221302b-d57d-44c4-9843-98858cec5bf1",
                    "tp_id": "efe5a19a-f41e-43e3-9269-f0ef4ef272d0",
                    "u_full_name": "priya th",
                    "u_email_id": "priyadharshini.th+edit@tringapps.com",
                    "tp_list_price": 0,
                    "tp_status": "Unsold",
                    "u_original_email": null,
                    "e_brand_name": "Capitals vs Bruins",
                    "e_status": "closed",
                    "__typename": "getmanageticket"
                },
                {
                    "e_name": "Boston Bruins vs Washington Capitals",
                    "l_name": "NHL",
                    "e_date": "2025-04-01T23:00:00+00:00",
                    "e_address": "TD Garden, Boston, MA",
                    "tp_section": "k",
                    "tp_row": "l",
                    "tp_seat_no": 8,
                    "u_id": "7f0a36d5-6598-4aa9-a7b3-28b867f5faca",
                    "u_first_name": "priya",
                    "u_last_name": "th",
                    "e_id": "56c40e5d-df3f-4e2a-ae35-ec2b721cd1c0",
                    "t_id": "98a2901f-7ace-4829-a36f-b0ac14f63f65",
                    "tp_id": "1cb5d1b5-66be-4e13-93c6-d5ba59cee4ff",
                    "u_full_name": "priya th",
                    "u_email_id": "priyadharshini.th+edit@tringapps.com",
                    "tp_list_price": 0,
                    "tp_status": "Unsold",
                    "u_original_email": null,
                    "e_brand_name": "Capitals vs Bruins",
                    "e_status": "closed",
                    "__typename": "getmanageticket"
                },
                {
                    "e_name": "Boston Bruins vs Washington Capitals",
                    "l_name": "NHL",
                    "e_date": "2025-04-01T23:00:00+00:00",
                    "e_address": "TD Garden, Boston, MA",
                    "tp_section": "k",
                    "tp_row": "l",
                    "tp_seat_no": 9,
                    "u_id": "7f0a36d5-6598-4aa9-a7b3-28b867f5faca",
                    "u_first_name": "priya",
                    "u_last_name": "th",
                    "e_id": "56c40e5d-df3f-4e2a-ae35-ec2b721cd1c0",
                    "t_id": "98a2901f-7ace-4829-a36f-b0ac14f63f65",
                    "tp_id": "b68b7937-4ebc-4584-ab0c-080761a94992",
                    "u_full_name": "priya th",
                    "u_email_id": "priyadharshini.th+edit@tringapps.com",
                    "tp_list_price": 0,
                    "tp_status": "Unsold",
                    "u_original_email": null,
                    "e_brand_name": "Capitals vs Bruins",
                    "e_status": "closed",
                    "__typename": "getmanageticket"
                },
                {
                    "e_name": "Boston Bruins vs Washington Capitals",
                    "l_name": "NHL",
                    "e_date": "2025-04-01T23:00:00+00:00",
                    "e_address": "TD Garden, Boston, MA",
                    "tp_section": "s",
                    "tp_row": "d",
                    "tp_seat_no": 1,
                    "u_id": "7f0a36d5-6598-4aa9-a7b3-28b867f5faca",
                    "u_first_name": "priya",
                    "u_last_name": "th",
                    "e_id": "56c40e5d-df3f-4e2a-ae35-ec2b721cd1c0",
                    "t_id": "cdae64fe-f710-42be-8143-a8c1491c1b6b",
                    "tp_id": "68c2f404-91e7-42c9-b94a-4c86e6e321fd",
                    "u_full_name": "priya th",
                    "u_email_id": "priyadharshini.th+edit@tringapps.com",
                    "tp_list_price": 0,
                    "tp_status": "Unsold",
                    "u_original_email": null,
                    "e_brand_name": "Capitals vs Bruins",
                    "e_status": "closed",
                    "__typename": "getmanageticket"
                },
                {
                    "e_name": "Boston Bruins vs Washington Capitals",
                    "l_name": "NHL",
                    "e_date": "2025-04-01T23:00:00+00:00",
                    "e_address": "TD Garden, Boston, MA",
                    "tp_section": "s",
                    "tp_row": "d",
                    "tp_seat_no": 2,
                    "u_id": "7f0a36d5-6598-4aa9-a7b3-28b867f5faca",
                    "u_first_name": "priya",
                    "u_last_name": "th",
                    "e_id": "56c40e5d-df3f-4e2a-ae35-ec2b721cd1c0",
                    "t_id": "cdae64fe-f710-42be-8143-a8c1491c1b6b",
                    "tp_id": "600323fd-b4ed-4fd9-9c8a-2bd32f66f647",
                    "u_full_name": "priya th",
                    "u_email_id": "priyadharshini.th+edit@tringapps.com",
                    "tp_list_price": 0,
                    "tp_status": "Unsold",
                    "u_original_email": null,
                    "e_brand_name": "Capitals vs Bruins",
                    "e_status": "closed",
                    "__typename": "getmanageticket"
                },
                {
                    "e_name": "Boston Bruins vs Washington Capitals",
                    "l_name": "NHL",
                    "e_date": "2025-04-01T23:00:00+00:00",
                    "e_address": "TD Garden, Boston, MA",
                    "tp_section": "a",
                    "tp_row": "d",
                    "tp_seat_no": 1,
                    "u_id": "7f0a36d5-6598-4aa9-a7b3-28b867f5faca",
                    "u_first_name": "priya",
                    "u_last_name": "th",
                    "e_id": "56c40e5d-df3f-4e2a-ae35-ec2b721cd1c0",
                    "t_id": "32d72a5d-c05d-46d2-9c54-906315ca05e0",
                    "tp_id": "78189549-0a74-464c-a77b-1877e449295b",
                    "u_full_name": "priya th",
                    "u_email_id": "priyadharshini.th+edit@tringapps.com",
                    "tp_list_price": 0,
                    "tp_status": "Unsold",
                    "u_original_email": null,
                    "e_brand_name": "Capitals vs Bruins",
                    "e_status": "closed",
                    "__typename": "getmanageticket"
                },
                {
                    "e_name": "Boston Bruins vs Washington Capitals",
                    "l_name": "NHL",
                    "e_date": "2025-04-01T23:00:00+00:00",
                    "e_address": "TD Garden, Boston, MA",
                    "tp_section": "a",
                    "tp_row": "d",
                    "tp_seat_no": 2,
                    "u_id": "7f0a36d5-6598-4aa9-a7b3-28b867f5faca",
                    "u_first_name": "priya",
                    "u_last_name": "th",
                    "e_id": "56c40e5d-df3f-4e2a-ae35-ec2b721cd1c0",
                    "t_id": "32d72a5d-c05d-46d2-9c54-906315ca05e0",
                    "tp_id": "9879a47c-8da4-4652-9368-6e3ea5d08c2f",
                    "u_full_name": "priya th",
                    "u_email_id": "priyadharshini.th+edit@tringapps.com",
                    "tp_list_price": 0,
                    "tp_status": "Unsold",
                    "u_original_email": null,
                    "e_brand_name": "Capitals vs Bruins",
                    "e_status": "closed",
                    "__typename": "getmanageticket"
                }
            ],
            "filterreturntickets_aggregate": {
                "aggregate": {
                    "count": 10,
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
            "filtermanagetickets_aggregate": {
                "aggregate": {
                    "count": 982,
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
            "filterUnsoldTickets_aggreagate": {
                "aggregate": {
                    "count": 10,
                    "__typename": "getmanageticket_aggregate_fields"
                },
                "__typename": "getmanageticket_aggregate"
            }
        }
    }

    useEffect(() => {
        // if (data && data.filterUnsoldTickets) {
            const formattedData = dummydata.data.filterUnsoldTickets.map((item, index) => ({
                id: index + 1,
                event: item.e_name,
                date: new Date(item.e_date).toLocaleString("en-US", { timeZone: item.e_time_zone }),
                venue: item.e_address,
                venueTime: new Date(item.e_date).toLocaleString("en-US", { timeZone: item.e_time_zone }),
                section: item.tp_section.toUpperCase(),
                row: item.tp_row.toUpperCase(),
                seat: item.tp_seat_no,
                status: item.tp_status,
                userName: item.u_full_name,
                email: item.u_email_id,
                period: "1 Days",
                league_name: item.l_name,
                closeStatus: item.e_status === 'closed' ? 'Closed' : ''
            }));
            setTableData(formattedData);
        //     setTableSize(data.filterUnsoldTickets_aggreagate.aggregate.count)
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
                checkboxisdisabled={false}
                data={tableData}
                columns={DelistandunsoldColumns()}
                totalCount={tableSize}
                pageSize={pageChange}
                onPageSizeChange={setPageChange}
                page={offSet}
                onOffSetChange={setOffSet}
            />
        </>
    )
}

export default Delistandunsold
import React, { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { FILTERUNSOLDTICKETS } from '../../../graphql/UnsoldTickets/unsoldQuery.js';
import SharedTable from './../../GlobalComponents/GlobalTable/Table.jsx';
import { DelistandunsoldColumns } from '../../../utils/DelistandSoldColumns/DelistandSoldcolumns.jsx';
import {
    CircularProgress,
    Box
} from '@mui/material';

const Delistandunsold = ({ filter }) => {


    const [tableData, setTableData] = useState([]);
    const [tableSize, setTableSize] = useState([]);
    const [pageChange, setPageChange] = useState(10);
    const [offSet, setOffSet] = useState(1);

    const [orderBy, setOrderBy] = useState([{ tp_updated_at: "desc" }, { tp_id: "asc" }]);
    const [sortOption, setSortOption] = useState('desc');

    const { loading, data } = useQuery(FILTERUNSOLDTICKETS, {
        variables: {
            ...filter,
            ticketPlacementId: null,
            pageSize: pageChange,
            pageOffset: pageChange * (offSet - 1),
            order_by: orderBy
        },
        fetchPolicy: 'network-only'
    });

    useEffect(() => {
        if (data && data.filterUnsoldTickets) {
            const formattedData = data.filterUnsoldTickets.map((item, index) => ({
                id: index + 1,
                event: item.e_name,
                date: new Date(item.e_date).toLocaleString('en-US', { timeZone: item.e_time_zone }),
                venue: item.e_address,
                venueTime: new Date(item.e_date).toLocaleString('en-US', { timeZone: item.e_time_zone }),
                section: item.tp_section.toUpperCase(),
                row: item.tp_row.toUpperCase(),
                seat: item.tp_seat_no,
                status: item.tp_status,
                userName: item.u_full_name,
                email: item.u_email_id,
                period: '1 Days',
                league_name: item.l_name,
                closeStatus: item.e_status === 'closed' ? 'Closed' : ''
            }));
            setTableData(formattedData);
            setTableSize(data.filterUnsoldTickets_aggreagate.aggregate.count);
        }
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

                setOrderBy={setOrderBy}
                sortOption={sortOption}
                setSortOption={setSortOption}
            />
        </>
    )
}

export default Delistandunsold;

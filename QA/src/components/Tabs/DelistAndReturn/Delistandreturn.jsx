import React, { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { FILTERRETURNTICKETS } from '../../../graphql/Return/returnQuery.js';
import { delistandreturn } from '../../../utils/DelistandReturnColumns/DelistandReturnColumns.jsx';
import SharedTable from './../../GlobalComponents/GlobalTable/Table.jsx';
import {
    CircularProgress,
    Box,
} from '@mui/material';

const Delistandreturn = ({ filter }) => {

    const pageChangeNumber = 10;

    const [tableData, setTableData] = useState([]);
    const [tableSize, setTableSize] = useState([]);
    const [pageChange, setPageChange] = useState(pageChangeNumber);
    const [offSet, setOffSet] = useState(1);


    const [orderBy, setOrderBy] = useState({ tp_updated_at: "desc" }, { tp_id: "asc" });
    const [sortOption, setSortOption] = useState('desc');


    const { loading, error, data } = useQuery(FILTERRETURNTICKETS, {
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
        if (data && data.filterreturntickets) {
            const formattedData = data.filterreturntickets.map((item, index) => ({
                id: index + 1,
                event: item.e_name,
                date: new Date(item.e_date).toLocaleString('en-US'),
                venue: item.e_address,
                venueTime: new Date(item.e_date).toLocaleString('en-US'),
                section: item.tp_section.toUpperCase(),
                row: item.tp_row.toUpperCase(),
                seat: item.tp_seat_no,
                returnEmail: item.tp_delist_requested_email || '-',
                userName: item.u_full_name,
                email: item.u_email_id,
                league_name: item.l_name,
            }));
            setTableData(formattedData);
            setTableSize(data.filterreturntickets_aggregate.aggregate.count);
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
                columns={delistandreturn()}

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

export default Delistandreturn;
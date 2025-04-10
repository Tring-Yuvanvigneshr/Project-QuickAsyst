import { gql } from 'graphql-tag';

export const FILTERMANAGETICKETS = gql `
    query Filtermanagetickets ($enddate: date, $leagueId: uuid, $startdate: date, $ticketStatus: String, $ticketId: uuid, $tpId: uuid, $pageSize: Int, $pageOffset: Int, $order_by: [getmanageticket_order_by!], $day: Int, $search_event: String = "%", $array_tpid: jsonb) {
  filtermanagetickets(args: {enddate:$enddate,leagueid:$leagueId,startdate:$startdate,ticket_status:$ticketStatus,day:$day,ticketid:$ticketId,tpid:$tpId,array_tpid:$array_tpid}, where: {tp_is_published:{_eq:false},tp_status:{_in:["ToBeVerified","Verified","Delist","DelistInProgress"]},_or:[{e_name:{_ilike:$search_event}},{full_name:{_ilike:$search_event}},{u_email_id:{_ilike:$search_event}}]}, limit: $pageSize, offset: $pageOffset, order_by: $order_by) {
    e_name
    l_name
    e_date
    e_address
    tp_section
    tp_row
    tp_seat_no
    tp_status
    u_id
    u_first_name
    u_last_name
    tp_validity_status
    tp_status
    tp_is_published
    e_id
    t_id
    tp_id
    e_status
    user {
      u_role
    }
    full_name
    u_email_id
    u_original_email
    e_brand_name
    e_status
    e_time_zone
    e_date_time_zone
    tp_delist_requested_email
    tp_is_support_vanderbilt_nil_fund
  }
  filtermanagetickets_aggregate(args: {enddate:$enddate,leagueid:$leagueId,startdate:$startdate,ticket_status:$ticketStatus,day:$day,ticketid:$ticketId,tpid:$tpId,array_tpid:$array_tpid}, where: {tp_is_published:{_eq:false},tp_status:{_in:["ToBeVerified","Verified","Delist","DelistInProgress"]},_or:[{e_name:{_ilike:$search_event}},{full_name:{_ilike:$search_event}},{u_email_id:{_ilike:$search_event}}]}) {
    aggregate {
      count
    }
  }
  filterlisttickets_aggregate(args: {enddate:$enddate,leagueid:$leagueId,startdate:$startdate,ticketid:$ticketId,tpid:$tpId,array_tpid:$array_tpid,payment_status:null,ticket_status:null}, where: {tp_is_published:{_eq:true},_or:[{e_name:{_ilike:$search_event}},{full_name:{_ilike:$search_event}},{u_email_id:{_ilike:$search_event}}],tp_status:{_in:["List","DelistInProgress"]}}) {
    aggregate {
      count
    }
  }
  FilterSoldTickets_aggregate: filterlisttickets_aggregate(args: {enddate:$enddate,leagueid:$leagueId,startdate:$startdate,ticketid:$ticketId,tpid:$tpId,array_tpid:$array_tpid,payment_status:null,ticket_status:null}, where: {tp_is_published:{_eq:true},_or:[{e_name:{_ilike:$search_event}},{full_name:{_ilike:$search_event}},{u_email_id:{_ilike:$search_event}}],tp_status:{_eq:"Sold"}}) {
    aggregate {
      count
    }
  }
  filterreturntickets_aggregate(args: {enddate:$enddate,leagueid:$leagueId,startdate:$startdate,ticketid:$ticketId,tpid:$tpId,array_tpid:$array_tpid}, where: {tp_status:{_in:["Return"]},_or:[{e_name:{_ilike:$search_event}},{full_name:{_ilike:$search_event}},{u_email_id:{_ilike:$search_event}}]}) {
    aggregate {
      count
    }
  }
  filterUnsoldTickets_aggreagate: filterreturntickets_aggregate(args: {enddate:$enddate,leagueid:$leagueId,startdate:$startdate,ticketid:$ticketId,tpid:$tpId,array_tpid:$array_tpid}, where: {tp_status:{_in:["Unsold"]},_or:[{e_name:{_ilike:$search_event}},{full_name:{_ilike:$search_event}},{u_email_id:{_ilike:$search_event}}]}) {
    aggregate {
      count
    }
  }
}
`
import { gql } from 'graphql-tag';

export const GETUSERPROFILE = gql`
    query GetUserProfile {
  get_user_profile {
    u_id
    u_cognito_id
    u_first_name
    u_last_name
    u_email_id
    u_avatar_url
    u_country_code
    u_phone_number
    u_active_tickets
    u_full_name
    u_last_online
    u_notification_enabled
    u_sold_tickets
    u_total_revenue
    u_referral_code
    u_referral_link
    u_created_at
    u_updated_at
    u_device_tokens
    u_is_active
    u_role
    u_recovery_link
    u_stripe_account_id
    u_stripe_transfers_status
    u_stripe_account_is_due
    u_stripe_err_msg
    u_delete_requested
  }
}
`



export const LEAGUESDROPDOWNFILTER = gql`
  query LeaguesDropdownFilter {
  leagues(where: {l_deleted_at:{_is_null:true}}, order_by: {l_name:asc}) {
    l_id
    l_name
  }
}
`

export const SEARCHUSERSANDTICKETSBYMARKETINGUSER = gql`
  query searchUsersAndTickets ($pageSize: Int! = 10, $pageOffset: Int! = 0, $order_by: [user_order_by!] = {u_first_name:asc}, $searchText: String! = "%%", $searchEvent: String! = "") {
  user(offset: $pageOffset, limit: $pageSize, order_by: $order_by, where: {_or:[{u_email_id:{_ilike:$searchText}},{u_full_name:{_ilike:$searchText}}],_and:{u_role:{_eq:"user"}},u_deleted_at:{_is_null:true}}) {
    u_active_tickets
    u_country_code
    u_created_at
    u_email_id
    u_first_name
    u_is_active
    u_last_name
    u_last_online
    u_phone_number
    u_avatar_url
    u_full_name
  }
  user_aggregate(where: {_or:[{u_email_id:{_ilike:$searchText}},{u_full_name:{_ilike:$searchText}}],_and:{u_role:{_eq:"user"}},u_deleted_at:{_is_null:true}}) {
    aggregate {
      count
    }
  }
  events(where: {e_name:{_ilike:$searchEvent},e_deleted_at:{_is_null:true},tickets:{e_id:{_is_null:false},ticket_placements:{tp_deleted_at:{_is_null:true},t_id:{_is_null:false}}}}) {
    tickets {
      t_created_at
      t_deleted_at
      t_id
    }
    e_name
    e_image_url
    e_id
    e_updated_at
    e_date
    e_address
    e_brand_name
    e_status
    event_categories {
      lc_id
      league_category {
        l_id
        lc_brand_name
        lc_market_name
        league {
          l_avatar_url
          l_name
        }
      }
    }
  }
  events_aggregate(where: {e_name:{_ilike:$searchEvent},e_deleted_at:{_is_null:true},tickets:{e_id:{_is_null:false}}}) {
    aggregate {
      count
    }
  }
  league_categories(where: {lc_name:{_ilike:$searchText},lc_deleted_at:{_is_null:true}}) {
    lc_id
    lc_name
    lc_avatar_url
    lc_colour_code
    lc_abbrev
    lc_brand_name
    lc_market_name
  }
  league_categories_aggregate(where: {lc_name:{_ilike:$searchText},lc_deleted_at:{_is_null:true}}) {
    aggregate {
      count
    }
  }
  affiliates(where: {a_deleted_at:{_is_null:true},user:{_or:[{u_full_name:{_ilike:$searchText}},{u_email_id:{_ilike:$searchText}}]}}) {
    a_id
    a_first_name
    a_last_name
    a_email_id
    a_no_of_users
    user {
      u_full_name
    }
  }
  affiliates_aggregate(where: {a_deleted_at:{_is_null:true},user:{_or:[{u_full_name:{_ilike:$searchText}},{u_email_id:{_ilike:$searchText}}]}}) {
    aggregate {
      count
    }
  }
}
`
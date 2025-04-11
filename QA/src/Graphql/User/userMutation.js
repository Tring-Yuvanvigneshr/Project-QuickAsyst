import { gql } from 'graphql-tag';

export const UPDATEUSERPROFILE = gql`
    mutation UpdateUserProfile($emailId: String, $input: user_set_input) {
  update_user(where: {u_email_id: {_eq: $emailId}}, _set: $input) {
    affected_rows
  }
}
`
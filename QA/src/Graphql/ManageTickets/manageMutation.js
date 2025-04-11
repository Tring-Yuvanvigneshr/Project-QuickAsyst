import { gql } from 'graphql-tag';

export const PUBLISHTICKETS = gql`
    mutation publishTickets($publishTicketsInput: PublishTicketsInput!) {
  publishTickets(publishTicketInput: $publishTicketsInput) {
    message
  }
}
`

import { gql } from 'graphql-tag';

export const PUBLISHTICKETS = gql`
    mutation publishTickets($publishTicketsInput: PublishTicketsInput!) {
  publishTickets(publishTicketInput: $publishTicketsInput) {
    message
  }
}
`

export const UPDATERETURNTICKETS = gql`
  mutation UpdateReturnTickets ($ticketPlacementId: [String!]!) {
  returnTickets(ticketPlacementId: $ticketPlacementId) {
    message
  }
}
`

export const UPDATETICKETSTATUS = gql`
    mutation UpdateTicketStatus ($isValid: Boolean, $ticketPlacementId: [uuid!]!, $isUndoRequest: Boolean) {
    updateTicketStatus(ticketPlacementId: $ticketPlacementId, isValid: $isValid, isUndoRequest: $isUndoRequest) {
      message
    }
  }
`

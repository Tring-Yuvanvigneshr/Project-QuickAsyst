import { gql } from 'graphql-tag';

export const TRANSFERAMOUNTTOUSERSBYTICKET= gql `
  mutation TransferAmountToUsersByTicket($ticketPlacementId: String!) {
  transferAmountToUsersByTicket(ticketPlacementId: $ticketPlacementId) {
    message
  }
}`

import { gql } from '@apollo/client';

export const CREATE_PAYMENT = gql`
  mutation CreatePayment($amount: Float!, $buyOrder: String!, $sessionId: String!) {
    createPayment(amount: $amount, buyOrder: $buyOrder, sessionId: $sessionId) {
      success
      url
      token
    }
  }
`;

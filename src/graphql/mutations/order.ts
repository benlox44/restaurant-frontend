import { gql } from '@apollo/client';

export const CREATE_ORDER = gql`
  mutation CreateOrder($items: [CreateOrderItemInput!]!) {
    createOrder(items: $items) {
      id
      order {
        id
        total
        status
      }
    }
  }
`;

export const UPDATE_ORDER_STATUS = gql`
  mutation UpdateOrderStatus($id: String!, $status: String!) {
    updateOrderStatus(id: $id, status: $status) {
      ok
    }
  }
`;

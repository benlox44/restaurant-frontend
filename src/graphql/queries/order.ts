import { gql } from '@apollo/client';

export const GET_ORDERS = gql`
  query GetOrders {
    orders {
      id
      items {
        menuItemId
        name
        quantity
        price
      }
      total
      status
      createdAt
    }
  }
`;

export const GET_MY_ORDERS = gql`
  query GetMyOrders {
    orders {
      id
      items {
        menuItemId
        name
        quantity
        price
      }
      total
      status
      createdAt
    }
  }
`;

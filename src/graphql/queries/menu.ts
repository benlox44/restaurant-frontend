import { gql } from '@apollo/client';

export const GET_MENU = gql`
  query GetMenu {
    menu {
      id
      name
      description
      price
      category
    }
  }
`;

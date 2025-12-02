import { gql } from '@apollo/client';

export const CREATE_MENU_ITEM = gql`
  mutation CreateMenuItem($name: String!, $description: String!, $price: Float!, $category: String!) {
    createMenuItem(name: $name, description: $description, price: $price, category: $category) {
      id
      item {
        name
      }
    }
  }
`;

export const UPDATE_MENU_ITEM = gql`
  mutation UpdateMenuItem($id: String!, $name: String, $description: String, $price: Float, $category: String) {
    updateMenuItem(id: $id, name: $name, description: $description, price: $price, category: $category) {
      ok
    }
  }
`;

export const DELETE_MENU_ITEM = gql`
  mutation DeleteMenuItem($id: String!) {
    deleteMenuItem(id: $id) {
      ok
    }
  }
`;

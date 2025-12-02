import { gql } from '@apollo/client';

export const GET_MY_PROFILE = gql`
  query MyProfile {
    myProfile {
      id
      name
      email
      isLocked
      isEmailConfirmed
      createdAt
      oldEmail
      newEmail
      emailChangedAt
      role
    }
  }
`;

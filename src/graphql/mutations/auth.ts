import { gql } from '@apollo/client';

export const REGISTER_MUTATION = gql`
  mutation Register($email: String!, $password: String!, $name: String!, $adminSecret: String) {
    register(email: $email, password: $password, name: $name, adminSecret: $adminSecret) {
      message
    }
  }
`;

export const LOGIN_MUTATION = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      accessToken
    }
  }
`;

export const REQUEST_PASSWORD_RESET = gql`
  mutation RequestPasswordReset($email: String!) {
    requestPasswordReset(email: $email) {
      message
    }
  }
`;

export const RESET_PASSWORD = gql`
  mutation ResetPassword($token: String!, $newPassword: String!) {
    resetPassword(token: $token, newPassword: $newPassword) {
      message
    }
  }
`;

export const CONFIRM_EMAIL = gql`
  mutation ConfirmEmail($token: String!) {
    confirmEmail(token: $token) {
      message
    }
  }
`;

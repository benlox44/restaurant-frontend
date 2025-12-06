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

export const UPDATE_PASSWORD = gql`
  mutation UpdatePassword($currentPassword: String!, $newPassword: String!) {
    updatePassword(currentPassword: $currentPassword, newPassword: $newPassword) {
      message
    }
  }
`;

export const UPDATE_PROFILE = gql`
  mutation UpdateProfile($name: String!) {
    updateProfile(name: $name) {
      message
    }
  }
`;

export const REQUEST_EMAIL_UPDATE = gql`
  mutation RequestEmailUpdate($password: String!, $newEmail: String!) {
    requestEmailUpdate(password: $password, newEmail: $newEmail) {
      message
    }
  }
`;

export const CONFIRM_EMAIL_UPDATE = gql`
  mutation ConfirmEmailUpdate($token: String!) {
    confirmEmailUpdate(token: $token) {
      message
    }
  }
`;

export const REQUEST_UNLOCK = gql`
  mutation RequestUnlock($email: String!) {
    requestUnlock(email: $email) {
      message
    }
  }
`;

export const UNLOCK_ACCOUNT = gql`
  mutation UnlockAccount($token: String!) {
    unlockAccount(token: $token) {
      message
    }
  }
`;

export const DELETE_ACCOUNT = gql`
  mutation DeleteAccount($password: String!) {
    deleteAccount(password: $password) {
      message
    }
  }
`;

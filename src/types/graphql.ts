// Auth Types
export interface RegisterResponse {
  register: {
    message: string;
  };
}

export interface LoginResponse {
  login: {
    accessToken: string;
  };
}

export interface MessageResponse {
  message: string;
}

// User Types
export interface User {
  id: number;
  name: string;
  email: string;
  isLocked: boolean;
  isEmailConfirmed: boolean;
  createdAt: string;
  oldEmail?: string;
  newEmail?: string;
  emailChangedAt?: string;
}

export interface MyProfileResponse {
  myProfile: User;
}

// Mutation Variables
export interface RegisterVariables {
  email: string;
  password: string;
  name: string;
}

export interface LoginVariables {
  email: string;
  password: string;
}

export interface ConfirmEmailVariables {
  token: string;
}

export interface RequestPasswordResetVariables {
  email: string;
}

export interface ResetPasswordVariables {
  token: string;
  newPassword: string;
}

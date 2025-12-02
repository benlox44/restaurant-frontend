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
  role: string;
}

export interface MyProfileResponse {
  myProfile: User;
}

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
}

export interface OrderItem {
  menuItemId: string;
  name: string;
  quantity: number;
  price: number;
}

export interface Order {
  id: string;
  items: OrderItem[];
  total: number;
  status: string;
  createdAt: number;
}

export interface GetMenuResponse {
  menu: MenuItem[];
}

export interface CreateMenuResponse {
  createMenuItem: {
    id: string;
    item: MenuItem;
  };
}

export interface UpdateMenuResponse {
  updateMenuItem: {
    ok: boolean;
  };
}

export interface DeleteMenuResponse {
  deleteMenuItem: {
    ok: boolean;
  };
}

export interface GetOrdersResponse {
  orders: Order[];
}

export interface CreateOrderResponse {
  createOrder: {
    id: string;
    order: Order;
  };
}

export interface UpdateOrderStatusResponse {
  updateOrderStatus: {
    ok: boolean;
  };
}

// Mutation Variables
export interface RegisterVariables {
  email: string;
  password: string;
  name: string;
  adminSecret?: string;
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

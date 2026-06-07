export interface CustomerProfile {
  customerId: string;
  userId: string;
  fullName: string;
  email: string;
  phoneNumber?: string | null;
  description?: string | null;
  status: string;
  createdAt: string;
}

export interface UpdateCustomerProfileRequest {
  fullName: string;
  phoneNumber?: string | null;
  description?: string | null;
}

export interface ChangeCustomerPasswordRequest {
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}
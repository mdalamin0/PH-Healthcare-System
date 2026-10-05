export type UserRole = "SUPER_ADMIN" | "ADMIN" | "DOCTOR" | "PATIENT";

export type UserStatus = "ACTIVE" | "BLOCKED" | "DELETED";

export interface User {
  id: string;
  name: string;
  email: string;
  googleId: null | string;
  authProvider: string;
  emailVerified: boolean;
  role: UserRole;
  status: UserStatus;
  needPasswordChange: boolean;
  imageUrl: null | string;
  imagePublicId: null | string;
  isDeleted: boolean;
  deletedAt: null | string;
  createdAt: string;
  updatedAt: string;
}
export interface User {
  id: number;
  username: string;
  passwordHash: string;
  email: string;
  firstName: string | null;
  lastName: string | null;
  dateOfBirth: Date | null;
  profileImage: string | null;
  createdAt: Date;
  updatedAt: Date;
  lastLogin: Date | null;
  role: string | null;
  status: string | null;
  deleted: boolean;
  emailVerified: boolean;
  passwordResetToken: string;
  passwordResetExpires: Date | null;
  twoFactorEnabled: boolean;
  twoFactorSecret: string | null;
  phoneNumber: string | null;
  refreshToken: string;
  verificationToken: string;
  additionalMetadata: { [key: string]: any } | null;
}

export enum ROLE {
  PROMPT = "PROMPT",
  RESPONSE = "RESPONSE",
}

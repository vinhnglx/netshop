export enum UserRole {
  CUSTOMER = 'CUSTOMER',
  ADMIN = 'ADMIN',
}

export interface User {
  id?: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  username: string;
  role: UserRole;
}

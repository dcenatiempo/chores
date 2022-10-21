export interface user {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  organizationIds: string[];
}

export interface userState extends user {}

export interface user {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  organizationIds: string[];
  currentOrganizationdId: string;
}

export interface userState extends user {}

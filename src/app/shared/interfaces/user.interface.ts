export interface User {
  _id: string;
  fullname: string;
  avatar: string;
  profileOverview: string;
  createdAt: string;
  roles: string[];
  isAdmin: boolean;
  isOrganizer: boolean;
}

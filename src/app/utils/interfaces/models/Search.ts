import { User } from './User';

export interface Search {
  id?: number;
  user_id?: number;
  business_id?: number;
  status_id?: number;
  created_at?: string;
  updated_at?: string;
  user?: User;
  status: number;
  status_description?: string;
  scheduled: string;
  average_rating?: number;
}
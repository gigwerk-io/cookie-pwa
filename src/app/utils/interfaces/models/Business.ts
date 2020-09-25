import {User} from './User';

export interface Business {
  id?: number;
  owner_id?: number;
  unique_id?: string;
  name?: string;
  subdomain_prefix?: string;
  stripe_connect_id?: string;
  created_at?: string;
  updated_at?: string;
  pivot?: object;
  owner?: User;
  stripe_id?: string;
  card_brand?: string;
  card_last_four?: number;
  trials_ends_at?: string;
  is_accepting_applications?: boolean;
  is_approved?: boolean;
}
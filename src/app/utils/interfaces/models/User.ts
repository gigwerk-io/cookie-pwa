export interface User {
  id: number;
  first_name: string;
  last_name: string;
  username: string;
  email: string;
  phone: string;
  apn_token: string;
  fcm_token: string;
  email_verified_at: any;
  last_seen_at: any;
  deleted_at: any;
  created_at: any;
  updated_at: any;
  isActive: boolean;
  profile: UserProfile;
}

export interface UserProfile {
  id: number;
  user_id: number;
  image: string;
  description: string;
  created_at: any;
  updated_at: any;
}

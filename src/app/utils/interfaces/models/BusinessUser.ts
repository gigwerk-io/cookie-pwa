import { Business } from './Business';
import { User } from './User';

export interface BusinessUser {
    user_id: User;
    business_id: Business;
}
import {User} from '../models/User';
import {Status} from '../enum/Status';

export interface Job {
  id: number,
  business_id: number,
  customer_id: number,
  category_id: number,
  client_name: string,
  price: number,
  description: string,
  status_id: number,
  intensity_id: number,
  complete_before: any,
  views: number,
  image_one: string,
  image_two: string,
  image_three: string,
  created_at: any,
  updated_at: any,
  deleted_at: any,
  action: number,
  distance_away: number,
  status: string,
  intensity: string,
  customer: User,
  category: Category,
  job_status: Status,
  job_intensity: {
    id: number,
    name: string
  }
}

export interface Category {
  id: number;
  name: string;
  icon_image: string;
}
